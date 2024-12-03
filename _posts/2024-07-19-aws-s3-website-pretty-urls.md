---
layout: post
author: James Rowe
title: "Jekyll Pretty URLs and AWS S3 HTTP 403 Errors"
date: "2024-07-19 21:34:54 -0400"
category: software
tags: 2024 aws jekyll chatgpt
uid: 2978A937-9A88-4ABF-B792-85CEE8027C60
---

## Configuring Jekyll Blog for Pretty URLs

Jekyll pretty URLs work “out of the box” when using [GitHub Pages](https://pages.github.com) for hosting, e.g., [https://jsr6720.github.com/about](jsr6720.github.com/about) properly loads the `_site/about/index.html` deployed resource.

But when I switched to using an [AWS CloudFront distribution to serve a static website](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started-cloudfront-overview.html), Jekyll pretty URLs no longer worked, and I got an HTTP 403 Access Error when trying to load any URL other than the root domain.

While my personal solution was to abandon pretty URLs by appending `index.html` to my Jekyll `permalinks` attribute in the `_config.yml` file, read on for a review of the intersection of developer documentation, troubleshooting, and generative AI models.

## CloudFront Setting Default Root Object 

I was so focused on treating CloudFront + S3 as a webserver that I totally misread the documentation on the Default root object setting. Unlike Apache, `.htaccess,` and single page application routing, the AWS CloudFront [Default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html) only applies to root domain request.

<img src="/assets/posts-images/aws-default-root-object-settings.png" alt="aws default root object settings" class="center-img img-stylish"/>

Because this only applies to the root URL—e.g., “https://www.example.com/”—not any of the paths on that URL, it takes “workarounds” with this hosting strategy to get pretty URLs to work instead of leading to a HTTP 403 response. In my opinion, the published AWS workaround is pretty crummy. They suggest that you [create a lambda function](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/) to serve as an intercept and redirect requests to a specific resource on the S3 bucket.[^free]

After I tried and was unhappy with ChatGPT (below), I was able to find another workaround posted on a [Stack Overflow comment](https://stackoverflow.com/questions/31017105/how-do-you-set-a-default-root-object-for-subdirectories-for-a-statically-hosted/69157535#69157535) that suggests reusing the 403 resource page, adding JavaScript that redirects to the requested resource. Again, in my opinion, not a great solution.

My goal has always been to maintain my Jekyll configuration and deployment to be backward-compatible with GitHub Pages so my site continues to work at [https://jsr6720.github.io](jsr6720.github.io) so I simply ditched pretty URLs and [changed the Jekyll _config.yml permalink attribute to include index.html](https://github.com/jsr6720/jsr6720.github.io/commit/ff563a45470e49ccad10ff3ae85de08c9647cb89). 

Now I don’t have pretty URLs, but isn’t beauty in the eye of the beholder?[^frugal]

## What does ChatGPT-4o say?

Even though I told ChatGPT that I was using CloudFront with S3, it immediately suggested changing S3 bucket permissions or redirecting HTTP 403 requests to index.html. Changing the permissions would not have the desired effect of actually loading the `index.html` resource when the `\about\` path was requested.

It’s not that either of these solutions is “wrong,” but neither of them really solve the problem of pretty URLs. The HTTP 403 error wasn’t for the (my misinterpretation) default root object, i.e., `/about/index.html`; it was that CloudFront couldn’t access /about/ because my S3 permission settings restricted listing directory assets—as it should.

<img src="/assets/posts-images/aws-s3-chatgpt.png" alt="aws s3 chatgpt troubleshooting" class="center-img img-stylish"/>

I speculate that ChatGPT-4o was recommending configuring the S3 bucket as a static website, which is in direct conflict with the Amazon CloudFront served websites developer documentation.[^docs] The other solution to reuse the 403 page is not a solution I would pursue as an engineer.

The moral is: the more I work with generative AI, the more it amazes me how quickly a confidently wrong solution can take you down a path of “it working” without a clue whether or not “it makes sense.” Only with my experience as a software engineer was I able to identify that hijacking the 403 response doesn’t make sense and neither does creating a Lambda function to serve as a router. On that second point, I concede, I may just be eschewing complexity.

So as I explore and adopt generative AI into my work, as models get more advanced and provide even more confidently wrong answers, I must be sure to apply critical thought to the solutions provided. Or just tell it when it’s wrong.

<img src="/assets/posts-images/chat-gpt-aws-you-are-wrong.png" alt="chatgpt is a rug" class="center-img img-stylish"/>

---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2024-07-12 23:34:46 -0400" | date_to_string: "ordinal", "US" }} Initial draft

### Footnotes

[^frugal]: Are you using Amazon Free Tier and S3 buckets to host a static website? I concede the real answer would be to pay for monthly hosting and serve files with a real webserver like `Apache` or `nginx`. Or build this website with a SPA framework that has a router that gives me pretty URLs.

    But no, where’s the fun in that? I’ll just call my humble website “artisanal.”

[^free]: Yes, creating a lambda function requires money.

[^docs]: I think it’s worth acknowledging that well-written documentation quickly supersedes the statistical “right” response from generative AI. After all, where did ChatGPT get its “answer” from? That’s right, very likely the same site I was reading.
