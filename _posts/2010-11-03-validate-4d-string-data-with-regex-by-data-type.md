---
layout: post
author: James Rowe
title:  "Validate 4d string data with regex by data type"
date:   "2010-11-03 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "4D", "Match regex", "regex"
uid: 47ba2acc-c090-465e-83b6-064ee4a55b1c
---


## Validate 4d string data with regex by data type


[`Match regex`](http://doc.4d.com/4D-Language-Reference-12/String/Match-regex.301-155340.en.html) is a great addition to 4Dv11, but what I really need is a function that takes a string value, a data type and tells me if it’s valid or not.


I’m no regex expert, just compiled some online examples into one function. This is only a starting point, but it completes my needs for the time being. There is a whole [forum section](http://forums.4d.fr/List_Message/EN:0/0/2/1/1/1/1434147/0/0/1/-1/0/0/0/0/0/0) devoted to this online.



```
  ` ----------------------------------------------------
  ` User name (OS):
  ` Date and time: 11/02/10, 15:29:39
  ` ----------------------------------------------------
  ` Method: UTIL_ValidateDataByType
  ` Description
  ` We want to have a method that will validate data by it's type
  `
  ` Parameters
  ` ----------------------------------------------------
  `$0 returns true or false based on validity
  `$1 text data to validate cast as String
  `$2 longint type of data expected
  `$3 boolean show alerts (optional) assumed false

C_BOOLEAN($0;$vb_Return;$3;$vb_ShowAlerts)
C_TEXT($1;$vt_Data;$vt_Pattern)
C_LONGINT($2;$vl_DataType;$vl_ParameterCount)

  ` count the parameters
$vl_ParameterCount:=Count parameters
  ` assume we'll fail
$vb_Return:=False
  ` assume we don't want to see alerts
$vb_ShowAlerts:=False

If ($vl_ParameterCount>=2)
	  ` lets check them
	$vt_Data:=$1
	$vl_DataType:=$2

	If ($vl_ParameterCount>=3)
		$vb_ShowAlerts:=$3
	End if

	Case of
		: ($vl_DataType=Is Alpha Field ) | ($vl_DataType=Is Text )
			  ` we passed in a string didn't we?
			$vb_Return:=True
		: ($vl_DataType=Is Boolean )

			$vt_Data:=Lowercase($vt_Data)

			Case of
				: (($vt_Data="true") | ($vt_Data="false"))
					  ` expecting "true" or "false"
					$vb_Return:=True

				: ($vb_ShowAlerts)
					ALERT("Expecting 'True' or 'False' not "+$vt_Data)
			End case

		: ($vl_DataType=Is Integer ) | ($vl_DataType=Is LongInt )

			  ` integer only, no size restriction
			$vt_Pattern:="[-+]?\\b\\d+\\b"

			Case of
				: (Match regex($vt_Pattern;$vt_Data))
					$vb_Return:=True

				: ($vb_ShowAlerts)
					ALERT("Expecting signed integer not "+$vt_Data)
			End case

		: (($vl_DataType=Is Real ) | ($vl_DataType=Is Float ))

			  `decimal
			$vt_Pattern:="[-+]?((\\b[0-9]+)?\\.)?[0-9]+\\b"

			Case of
				: (Match regex($vt_Pattern;$vt_Data))
					$vb_Return:=True

				: ($vb_ShowAlerts)
					ALERT("Expecting decimal value not "+$vt_Data)
			End case

		: ($vl_DataType=Is Date )
			  ` Date d/m/yy and dd/mm/yyyy 1/1/00 through 31/12/99 and 01/01/1900 through 31/12/2099
			  ` ie europeon or american style dates accepted, deliminated with '-' ' ' '/' OR '.'
			$vt_Pattern:="\\b(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2}\\b"

			Case of
				: (Match regex($vt_Pattern;$vt_Data;1))
					$vb_Return:=True

				: ($vb_ShowAlerts)
					ALERT("Expecting d/m/yy or dd/mm/yyyy not "+$vt_Data)
			End case

		: ($vl_DataType=Is Time )

			  ` Time in 24 hours format with optional seconds
			$vt_Pattern:="^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$"

			Case of
				: (Match regex($vt_Pattern;$vt_Data))
					$vb_Return:=True

				: ($vb_ShowAlerts)
					ALERT("Expecting HH:MM or HH:MM:SS in 24hr format not "+$vt_Data)
			End case

		Else
			  ` not checking blobs, pictures, subtables. just move on
			$vb_Return:=True
	End case

Else
	$vb_Return:=False
End if

$0:=$vb_Return

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "Match regex", "regex"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/03/validate-4d-string-data-with-regex-by-data-type/)

##### EOF/Footnotes

