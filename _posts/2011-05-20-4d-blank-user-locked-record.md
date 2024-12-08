---
layout: post
author: James Rowe
title:  "4D ‘blank’ user locked record"
date:   "2011-05-20 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D error-messages record-locking database
uid: 9bc29745-f1dd-445f-b137-9d1f7ef5132f
---


## 4D ‘blank’ user locked record


This example was reproduced with 4Dv11.8 HF3. This requires 4D Server and 4D Client setup. I was unable to reproduce in a stand alone environment.


While working with SQL and 4D, sometimes records would show locked status of blank.


[![Standard locked dialog](https://txcowboycoder.files.wordpress.com/2011/05/blank_user_locked.png?w=500&h=263 "blank_user_locked")](http://txcowboycoder.files.wordpress.com/2011/05/blank_user_locked.png)


`[LOCKED ATTRIBUTES](http://doc.4d.com/4Dv12.2/help/command/en/page353.html)` returns `-1` for the process in addition to the ‘blank’ user process and machine. Even though the documentation says this means you are trying to load a deleted record, this example has an existing record.


There have been a couple of examples on the [4D tech mailing list](http://permalink.gmane.org/gmane.comp.lang.inug-4d.tech/109025) regarding blank locked records. The locked record appeared to manifest from the SQL engine not ‘letting’ go of the record.


In the following simplified example a SQL query updates a record in a table, which loads another record from another table in the trigger. If that record is not unloaded it remains ‘locked’. The only way I’ve found to unlock this record is to write a project method, make it available to SQL calls and load/unload this record. Regardless of how the ‘blank’ locked record manifest itself the `IsRecordLocked` should unlock it.


### Setup


[Table\_1]Field\_1 (is alpha)  

 [Table\_2]Field\_2 (is alpha)



```
` the SQL code
Begin SQL
	UPDATE Table_1 SET Field_1='test' WHERE Field_1='a record'
End SQL

` [Table_1] trigger code
READ WRITE([Table_2])
ALL RECORDS([Table_2])
ONE RECORD SELECT([Table_2])
LOAD RECORD([Table_2]) ` this 'locks' it for SQL server
` without an UNLOAD RECORD it will stay locked

```

### Solution



```
C_TEXT($result)

` Using the SQL engine to LOAD and the UNLOAD the record works
Begin SQL

	SELECT {fn IsRecordLocked('Table_2','Field_2="test"') AS TEXT}
	FROM ODBCTest
	LIMIT 1
	INTO :$result

End SQL

ALERT($result)

```

### IsRecordLocked function



```
  ` ----------------------------------------------------
  ` User name (OS): jrowe
  ` Date and time: 05/20/11, 12:26:45
  ` ----------------------------------------------------
  ` Method: IsRecordLocked
  ` Description
  ` Unlock any record via the SQL engine
  `
  ` Parameters
  ` ----------------------------------------------------
  `$1 table name
  `$2 where clause supports any type of where clause (executed with QUERY BY SQL)
  `$0 returns string "False" if not locked (or success), "" if error, otherwise locked information

  `Error handling
ON ERR CALL("Generic_Error_Proc")

C_LONGINT($process)
C_TEXT($4Duser;$sessionUser;$processName)

C_POINTER($tablePointer)
C_TEXT($1;$2;$returnText;$tableName)
$returnText:=""

` cycle through the tables to get a pointer
For ($tableNumber;1;Get last table number)

	If (Is table number valid($tableNumber))

		$tablePointer:=Table($tableNumber)
		$tableName:=Table name($tableNumber)

		If ($tableName=$1)
			` now execute the where clause
			QUERY BY SQL($tablePointer->;$2)

			LOAD RECORD($tablePointer->)
			$returnText:="Read only: "+String(Read only state($tablePointer->))+" Records: "+String(Records in selection($tablePointer->))+"\n"

			  `We expect an update statment to only have one result
			If ((Locked($tablePointer->)) & (Records in selection($tablePointer->)=1))
				LOCKED ATTRIBUTES($tablePointer->;$process;$4Duser;$sessionUser;$processName)
				$returnText:=$returnText+"Process ID: "+String($process)+"\n"
				$returnText:=$returnText+"4D User: "+$4Duser+"\n"
				$returnText:=$returnText+"Session User: "+$sessionUser+"\n"
				$returnText:=$returnText+"Process Name: "+$processName+"\n"
			Else
				$returnText:="False" ` ie this is not locked, or was locked by sql engine
			End if
			UNLOAD RECORD($tablePointer->) ` this will free the locked status

			  `lets break the loop so we don't keep processing
			$tableNumber:=Get last table number

			$0:=$returnText
		End if
	End if
End for

  `Error handling
ON ERR CALL("")

```

Source code replicating this problem available upon request.




---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "blank record locking", "record locking", "sql locking"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/20/4d-blank-user-locked-record/)

## EOF/Footnotes

