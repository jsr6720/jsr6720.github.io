---
layout: post
author: James Rowe
title: "Infinite is a real number in 4D"
date: "2010-10-22 00:00:00 -0400"
category: engineering
tags: 2010 txcowboycoder 4D
uid: 1eae0bc3-f65e-4229-baf3-f887faa99638
---

## Infinite is a real number in 4D

**Final Update:**

I’ve made a [feature request](http://forums.4d.fr/Post/EN/4516107/1/4516108#4516108) to 4D  

**Original Post:**

While programming in 4D I discovered that 1/0 does not throw an error, and that it could be stored into a record as INF when the data type is `REAL`. Please someone tell me they find this as unreasonable as I do[^javascript].

UPDATE: Depending on the declared type of the variable 4D stores two different results

```
[Table]Field_Real:=1/0 ` results is INF
` totally unrelated but just as bizarre
[Table]Field_Integer:=1/0 ` results is 2147483647
```

Why is this bad? Well for one php, ruby, python, perl, java, c++, javascript, calculators, all throw errors when dividing by zero so why doesn’t 4D? 

Also, how do you do a SQL call on INF? How you query on INF? Why can you store an infinite number in a REAL datatype? Why does 4D return a different result for the same operation depending on data type?


```
  ` declare some variables
C_REAL($inf)
C_TEXT($tmp)
  ` $inf = 0
$inf:=1
  ` $inf=1
$inf:=1/0
  ` $inf=INF ($inf#"INF" comparison error)
$inf:=$inf+10
  ` $inf still equal INF
$tmp:=String($inf)
  ` $tmp="INF"
If ($tmp="INF")
    ALERT("inf")
End if

CREATE RECORD([People])
[People]Name:="Joe Bob" ` data type alpha
[People]Hourly_Rate:=$inf ` data type REAL
  ` [People]Hourly_Rate=INF (even the field object shows "INF" on a form)
SAVE RECORD([People])

```

I called 4D, they didn’t know if I could file a bug because it wasn’t clear if it’s a feature or an undocumented part of the system.

UPDATE:

4D says INF is really the representation of a “really large” number. Thus it is a feature, and is up to the developer to make sure not to divide by zero.

---

### Significant Revisions

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/22/infinite-is-a-real-number-in-4d/)

### Footnotes

[^javascript]: {{ "2024-05-13 01:20:32" | date_to_string: "ordinal", "US" }} just wait until I discover `JavaScript` math...

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

  Original Wordpress categories: ['4D']
  
  Original Wordpress tags: "4D", "divide by zero", "infinate", "real"
