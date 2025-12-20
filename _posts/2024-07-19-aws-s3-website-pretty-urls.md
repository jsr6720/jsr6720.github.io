---
layout: post
author: James Rowe
title: "AWS S3 Website Pretty URLs (Solved with CloudFront Functions)"
date: "2024-07-19 21:34:54 -0400"
category: engineering
tags: aws jekyll chatgpt
uid: 2978A937-9A88-4ABF-B792-85CEE8027C60
toc: true
---

## Update—Pretty URLs with CloudFront Functions

I revisited this post because users[^friends] who shared my posts via the [Apple Share Button](https://support.apple.com/guide/mac-help/use-the-share-menu-on-mac-mh40614/mac) would unknowingly share a link that, when clicked by the recipient, resulted in an `HTTP Access Denied` error.

I discovered that the [`jekyll-seo-tag` gem](https://github.com/jekyll/jekyll-seo-tag) was to blame. It adds a canonical link to the `<head>` section using the pretty URL format regardless of Jekyll settings;[^override] as you can see, there is no `index.html` appended[^nostalgia] in the `href` attribute.

`<link rel="canonical" href="https://www.jsrowe.com/aws-s3-website-pretty-urls/">`

I returned to ChatGPT [to brainstorm](https://github.com/jsr6720/llm-field-notes/blob/main/openai/chatgpt-4o/aws-pretty-urls-with-cloud-front/chatlog.txt) solutions, at first hoping to configure the `jekyll-seo-tag` gem and then to get help setting up a Lambda@Edge function as recommended by the AWS blog.[^citation]

I am not an infrastructure expert,[^broken] and navigating the thousands of pages of Amazon docs is frankly overwhelming. Enter LLM; within this new chat session, ChatGPT suggested creating an AWS [CloudFront Function](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html). I had not found this solution before with traditional search, and now my site supports pretty URLs via CloudFront!
 
<img src="/assets/posts-images/2024-07-19-aws-s3-website-pretty-urls/jekyll-site-pretty-urls-aws-cloudfront.png" alt="AWS CloudFront pretty URLs" class="center-img"/>

### Steps to Support Pretty URLs with a CloudFront Function

1.	[Create a CloudFront Function](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home#/functions/create).
2.	Add the JavaScript to dynamically manage `uri` to the Function.
    <details>
    <summary><a href="https://github.com/jsr6720/llm-field-notes/blob/main/openai/chatgpt-4o/aws-pretty-urls-with-cloud-front/chatlog.txt#L626-L677" target="_blank">JavaScript Courtesy of ChatGPT</a></summary>
    <pre>
    function handler(event) {
        var request = event.request;
        var uri = request.uri;

        // If the request is for a directory without a slash, add it
        if (!uri.includes('.') && !uri.endsWith('/')) {
            uri += '/';
        }

        // Ensure all directory requests explicitly get index.html
        if (uri.endsWith('/')) {
            uri += 'index.html';
        }

        // Update the request URI
        request.uri = uri;
        return request;
    }
</pre>
</details>
3. Publish function and Associate it with your CloudFront distribution.
 
<img src="/assets/posts-images/2024-07-19-aws-s3-website-pretty-urls/cloud-front-viewer-request-association.png" alt="AWS CloudFront function association showing viewer request trigger" class="center-img img-stylish"/>

## Original Post—Jekyll Site on AWS CloudFront+S3

**Note:** When I launched this site on AWS CloudFront and S3, I abandoned pretty URLs by appending `index.html` to my Jekyll `permalinks` attribute in the `_config.yml` file. See above update for a real fix.


Jekyll pretty URLs work “out of the box” when using [GitHub Pages](https://pages.github.com) for hosting, e.g., <https://jsr6720.github.io/about/> properly loads the `_site/about/index.html` deployed resource.

But when I switched to using an [AWS CloudFront distribution to serve a static website](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started-cloudfront-overview.html), Jekyll pretty URLs no longer worked, and I got an HTTP 403 Access Error[^fowler] when trying to load any URL other than the root domain.

 
<img src="/assets/posts-images/2024-07-19-aws-s3-website-pretty-urls/access-denied-no-slash.png" alt="AWS S3 error message showing XML AccessDenied when accessing URL without trailing slash" class="center-img"/>

### CloudFront Setting Default Root Object 

I was so focused on treating CloudFront + S3 as a webserver that I totally misread the documentation on the Default root object setting. Unlike Apache, `.htaccess,` and single page application routing, the AWS CloudFront [Default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html) only applies to root domain request.
 
<img src="/assets/posts-images/aws-default-root-object-settings.png" alt="AWS default root object settings" class="center-img img-stylish"/>

Because this only applies to the root URL—e.g., `https://www.example.com/`—not any of the paths on that URL, it takes “workarounds” with this hosting strategy to get pretty URLs to work instead of leading to a HTTP 403 response. In my opinion, the published AWS workaround is pretty crummy; it suggests [creating a lambda function](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/) to serve as an intercept and redirect requests to a specific resource on the S3 bucket.

After I tried and was unhappy with ChatGPT (below), I was able to find another workaround posted on a [Stack Overflow comment](https://stackoverflow.com/questions/31017105/how-do-you-set-a-default-root-object-for-subdirectories-for-a-statically-hosted/69157535#69157535) that suggests reusing the 403 resource page, adding JavaScript that redirects to the requested resource. Again, in my opinion, not a great solution.

My goal has always been to maintain my Jekyll configuration and deployment to be backward-compatible with GitHub Pages so my site will continue to work at <https://jsr6720.github.io>, so I simply ditched pretty URLs and [changed the Jekyll _config.yml permalink attribute to include index.html](https://github.com/jsr6720/jsr6720.github.io/commit/ff563a45470e49ccad10ff3ae85de08c9647cb89). 

~~Now I don’t have pretty URLs, but isn’t beauty in the eye of the beholder?~~ See above for solution!

### What Does ChatGPT-4o Say?

Even though I told ChatGPT that I was using CloudFront with S3, it immediately suggested changing S3 bucket permissions or redirecting HTTP 403 requests to index.html. Changing the permissions would not have the desired effect of actually loading the `index.html` resource when the `\about\` path was requested.

It’s not that either of these solutions is “wrong,” but neither of them really solve the problem of pretty URLs. The HTTP 403 error wasn’t for the (my misinterpretation) default root object, i.e., `/about/index.html`; it was that CloudFront couldn’t access /about/ because my S3 permission settings restricted listing directory assets—as it should.

<img src="/assets/posts-images/aws-s3-chatgpt.png" alt="AWS S3 ChatGPT troubleshooting" class="center-img img-stylish"/>

I speculate that ChatGPT-4o was recommending configuring the S3 bucket as a static website, which is in direct conflict with the Amazon CloudFront-served website developer documentation.[^docs] The other solution to reuse the 403 page is not a solution I would pursue as an engineer.

The moral is: The more I work with generative AI, the more it amazes me how quickly LLMs confidently assert wrong solutions without the slightest clue as to whether or not they “make sense.” Only with experience was I able to identify that hijacking the 403 response didn’t make sense, and neither does creating a CloudFront Lambda@Edge function to redirect requests. On that second point, I concede, I may just be eschewing complexity.

So as I explore and adopt generative AI into my work, as models get more advanced and provide even more confidently wrong answers, I must be sure to apply critical thought to the solutions provided. Or just tell it when it’s wrong.
 
<img src="/assets/posts-images/chat-gpt-aws-you-are-wrong.png" alt="Screenshot showing conversation where ChatGPT provides incorrect AWS information" class="center-img img-stylish"/>

---

### Significant Revisions

- {{ "2025-02-20 22:38:56 -0500" | date_to_string: "ordinal", "US" }} Added in CloudFront Functions solution. Original `title` “Jekyll Pretty URLs and AWS S3 HTTP 403 Errors”
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2024-07-12 23:34:46 -0400" | date_to_string: "ordinal", "US" }} Initial draft

### Footnotes

[^friends]: Thanks Aaron and Tony. You’re the real MVPs.

[^override]: You can add a canonical URL to your Jekyll [Front Matter](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/advanced-usage.md#setting-customized-canonical-url), but I didn’t want to do that for every page. I also added this [quick fix](https://github.com/jsr6720/jsr6720.github.io/commit/66c3fd93f8a4f3e3edd8373244a66d5ed98caba1) while I worked through this CloudFront function solution.

[^broken]: I tried deploying the Lambda@Edge function once and it resulted in HTTP 503 for all of my site, so I instructed ChatGPT that I had abandoned this path and asked for a [“real solution”](https://github.com/jsr6720/llm-field-notes/blob/main/openai/chatgpt-4o/aws-pretty-urls-with-cloud-front/chatlog.txt#L529-L539), which led me down the CloudFront rewrite behaviors path.

[^nostalgia]: I also have tremendous nostalgia for when websites used to give clues to their creation by loading with a file extension. Except [`backslash`](https://www.explainxkcd.com/wiki/index.php/727:_Trade_Expert).

[^citation]: What probably started as one official post on the [AWS Compute Blog](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/) was referenced on [StackOverflow](https://stackoverflow.com/questions/42741839/how-to-get-clean-urls-on-aws-cloudfront-s3), then many [blog posts](https://msucharski.eu/posts/hosting-static-site-s3/), and ultimately found its way into LLM training datasets.

[^docs]: I think it’s worth acknowledging that well-written documentation quickly supersedes the statistical “right” response from generative AI. After all, where did ChatGPT get its “answer” from? That’s right, very likely the same site I was reading.

[^fowler]: I draw heavy inspiration from <https://martinfowler.com> and was surprised to find that even on his site, loading a URL with no file name results in a [Forbidden](/assets/posts-images/2024-07-19-aws-s3-website-pretty-urls/martin-fowler-no-pretty-urls.png) error.
