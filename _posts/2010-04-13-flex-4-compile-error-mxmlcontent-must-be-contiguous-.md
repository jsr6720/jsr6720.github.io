---
layout: post
author: James Rowe
title:  "flex 4 compile error “‘mxmlContent’ must be contiguous”"
date:   "2010-04-13 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder apache-flex compile-error error-messages mxmlContent
uid: 1009bb0f-2826-4762-ac77-f89c4bb994f4
---


## flex 4 compile error “‘mxmlContent’ must be contiguous”


Converting over from 3.5 to 4.0 has been a blast. Lots of new features have been introduced. However I started to see this error every now and again:


`Error: Child elements of 'Group' serving as the default property value for 'mxmlContent' must be contiguous.`


I would be able to get rid of it undoing whatever I had recently changed, but I pushed it to the back of my mind until now. I can replicate this error by creating a group that contains a layout tag after any visible children.


Over zealous copy/pasting a rectangle with a stroke into a group tag, bumping the layout tag lower caused this error for me. 


Flex, trying to add visible elements and not knowing how to layout this component complains that child elements aren’t `contiguous`. Needless to say, the error message could be worded differently.


This code generates the error. Notice the comment to fix the error; move the layout tag to the first element after the declaration.



```
<?xml version="1.0" encoding="utf-8"?>
<s:Application name="Test" xmlns:s="library://ns.adobe.com/flex/spark">
<s:Group>
	<!-- border/background graphics -->
	<s:Rect width="100%" height="100%">
		<s:stroke>
			<s:SolidColorStroke color="0x000000" weight="2"/>
		</s:stroke>
	</s:Rect>

	<!-- move the layout information to the first declared elment
                 after <s:Group> to solve the error. -->
	<s:layout>
		<s:HorizontalLayout/>
	</s:layout>

	<!-- content of container -->
	<s:Label text="test" />
	<s:Graphic >
		<s:Ellipse width="12" height="12"
				   x="0" y="0">
			<s:fill>
				<s:SolidColor color="0xFF0000" />
			</s:fill>
		</s:Ellipse>
	</s:Graphic>
</s:Group>
</s:Application>

```

Looking at the documentation (see below) we see that ‘mxmlContent’ refers to the visible children of that mxml tag. The description clued me that the error message referred to layout and children of the container.



```
[Write Only] The visual content children for this Group. This method is used internally by Flex and is not intended for direct use by developers.
The content items should only be IVisualElement objects. An mxmlContent Array should not be shared between multiple Group containers because visual elements can only live in one container at a time.

If the content is an Array, do not modify the Array directly. Use the methods defined by the Group class instead.

Language Version:
3.0
Player Version:
Flash 10, AIR 1.5
Product Version:
Flex 4

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['flex']

Original Wordpress tags: "flex", "compile error", "flex", "mxmlContent"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2010/04/13/mxmlcontent-must-be-contiguous/#comments">2 Comments</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/04/13/mxmlcontent-must-be-contiguous/)

##### EOF/Footnotes

