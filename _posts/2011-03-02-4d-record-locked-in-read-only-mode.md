---
layout: post
author: James Rowe
title: "4D record locked in read only mode"
date: "2011-03-02 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder 4D
uid: 25f83d4a-da72-451f-b868-2a4db0744aea
---

## 4D record locked in read only mode

Was doing a bit of 4D v11 programming when I discovered this conundrum. I found it to be confusing, but maybe it makes perfect sense to everyone else.

When showing a record to a user with the table in read only mode, 4D returns `True` for `LOCKED` even though `LOCKED ATTRIBUTES` returns nothing. This occurs only when using `LOAD RECORD` with a table in read only mode.

I would expect that 4D would not see this as a locked record, or return system information for `LOCKED ATTRIBUTES`. Further, when another process accesses this record in read write mode, 4D does not report this record to be locked, and it can be loaded modified and saved.

```
` "Save" button on a form in READ ONLY mode
` record is displayed in variables
` with DIALOG command

C_LONGINT($Event)
$Event:=Form event

Case of
	: ($Event=On Clicked )
		  ` first we need to make sure we can load the record
		  ` I would expect 4D to return false, since the table is in read only mode
		If (Not(Locked([Table])))
			  ` map the variables back to data values
			[Table]data:=v_data
		Else
			` instead I end up here with results 0, "", "", "" respectively
			LOCKED ATTRIBUTES([Table];$process;$4d_user;$session_user;$process_name)
		End if

End case
```

However, if `UNLOAD RECORD` is execute after getting the data into variables the record is no longer `LOCKED`

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/02/4d-record-locked-in-read-only-mode/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

	Original Wordpress categories: ['4D']

	Original Wordpress tags: "4D", "4D v11", "locked record", "read only mode"