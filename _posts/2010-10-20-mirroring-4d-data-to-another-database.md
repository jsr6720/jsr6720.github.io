---
layout: post
author: James Rowe
title:  "Mirroring 4D data to another database"
date:   "2010-10-20 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "4D", "mirror", "replicate"
uid: 9aad86d4-74a4-4fd1-811f-d127303db935
---


## Mirroring 4D data to another database


UPDATE:


Code rewrite is more generic, not rely on executing in the context of a trigger, and is meant to be spawned with a `New Process` command. Removing the processing burden from the client. Before it was executing on server, but in a trigger, thus the client still had to wait for a response (300-500 milliseconds vs instantaneous).


ORIGINAL POST:


4Dv11 is an integrated part of my work environment. However it can’t do everything, so the decision was made to mirror the data from 4D (source) to another DBMS system (target). This is not to be confused with 4Dv12 synchronize and replicate functions, which only work from 4D to 4D.


We have done exactly this using a great tool called Oracle Data Integrator (ODI). However ODI relies on JDBC connectivity, which 4D stopped updating as of its v2004 line. The ODBC-JDBC bridge did not work properly, and here is a shameless plug for an outstanding [feature request](http://forums.4d.fr/Post/EN/1647462/1/3153784) for JDBC driver for 4Dv11 onward.


The approach to this problem, is to have data from the source mirror itself out to a target and accept changes from that mirror system back. All sql based `INSERT` `UPDATE` and `DELETE` operations are to send their changes to the target.


Limitations* Requires an exact copy of the database schema and data in the target
* No concept of primary keys in 4Dv11 so one is sent as a parameter of the function
* No database event or trigger thrown for `TRUNCATE` or `DROP TABLE`
* This example was built with Postgresql Plugin by pluggers.nl. While something similar could be built with 4D OCI, or using `SQL LOGIN` via native 4D, the prepared statement functionality would have to be rebuilt.


On with the code. There are some bits in here that relate to accepting the changes back. If the intent of the mirror is just to project the changes onto a target then this code needs stripping down to remove references to the boolean flag that prevents infinite loops.


I would be more than happy to help, if others find it useful, but not quite there.



```
  ` ----------------------------------------------------
  ` User name (OS):
  ` Date and time: 10/26/10, 09:21:36
  ` ----------------------------------------------------
  ` Method: Sync_Record
  ` Description
  ` This is the rewrite to Trigger_Sync so it can execute in a new process
  ` therefor not stopping client processing time.
  `
  ` Parameters
  ` ----------------------------------------------------
  ` $1 - text - pk field name
  ` $2 - longint - database event (ie what to do INSERT/UPDATE/DELETE)
  ` correlates to "On ____ Database Event" constants
  ` $3 - longint -  table number
  ` $4 - longint -  record number
  ` $5  - longint - pk value (used for delete) because this is a new process if a user does a delete action
  ` it is highly probable that the record will be deleted before this is executed. ie @GOTO RECORD@ will not work
  ` $6 - boolean - (optional) override db event check, use the id to find out if it's an INSERT or an UPDATE

  ` we only want to go into this if it is an update from 4D, NOT an update sync from Postgres
  ` so we're going to rely on a "mirror" boolean field to track sync changes vs regular changes

  `ON ERR CALL("Generic_Error_Proc")

If (True)  ` give this function a kill switch, flip this to false to break mirror

	C_LONGINT($vl_numParam)
	$vl_numParam:=Count parameters

	If ($vl_numParam>=5)  ` we don't want to even begin to try this without proper parameters

		  ` declare some variables I expect ot use
		C_LONGINT($recordNum;$vl_TableNr;$vtmp_idValue;$lengthFound)
		C_POINTER($vp_Table;$vp_MirrorField)
		C_BOOLEAN($vb_InsertOnUpdateNotFound)

		  ` special field name for syncing and for identifying
		C_TEXT($mirrorFieldName;$1;$pkFieldName)

		  ` this is the boolean field that the script will look for to determine whether to send or not send the update
		  ` this prevents the two systems from constantly throwing the update back between each other
		$mirrorFieldName:="trigger_sync_flag"

		  ` this method currently only supports numeric based fields
		$pkFieldName:=Lowercase($1)  ` we are matching to lowercase field names

		$dbEvent:=$2  ` On Database Event constants
		$vl_TableNr:=$3
		$recordNum:=$4
		$vtmp_idValue:=$5

		  `  ` === Leave this in for future functionality ===
		  `  ` assume we won't insert if we don't impact an update row
		  `$vb_InsertOnUpdateNotFound:=False
		  `If ($vl_numParam>=6)
		  `$vb_InsertOnUpdateNotFound:=$6  ` value is being set
		  `  ` not used right now, but the idea being we can do an update
		  `  ` on a row that failed to get over the first time, or was prior the date
		  `  ` range that was originally copied over and have it do an insert not an update
		  `End if

		  ` we need a table name regardless and a pointer for the table
		$vp_Table:=Table($vl_TableNr)
		$vt_TableName:=Lowercase(Table name($vp_Table))

		Case of
			: ($dbEvent=On Deleting Record Event )
				  ` this could just sub in $vtmp_idValue instead of a prepared statement ?
				  ` but that would rely on trusting input from another function, which I do not.
				$sql_DELETE:="DELETE FROM  \""+$vt_TableName+"\" WHERE "+$pkFieldName+"=?"  ` should only be a 1:1 delete

			: ($dbEvent=On Saving New Record Event ) | ($dbEvent=On Saving Existing Record Event )

				  ` I could also use QUERY with pk and pk value, but GOTO RECORD is probably faster
				  ` and can result in only one record being selected. if this fails will thrown error
				READ ONLY($vp_Table->)
				GOTO RECORD($vp_Table->;$recordNum)

				  ` track the total number of valid fields which is different than the valid field numbers
				  ` ie field numbers can go 1, 2, 4 even though there are really only 3 fields.
				$vl_TotalValidFieldCount:=0

				  ` Build the insert statement for this table
				$sql_INSERT:="INSERT INTO \""+$vt_TableName+"\" ( "

				$sql_UPDATE:="UPDATE  \""+$vt_TableName+"\" SET "

				  ` this loop builds the statement with
				For ($vl_FieldNr;1;Get last field number($vp_Table))
					If (Is field number valid($vp_Table;$vl_FieldNr))
						$vl_TotalValidFieldCount:=$vl_TotalValidFieldCount+1

						  ` get a field name
						$vt_FieldName:=Lowercase(Field name($vl_TableNr;$vl_FieldNr))

						  ` build my statments
						$sql_INSERT:=$sql_INSERT+"\""+$vt_FieldName+"\", "

						$sql_UPDATE:=$sql_UPDATE+"\""+$vt_FieldName+"\"=?, "
					End if
				End for

				  ` Add the values clause to INSERT
				$sql_INSERT:=Substring($sql_INSERT;1;Length($sql_INSERT)-2)
				$sql_INSERT:=$sql_INSERT+" ) VALUES ( "
				$sql_INSERT:=$sql_INSERT+("?, "*$vl_TotalValidFieldCount)
				$sql_INSERT:=Substring($sql_INSERT;1;Length($sql_INSERT)-2)
				$sql_INSERT:=$sql_INSERT+" )"

				  ` add the where clause to update statment
				$sql_UPDATE:=Substring($sql_UPDATE;1;Length($sql_UPDATE)-2)
				$sql_UPDATE:=$sql_UPDATE+" WHERE "+$pkFieldName+"=?"

			Else
				  ` should never happen

		End case

		  ` regardless what database event occured a connection is needed
		$vl_Connection:=PgSQL_DB_ConnectionManager ("open mirror")

		  ` make sure we have a connection
		If ($vl_Connection#0)

			  ` we're looking at database events
			Case of
				: ($dbEvent=On Deleting Record Event )

					vl_Statement:=PgSQL New SQL Statement ($vl_Connection;$sql_DELETE)
					PgSQL Set Longint In SQL (vl_Statement;1;$vtmp_idValue)

				: ($dbEvent=On Saving New Record Event ) | ($dbEvent=On Saving Existing Record Event )

					  ` the only difference is which statment to use, and UPDATE needs a where clause
					  ` Choose is 0 based, $dbEvent is 1 based, which is why there is a blank string for location "1"
					vl_Statement:=PgSQL New SQL Statement ($vl_Connection;Choose($dbEvent;"";$sql_INSERT;$sql_UPDATE))

					  ` track the total number of valid fields
					$vl_TotalValidFieldCount:=0

					  ` Insert the field values in the SQL statement
					For ($vl_FieldNr;1;Get last field number($vp_Table))

						If (Is field number valid($vp_Table;$vl_FieldNr))
							  ` this is the index to stick the value in, not the field number as it increments even if a field has been deleted
							$vl_TotalValidFieldCount:=$vl_TotalValidFieldCount+1

							$vp_Field:=Field($vl_TableNr;$vl_FieldNr)  ` returns a pointer to the field
							$vp_FieldName:=Field name($vp_Field)
							GET FIELD PROPERTIES($vp_Field;$vl_FieldType)

							Case of
								: ($vp_FieldName=$mirrorFieldName)
									  ` we want to catch this first and set it manually (we already know it's false)
									  ` set it to true so the mirror system doesn't send it back
									PgSQL Set Boolean In SQL (vl_Statement;$vl_TotalValidFieldCount;Num(1))
								: ($vl_FieldType=Is Alpha Field )
									  ` if we find even one, we want to remove all of them
									If ((Position(Char(Carriage return );$vp_Field->;$lengthFound;*)#0) | ((Position(Char(Tab );$vp_Field->;$lengthFound;*)#0)))
										  ` believe it or not, a string of lenght 80 with a Carriage return is actually longer than 80 characters.
										  ` 4D ignores this, postgresql does not
										$vp_Field->:=Replace string(Replace string($vp_Field->;Char(Carriage return );" ";*);Char(Tab );" ";*)
									End if
									PgSQL Set String In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Text )
									PgSQL Set Text In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Boolean )
									PgSQL Set Boolean In SQL (vl_Statement;$vl_TotalValidFieldCount;Num($vp_Field->))
								: ($vl_FieldType=Is Integer )
									PgSQL Set Integer In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is LongInt )
									PgSQL Set Longint In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: (($vl_FieldType=Is Real ) | ($vl_FieldType=Is Float ))
									If (String($vp_Field->)="INF")
										  ` lets reset this value
										$vp_Field->:=0
									End if
									PgSQL Set Real In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Date )
									PgSQL Set Date In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Time )
									PgSQL Set Time In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Picture )
									PgSQL Set Picture In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is BLOB )
									PgSQL Set Blob In SQL (vl_Statement;$vl_TotalValidFieldCount;$vp_Field->)
								: ($vl_FieldType=Is Subtable )
									PgSQL Set Text In SQL (vl_Statement;$vl_TotalValidFieldCount;"NULL")  ` Not supported
								Else
									  ` problem
							End case

						End if

					End for

					If ($dbEvent=On Saving Existing Record Event )
						  ` we also need a where clause (not present in an insert)
						  ` always append a where clause at the end
						PgSQL Set Longint In SQL (vl_Statement;$vl_TotalValidFieldCount+1;$vtmp_idValue)

					End if

			End case

			  ` make my execution and exit
			$vl_AffectedRows:=PgSQL Execute ($vl_Connection;"";vl_Statement)

			PgSQL Delete SQL Statement (vl_Statement)
			  ` lets make sure it's cleared
			CLEAR VARIABLE(vl_Statement)

			  ` we need to close it too
			$result:=PgSQL_DB_ConnectionManager ("close";$vl_Connection)

			  ` lets make sure we unload the record
			UNLOAD RECORD($vp_Table->)
			REDUCE SELECTION($vp_Table->;0)

		End if

	End if

End if   `kill switch if

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "mirror", "replicate"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/20/mirroring-data-to-another-database/)

##### EOF/Footnotes

