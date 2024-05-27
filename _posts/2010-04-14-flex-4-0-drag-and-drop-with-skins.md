---
layout: post
author: James Rowe
title:  "Flex 4.0 drag-and-drop with skins"
date:   "2010-04-14 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder apache-flex drag-and-drop
uid: 29f532df-bf3d-42f2-ac22-4bd87314dd9c
---


## Flex 4.0 drag-and-drop with skins


**UPDATE**


I put this at the top because I wanted to change the content of the below post. Having worked on this code for a few days now, I became aware of several short-falls in my assumptions.


1) You cannot extend skins. Which makes sense, a host component can have many skins which have many states. Extending a skin would add confusion as to where the states are defined for that “look and feel”.


2) Enabling drag and drop (while a UI interface function) on custom components through their skins is asking to violate the DRY principle. Even though the skin is now the top most layer of the <code>DragEvent</code> having different skins breaks this model.


Unfortunately the drag and drop examples from adobe for flex 4 still show mx components, but the [differences page](http://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS7d89194359d2921c5daddfab1247d167dad-8000.html "Adobe mx spark differences") seems to lean towards putting drag and drop functionality in the spark component, not the skin class for the spark component.


**ORIGINAL POST**


Another upgrade bit of confusion that has since been squared away.


In the original application, `mx:Panels` were dragged around on a `mx:Canvas`; something similar to the [Adobe Documentation examples](http://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf64595-7fed.html)


Both of these files were getting quite large as they handled look and feel, interaction of the components, and all data. Now with flex 4.0, one priority was to convert these two custom components to `s:SkinnableContainer` with respective `s:Skin` classes.


This has cut our file sizes 20-50 percent as we try to follow a more MVC architecture. However our drag-and-drop functionality ceased to work for these custom components.


Long story short, drag events were now showing the `s:Skin` class as the `dragInitiator` for a `DragEvent` instead of the (in my mind) expected host component of the skin.


This make sense from the point that the added skin is now the ‘top-most’ layer of the component, but the question of where to put the custom drag management code naturally presented itself.


Does it belong in the base “data” class (Component), or does it belong in the “skin” class (ComponentSkin). Adding to the confusion is that both classes accept `dragEnter` and `dragDrop` events (in addition to all other `DragEvents`.


Knowing that the outmost layer of the component is the skin, and attempting to adhere to the MVC architecture, the decision is made to include all drag (ie visual) effects in the `s:Skin` class.


Three links that helped me with this endeavor:  

[saturnboy drag-and-drop](http://saturnboy.com/2009/08/drag-and-drop-flex-4/)  

[evtimmy drag-and-drop skinning](http://evtimmy.com/2010/01/drag-and-drop-skinning-in-spark/)  

 From above:  

[Adobe drag and drop examples](http://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf64595-7fed.html)




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['flex']

Original Wordpress tags: "flex", "drag-and-drop", "flex", "skins"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2010/04/14/flex-4-0-drag-and-drop-with-skins/#comments">2 Comments</a>

## Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/04/14/flex-4-0-drag-and-drop-with-skins/)

## EOF/Footnotes

