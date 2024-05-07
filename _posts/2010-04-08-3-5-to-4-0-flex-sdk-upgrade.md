---
layout: post
author: James Rowe
title:  "3.5 to 4.0 Flex SDK upgrade"
date:   "2010-04-08 00:00:00 -0400"
tags: wordpress, txcowboycoder, "flex", "4.0", "flex"
uid: e69f1f7d-6950-412c-8cd2-ecd5dc90894a
---


## 3.5 to 4.0 Flex SDK upgrade


We have an application that requires upgrading from 3.5 to flex 4.0 SDK.


Needless to say our app did not compile on the first try with no code changes, that would be too easy. Digging around I found this great article on why the move to 4.0 enhances your ability to code following a MVC methodology:  

[Spark Styling](http://www.artima.com/articles/flex_4_styling.html).


This concept will hopefully allow us to change many of our sub-components into one .mxml file with different states. Looking forward to getting our code base converted.


UPDATED:


I wanted to put to words a general way for going about the upgrade process that I haven’t seen out on the web. Note I use ant tasks for building this flex project (contains java) but similar functions could be accomplished with IDE admin window.


1) Point ant to new Flex SDK 4.0, hold-breath and compile. Of course this doesn’t work, there were some api changes that required updating of the original code.


2) Try compile again. Now it’s complaining about fonts and halo themes and all other sorts of issues. Explicitly name the font renderer in the ant task, compile in compatibility mode 3.0, update namespaces and try again.


3) Now when I tried to add a new spark components it complains about being compiled in compatibility mode. Which makes it useless as a transition tool, and only served the purpose of convincing myself that I could in fact convert this application.


4) Luckily when I removed the compatibility option all the compiler complained about where attributes that had been abstracted to the spark skin layer. Since the whole point of converting was to take advantage of this new layout I just made note of all the attributes I removed and categorized them into skin classes I would need.


And now I am currently in the processes of learning skins … although my golf game is pretty rusty.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['flex']

Original Wordpress tags: "flex", "4.0", "flex"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/04/08/3-5-to-4-0-flex-sdk-upgrade/)

##### EOF/Footnotes

