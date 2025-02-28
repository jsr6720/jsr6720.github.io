---
layout: post
author: James Rowe
title: "AWS Free Tier After One Year—Cost Breakdown"
date: 2025-02-26 21:22:13 -0500
category: technology
tags: 2025 aws
uid: B3DAE9ED-F4DA-4BBF-BD3A-495B08FC9B67
---

<figure>
  <img src="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-services-reddit-meme.png" alt="AWS services meme showing a car salesman slapping the roof of a car" class="center-img img-stylish"/>
  <figcaption>
    This bad boy can fit so many services...
    <footer>
      Source: <cite><a href="https://www.reddit.com/r/ProgrammerHumor/comments/9ym7mj/aws_in_a_nutshell/">Reddit r/ProgrammerHumor - AWS in a nutshell</a></cite>
    </footer>
  </figcaption>
</figure>

## The AWS Free Tier Experiment

Initially, when I decided to start writing again, I started small, hosting this site with [GitHub Pages](https://pages.github.com) and [Jekyll]({% post_url 2024-03-31-hello-world-jekyll %}). I enjoyed that so much, I decided to self-host using [CloudFront+S3]({% post_url 2024-07-19-aws-s3-website-pretty-urls %}). There are several ways to host[^hosting] a static website, but I opted to try the [AWS Free](https://aws.amazon.com/free) tier for personal and professional reasons.

* Personally, I wanted a single flexible platform[^cpanel] to manage infrastructure for any of my ideas, not just this blog.
* Professionally, I wanted to learn more about AWS Services and Infrastructure as a Service.[^aws]

And, of course, free sounds good, but as suspected, I spent many, many hours[^timesheet] configuring AWS Services in lieu of more turnkey solutions. AWS is a labyrinth, and were it not for my professional goal of learning AWS Services, I’m sure I would’ve chosen another path.

## One Year Check-In

So is it still free at one year? The short answer: Yes! This static site has been free to host after the domain registration expense. 

In one year, I’ve incurred a total expense of 3 cents to host this site. The ["Ruby on Rails app experiment"]({% post_url 2024-09-12-hosting-writebook-on-aws %}) is unrelated to this static site.[^fixed]

### AWS Cost Explorer

| Item      | Amount | Notes                                    |
|-----------|--------|------------------------------------------|
| S3        | $.03   | Actual CloudFront+S3 website hosting     |
| Registrar | $95    | Many ... domain ideas                    |
| Route 53  | $11.56 | Ruby on Rails Writebook app experiment   |
| VPC       | $11.04 | Ruby on Rails Writebook app experiment   |

### CloudFront Requests

I’m so excited to see my various domains picking up a little bit of traffic. I have no idea how much of it is real people vs. robots, but I [write]({% post_url 2024-05-19-journaling-why-write %}) for a variety of purposes and trust that at least some of this traffic is [real humans](https://en.wikipedia.org/wiki/Dead_Internet_theory). 


<figure>
  <a href="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-one-year-cloud-front-requests.png" target="_blank">
    <img src="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-one-year-cloud-front-requests.png" alt="CloudFront request metrics showing traffic over time" class="center-img img-stylish"/>
  </a>
  <figcaption>
    CloudFront request distribution over one year (click image to view full size)
  </figcaption>
</figure>

### AWS Free Tier Offers

On [Reddit](https://www.reddit.com/search/?q=aws+free+tier+static+site), there are frequently posts inquiring about AWS Free tier, and users correctly respond that you can use [AWS CloudFront+S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) to host a static website. This post provides my real data on what resulting traffic might look like when starting a brand-new site.

In AWS Console, there is a report that details how much of each offer I’ve used. See below, sorted by `actual usage %`; it took just about a year to reach the limit on S3. Soon I will be subject to standard [AWS Pricing](https://aws.amazon.com/s3/pricing/), but I think a one-year evaluation period is pretty good!
 
<figure>
  <a href="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-free-tier-offers-in-use.png" target="_blank">
    <img src="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-free-tier-offers-in-use.png" alt="AWS Free Tier services usage breakdown" class="center-img img-stylish"/>
  </a>
  <figcaption>
    Breakdown of AWS Free Tier offers currently in use (click to enlarge)
  </figcaption>
</figure>

This is the same report sorted by `Service`, specifically pertaining to Amazon CloudFront. As you can see, I’m nowhere close to exceeding CloudFront limits. My primary variable expense going forward will be S3 data costs.

<figure>
  <a href="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-free-tier-offers-in-use-cloudfront.png" target="_blank">
    <img src="/assets/posts-images/2025-02-26-one-year-with-aws-free/aws-free-tier-offers-in-use-cloudfront.png" alt="CloudFront free tier usage metrics" class="center-img img-stylish"/>
  </a>
  <figcaption>
    CloudFront free tier utilization details (click to enlarge)
  </figcaption>
</figure>

### AWS Challenges

Even as an application developer by trade, it took focused effort to set up Route 53, Hosted Zones, Certificates, IAM roles, S3 Buckets, and CloudFront. I accepted many defaults not quite understanding them; this is one of the most powerful applications of LLMs like [Amazon Q](https://aws.amazon.com/q/) that I wish had been available when I was setting up this site.

I have no idea what costs would be if this site were hit with a [large volume of requests](https://en.wikipedia.org/wiki/Slashdot_effect) at once. But now that I understand what services I’m using and their respective [pricing](https://aws.amazon.com/s3/pricing/), I sleep a little better at night.[^ec2]

## Conclusion

It’s definitely possible to host a static site on AWS, but I would only recommend it if you’re already familiar with the AWS Console or work with AWS professionally. [There](https://substack.com) [are](https://posthaven.com) [so](https://www.hey.com/world/) [many](https://www.blogger.com/about/) turnkey options worth reviewing instead of configuring everything manually. Several times, I questioned myself if this was worth the hassle. I mostly blame IAM permissions configuration for CloudFront, S3 buckets, and GitHub actions, but that’s a post for another day.

As for what’s next, I’m very happy with the AWS skills I’ve picked up in the past year, will continue to use CloudFront+S3 to host my static websites, and plan to continue experimenting with other Amazon web services.

---

## Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ " 2025-02-24 19:46:05 -0500" | date_to_string: "ordinal", "US" }} Draft created

## Footnotes

[^hosting]: If you are not technologically inclined, AWS CloudFront+S3 is **NOT** a consumer-friendly option.

[^cpanel]: My earliest memories of “portal” management are with [CPanel](https://en.wikipedia.org/wiki/CPanel).

[^aws]: The Amazon web services I use the most are S3, Route 53, and CloudFront. I’ve also used Certificate Manager, IAM, and EC2 for various experiments.

[^fixed]: I wish I could cap expenses with a kill switch, e.g., “After $20, just kill everything.” For prototyping and small projects, [Heroku](https://www.heroku.com) offers fixed cost `dynos` at $5/month and [DigitalOcean](https://www.digitalocean.com/pricing) has `droplets` for $4/month that I think are a better fit for experimenting with Ruby on Rails applications.

[^ec2]: Yes, I know the joke about going broke from [leaving an EC2 instance running](https://tehccringe.com/news/jeff-bezos-no-longer-the-richest-man-after-leaving-ec2-instance-running). 

[^timesheet]: I didn’t keep a timelog, but this setup easily took 10-20 hours over a couple of weeks chipping away at it, mainly late nights after the kids went to bed. This time spent includes domain setup in Route 53, M365 Outlook email setup, and lots of other configuration tasks not directly related to deploying a CloudFront+S3 site.