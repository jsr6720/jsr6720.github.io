---
layout: post
author: James Rowe
title: "Use CAST in 4D volatile SQL statements"
date: "2011-04-26 00:00:00 -0400"
category: engineering
tags: 2011 txcowboycoder 4D
uid: 26d65656-5d14-4122-9329-0686d112634b
---

## Use CAST in 4D volatile SQL statements

Hint, to avoid hair pulling use the 4D function [`CAST`](http://doc.4d.com/4Dv12.1/help/Title/en/page18321.html) to explicitly type [data types](http://doc.4d.com/4Dv12.1/help/Title/en/page18465.html) in 4D SQL statements.

Consider the following for boolean field \[ODBCTest\]FieldBoolean.

```
// 4Dv12.1 sees this as a string assignment to boolean
// FieldBoolean = true throws an unfound column error
Begin SQL
	UPDATE ODBCTest
	SET FieldBoolean = 'true'
	WHERE id=29168
End SQL
```

This will throw error `1108`:

```
Error code: 1108
Operation VK_STRING  = VK_BOOLEAN  is not type safe.
component: 'SQLS'
task 11, name: 'P_2'
```

However, using `CAST` will give us the desired result.

```
// also works: CAST(1 as BOOLEAN)
Begin SQL
	UPDATE ODBCTest
	SET FieldBoolean =CAST( 'true' as BOOLEAN)
	WHERE id=29168
End SQL
```

Of course it would be nice if [4D compiler could detect these]({% post_url 2011-04-25-compiler-warning-on-possible-loss-of-precision %} "Compiler warning on possible loss of precision")[^original-link] types of problems before they occur.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/04/26/use-cast-in-4d-volatile-sql-statements/)[^draft]

### Footnotes

[^original-link]: Originally cross linked in WordPress http://txcowboycoder.wordpress.com/2011/04/25/compiler-warning-on-possible-loss-of-precision/

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

	Original Wordpress categories: ['4D']

	Original Wordpress tags: "4D", "4D", "CAST", "data types", "Error code: 1108", "sql"

	Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/04/26/use-cast-in-4d-volatile-sql-statements/#comments">1 Comment</a>
