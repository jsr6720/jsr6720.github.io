---
layout: post
author: James Rowe
title:  "Encapsulate form/object methods with form event case statements"
date:   "2011-05-03 00:00:00 -0400"
category: engineering
tags: 2011 txcowboycoder 4D
uid: 9d410dd2-b509-44f2-a6ae-d3d68a403feb
---

## Encapsulate form/object methods with form event case statements

Clean code principle: run targeted code only once, even if multiple executions won’t ‘hurt anything’.

Make sure of this in 4D by encapsulating code with a `Case of` targeting specific events and turn off unneeded events.


```4D
C_LONGINT($vl_form_event)
$vl_form_event:=Form event

Case of
	: ($vl_form_event=On Load )  ` or other event
		  ` do code here
	Else
		  ` should not have this event enabled then

End case
```

This provides clarity on what code is to execute for the specified event. It also prevents code from [executing multiple times]({% post_url 2011-05-02-toggle-off-4d-form-events-for-easier-debugging %} "Toggle off 4D form events for easier debugging")[^original-link] if new events are selected for a form/object. I.e. enabling `On Load` with implicit `On Click` code already existing in the method.

I don’t type this every time I want to trap events. So I put the following in my [macro file](http://doc.4d.com/4Dv12.1/help/Title/en/page1034.html).

```
<macro name="CaseOf Form event">
	<text>
		C_LONGINT($vl_form_event)
		$vl_form_event:=Form event

		Case of
			: ($vl_form_event=<caret/> )
				<selection/>
		End case
	</text>
</macro>

```

**\*Note** the above macro does not generate the given source, its just a starting point.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/03/encapsulate-formobject-methods-with-form-event-case-statements/)[^draft]

### Footnotes

[^original-link]: Originally cross linked in WordPress <http://txcowboycoder.wordpress.com/2011/04/02/toggle-off-4d-form-events-for-easier-debugging/>

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

	Original Wordpress categories: ['4D']

	Original Wordpress tags: "4D", "4D", "4D v11", "case of", "clean code", "form event", "macro"

	Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/05/03/encapsulate-formobject-methods-with-form-event-case-statements/#comments">1 Comment</a>
