---
layout: post
author: James Rowe
title: "Java string comparison"
date: "2011-05-23 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder java
uid: 73d73f93-b9a7-4baf-80eb-a00724b0262c
---

## Java string comparison

Mostly just a ‘duh’ moment by myself.

I was fetching properties out of a database using hibernate objects. In my test scenario I asked if `"true" == "true"` which does work. However a String object does not always equal a string literal nicely.

[String JavaDocs](https://web.archive.org/web/20110310094819/http://download.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#equalsIgnoreCase(java.lang.String))

```java
public class Test {

	public static void main(String args[]) {
		System.out.println("String comparison");
		// BAD could be true, but could also be false
		boolean result = "true" == "true" ? true : false;
		// GOOD will actually compare the strings, not the objects
		boolean result2 = hibernate_object.getProperties().get("boolean property").equalsIgnoreCase("true") ? true : false;

		System.out.println(result);
		System.out.println(result2);
	}
}
```

&nbsp;

---

## Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/23/java-string-comparison/)[^draft]

## Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>