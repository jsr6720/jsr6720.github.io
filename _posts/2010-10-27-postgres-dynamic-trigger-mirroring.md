---
layout: post
author: James Rowe
title:  "Postgres dynamic trigger — mirroring"
date:   "2010-10-27 00:00:00 -0400"
tags: 2010 wordpress, txcowboycoder, "Postgres", "4D", "plpythonu", "Postgres", "Python", "trigger"
uid: da92199e-dcc3-4fa2-b07a-86315309977f
---


## Postgres dynamic trigger — mirroring


This is a companion post to the [4D mirroring](http://txcowboycoder.wordpress.com/2010/10/20/mirroring-data-to-another-database/) The approach to this problem, is to have data from the source mirror itself out to a target and accept changes from that mirror system back. All sql based INSERT UPDATE and DELETE operations are to send their changes to the target.


It is very important to stress this is only used for Postgres UPDATE statements sending data back to the source. It does however provide an example of iterating over all the fields in a table using the python dict that is populated in `TD["new"]` and `TD["old"]`.


 Limitations* Requires `plpythonu` language installed on postgres
* Not designed to handle `DELETE`
* Not designed to handle `INSERT` can do so with UUID (not until 4Dv12)
* This is a work in progress, but it is a starting point I hope


**Iterate over table fields via python**  

 You could even do a dictionary compare to find the difference between `TD["new"]` and `TD["old"]`.



```
for field_name, field_value in TD["new"].items():
	# now we have field_name and field_value to do work on
	if field_name='alpha_field':
		tmp=field_value

```

**Full mirroring code**  

 Warning there is code here that makes the generated SQL statements 4D compliant only. This is merely a starting point.



```
-- Function: trigger_sync()

CREATE OR REPLACE FUNCTION trigger_sync()
  RETURNS trigger AS
$BODY$
# now we are using the python lanaguage
# postgresql imports object "plpy" http://www.postgresql.org/docs/8.4/interactive/plpython-database.html
# ie TD["event"].upper() IN (UPDATE INSERT DELETE etc)
# we only want to execute this if it is being updated from Postgres.
# because otherwise we could set up an infinate loop accidently
# (Target writes to postgres, trigger fires, writes back to Target, Target writes back etc)
# Only triggers sets the synced flag to true, then this trigger will clear it
# if this trigger fails the row is "SKIP"PED

# not built to handle deletes yet
# there is no ["new"] only ["old"]
#if TD["event"].upper() == "DELETE":

mirrorFieldName='trigger_sync_flag'
# pass in the field to target
pkFieldName=TD["args"][0]

# for now we need to send INSERT and DELETE to 4D and then 4D mirrors that back
# to us. v12 4D will have UUID so we can insert in either database.
if TD["new"][mirrorFieldName] or TD["event"].upper() == "INSERT":
	# this is being sent from 4D don't send it back
	# lets clear the flag and then return from the trigger
	TD["new"][mirrorFieldName] = False
	return "MODIFY"
else:
	# we need to know the data type to make the appropiate mappings, table name is constant on a per trigger basis
	plan = plpy.prepare("""SELECT data_type FROM information_schema.columns
				WHERE column_name = $1
				AND table_name='"""+(TD["table_name"])+"'", ["text"]);
	# build sql

	# 4D handles SQL strings differently
	# single apostrophes enclose strings, double apostrope is a single apostrophe escaped
	# names are enclosed in [] with a right ] to escape a pair

	sql_UPDATE = "UPDATE ["+TD["table_name"]+"] SET "
	sql_INSERT = "INSERT INTO ["+TD["table_name"]+"]"
	sql_insert_fields = ''
	sql_insert_values = ''
	sql_DELETE = "DELETE FROM ["+TD["table_name"]+"] WHERE "+pkFieldName+"=%s" % str(TD["new"][pkFieldName])

	# build the sql string first
	for field_name, field_value in TD["new"].items():
		rv = plpy.execute(plan, [field_name], 1);

		sql_insert_fields += "["+field_name+"], "

		# append to stmts
		if rv[0]["data_type"] == "boolean":
			# flip the mirroring light switch
			if field_name == mirrorFieldName:
				field_value = True

			# boolean values can't be directly passed (True/False) so we need to change it to a 1 or 0 via python
			sql_UPDATE += "["+field_name+"]" +"=CAST(%s as BOOLEAN), " % (str(int(field_value)));
			sql_insert_values += "CAST(%s as BOOLEAN), " % (str(int(field_value)))
		elif rv[0]["data_type"] == "double precision" or rv[0]["data_type"] == "integer" or rv[0]["data_type"] == "smallint":
			sql_UPDATE += "["+field_name+"]" +"=%s, " % (field_value);

			if field_name == pkFieldName: #auto increment needs nulls
				sql_insert_values +="null, "
			else:
				sql_insert_values +="%s, " % (field_value)
		elif rv[0]["data_type"] == "time without time zone":
			sql_UPDATE += "["+field_name+"]" +"='%s', " % (field_value);
			sql_insert_values +="'%s', " % (field_value)
		elif rv[0]["data_type"] == "date":
			tmpDateString = 'null' if field_value is None else "'"+field_value+"'"
			sql_UPDATE += "["+field_name+"]" +"=%s, " % (tmpDateString);
			sql_insert_values +="%s, " % (tmpDateString)
		else:
			# text characater varying, lets make sure we escape the apostrophe, otherwise lets clear it out in 4D
			if field_value is not None:
				field_value = "'" + field_value.replace("'", "''") + "'"
			else:
				# if I don't this this "None" gets inserted as a string value
				field_value = 'null'

			# string is properly escaped above
			sql_UPDATE += "["+field_name+"]" +"=%s, " % (field_value);
			sql_insert_values +="%s, " % (field_value)

	# remove the trailing chars
	sql_UPDATE = sql_UPDATE.rstrip(', ');
	sql_UPDATE += " WHERE ["+pkFieldName+"]="+str(TD["new"][pkFieldName]);

	# insert
	sql_insert_fields = sql_insert_fields.rstrip(', ');
	sql_insert_values = sql_insert_values.rstrip(', ');
	sql_INSERT += "("+sql_insert_fields+") VALUES ("+sql_insert_values+")"

	import pyodbc
	from datetime import datetime, date, time

	# make sure sqlStmt is populated
	sqlStmt = "CNC"

	try:
		# open a connection
		cnxn = pyodbc.connect("DSN=A DSN") # we're connecting using the stored username/password in ODBC DSN
		# block out a cursor
		cursor = cnxn.cursor()

		# find the right statment to execute
		event = TD["event"].upper()
		if event == "UPDATE":
			sqlStmt = sql_UPDATE
		elif event == "DELETE":
			sqlStmt = sql_DELETE
		elif event == "INSERT":
			sqlStmt = sql_INSERT
		else:
			pass; # should never happen (TRUNCATE maybe)

		# commit and print results
		plpy.debug(sqlStmt)
		cursor.execute(sqlStmt)
		cnxn.commit() # don't forget this!
		#plpy.notice('attempt id: %s updated record: %s' % (TD["new"][pkFieldName],cursor.rowcount))

		# TODO: this fails if the record is locked. so we need to do checks based on that.
		cnxn.close()

		# trigger is OK
		return "OK"

	except Exception, e:

		#fail propegates up to calling layer
		plpy.error(repr(e))

		# want to skip these changes because most likely cause for error is record locking; have user try again
		return "SKIP"
$BODY$
  LANGUAGE 'plpythonu' VOLATILE
  COST 100;
ALTER FUNCTION trigger_sync() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION trigger_sync() TO public;
GRANT EXECUTE ON FUNCTION trigger_sync() TO postgres;

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Postgres']

Original Wordpress tags: "Postgres", "4D", "plpythonu", "Postgres", "Python", "trigger"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/27/postgres-dynamic-trigger/)

##### EOF/Footnotes

