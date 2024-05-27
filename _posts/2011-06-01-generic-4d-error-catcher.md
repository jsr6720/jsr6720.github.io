---
layout: post
author: James Rowe
title:  "Generic 4D error catcher"
date:   "2011-06-01 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D clean-code error-handling event-handling
uid: 50bc216f-26a9-49ae-b239-11760d972acd
---


## Generic 4D error catcher


In 4D v11/12 there is not a strict concept of `try/catch` blocks. Instead there is [`ON ERR CALL`](http://doc.4d.com/4Dv12.2/help/command/en/page155.html "ON ERR CALL") that can be used to trap errors.


A common challenge in production environments is identifying errors and reporting them without user initiative. The following code when included with the `ON ERR CALL` procedure is valuable in tracking down these problems.


The sample code builds a string with all the relevant error information. Additional information is added for each type of error. Here it displays an alert box, but this starting point could easily be written to database, or passed into an e-mail.


Feedback welcome, sound off in the comments, what do you do for error handling?



```
  ` ----------------------------------------------------
  ` User name (OS):
  ` Date and time:
  ` ----------------------------------------------------
  ` Method: Generic_Error_Proc
  ` Description
  ` Specify with ON ERR CALL(&quot;Generic_Error_Proc&quot;) to
  ` capture and report 4D errors. This method can handle
  ` 4D Engine Errors, SQL Engine Errors and Trigger Errors
  ` It also collects some information about the execution context
  ` The diagnostic information included is intended for developers, not end users.
  `
  ` Parameters
  ` ----------------------------------------------------
  ` 4D does not pass in params to this function instead it sets
  ` System Variables Error, Error method, and Error Line (the latter two only in v12 http://kb.4d.com/search/assetid=76150)

C_LONGINT($errCode;$i)
C_TEXT($errText;$vt_TableName;$errODBC)
C_LONGINT($errSQLServer)

C_LONGINT($Error)
C_TEXT($Message)

C_POINTER($vp_ParentTable)
C_LONGINT($vl_RecordNum)

SQL GET LAST ERROR($errCode;$errText;$errODBC;$errSQLServer)

ARRAY INTEGER($codesArray;0)
ARRAY STRING(50;$internalCompArray;0)
ARRAY STRING(255;$textArray;0)

GET LAST ERROR STACK($codesArray;$internalCompArray;$textArray)

  ` general 4D error stack only if there is an error
If (Error#0)
	$Message:=$Message+&quot;General Message(Error Stack):&quot;+Char(Carriage return )
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
	$Message:=$Message+&quot;Error: &quot;+String(Error)+Char(Carriage return )
	  ` Available in 4Dv12 is Error Line and Error method process variables
	For ($i;1;Size of array($codesArray))
		  ` Do something with the element
		$Message:=$Message+String($codesArray{$i})+Char(Tab Key )+$internalCompArray{$i}+Char(Carriage return )+$textArray{$i}+Char(Carriage return )+Char(Carriage return )
	End for
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
End if

  ` return information if it is a trigger based error too
C_LONGINT($tLevel)
$tLevel:=Trigger level
If ($tLevel#0)
	C_LONGINT($dbEvent;$tableNum;$recordNum)
	TRIGGER PROPERTIES($tLevel;$dbEvent;$tableNum;$recordNum)

	$Message:=$Message+&quot;Trigger Message: &quot;+Char(Carriage return )
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
	$Message:=$Message+&quot;Table Name - Record Number: &quot;+Table name($tableNum)+&quot; - &quot;+String($recordNum)+Char(Carriage return )
	` Choose is 0 based, Database event is 1 based. so pad the results with a blank string
	$Message:=$Message+&quot;Event: &quot;+Choose($dbEvent;&quot;&quot;;&quot;Saving New&quot;;&quot;Saving Existing&quot;;&quot;Deleting&quot;)+Char(Carriage return )
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
	$Message:=$Message+Char(Carriage return )

End if

  ` 4D SQL error stack (thrown by new SQL engine)
If ($errCode#0)
	$Message:=$Message+&quot;SQL MESSAGE: &quot;+Char(Carriage return )
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
	$Message:=$Message+&quot;Data Source: &quot;+Get current data source+Char(Carriage return )
	$Message:=$Message+&quot;Error Code: &quot;+String($errCode)+Char(Carriage return )
	$Message:=$Message+&quot;Error Text: &quot;+$errText+Char(Carriage return )
	$Message:=$Message+&quot;Error ODBC: &quot;+$errODBC+Char(Carriage return )
	$Message:=$Message+&quot;Error SQL Server: &quot;+String($errSQLServer)+Char(Carriage return )
	$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
	$Message:=$Message+Char(Carriage return )
End if

  ` Finally lets collect some user information and timestamps
$vp_ParentTable:=Current form table
If (Not(Nil($vp_ParentTable)))
	$vl_RecordNum:=Record number($vp_ParentTable-&gt;)
	$vt_TableName:=Table name($vp_ParentTable)
Else
	$vl_RecordNum:=-1
	$vt_TableName:=&quot;Nil&quot;
End if

$Message:=$Message+Char(Carriage return )+&quot;Client Information: &quot;+Char(Carriage return )
$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )
$Message:=$Message+&quot;Current User: &quot;+Current user+Char(Carriage return )
$Message:=$Message+&quot;Current Machine: &quot;+Current machine+Char(Carriage return )
$Message:=$Message+&quot;Current form table: &quot;+$vt_TableName+Char(Carriage return )
$Message:=$Message+&quot;Current record num: &quot;+String($vl_RecordNum)+Char(Carriage return )
  ` only in 4D V12
  ` $Message:=$Message+&quot;Error method: &quot;+Error method+Char(Carriage return )
  ` $Message:=$Message+&quot;Error line: &quot;+String(Error Line)+Char(Carriage return )
$Message:=$Message+&quot;Date:  &quot;+String(Current date(*);Internal date long )+Char(Carriage return )
$Message:=$Message+&quot;Time:  &quot;+String(Current time(*);HH MM AM PM )+Char(Carriage return )
$Message:=$Message+&quot;_____________________________________&quot;+Char(Carriage return )

  ` alert this to the user. or store it in the database in the above for loops.
ALERT($Message)

```



---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "clean code", "dry", "error", "ON ERR CALL"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/06/01/generic-4d-error-catcher/#comments">2 Comments</a>

## Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/06/01/generic-4d-error-catcher/)

## EOF/Footnotes

