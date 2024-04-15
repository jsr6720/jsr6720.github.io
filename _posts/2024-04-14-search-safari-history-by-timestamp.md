---
layout: post
author: James Rowe
title:  "Search Safari history by timestamp"
date: 2024-04-14 20:47:18 -0400
tags: technology safari browser sqlite datetime
uid: 878A409A-C705-49D4-BB71-B379F14D3D68
---

## Solution for searching Safari history by timestamp

Because results matter.

1. [Copy file](#copy-the-file) ```% cp ~/Library/Safari/History.db ~/Desktop/History-copy.db```
2. Load the file ```% sqlite3 ~/Desktop/History-copy.db```
3. Query ```history_items``` and ```history_visits``` tables[^schema] by ```history_visits.visit_time```
4. Read about [978307200 magic number](#whats-the-magic-number-in-your-query) and [CFAbsoluteTime](#a-bonus-lesson-with-cfabsolutetime)

Outputs results of history in the past 2-4 hours.

```sql
select url, title, visit_time, 
    datetime(visit_time + 978307200, 'unixepoch', 'localtime') as visit_datetime 
from history_items, history_visits
where history_items.id = history_visits.history_item 
    and visit_datetime > date('now', '-4 hours') 
    and visit_datetime < date('now', '-2 hours');
```

### Bonus search by root url or title

Expanding the query to search by ```history_items.url``` and/or ```history_visits.title``` is also useful when searching on a particular domain and title.

{% highlight sql %}
-- returns last 7 days of history from nytimes url
select url, title, visit_time, 
    datetime(visit_time + 978307200, 'unixepoch', 'localtime') as visit_datetime 
from history_items, history_visits
where history_items.id = history_visits.history_item 
    and visit_datetime > date('now', '-7') 
    and visit_datetime < date('now')
    and url like %nytimes%;
{% endhighlight %}

#### Copy the file

```
% cp ~/Library/Safari/History.db ~/Desktop/History-copy.db
% sqlite3 History-copy.db
SQLite version 3.37.0 2021-12-09 01:34:53
Enter ".help" for usage hints.
sqlite> 
```

> If you get ```Operation not permitted``` error ensure terminal has access to all files and folders or copy the file manually to desktop

## The rest of the story

I prioritized sharing the solution above because several online resources helped me reverse engineer and translate ```history_visits.visit_time REAL`` to a searchable human-readable value. But most assumed you already had the specific row data you wanted to convert.

### How I ended up in this conudrum

I use a variety of browsers professionally and personally. I wanted to find something I had read,but I couldn't remember anything about it other than I had read it roughly between X and Y a few days ago. Like all great engineers after an hour of all this research I did find what I was looking for.

#### Chromium browsers show a timestamp in history

![chrome browser history](/assets/posts-images/chrome-history-timestamp.jpg)

#### Safari groups by date accessed

![safari browser history](/assets/posts-images/safari-history-date-no-time.jpg)

### Whats the magic number in your query?

I found out quickly that even though [sqlite's public documentation](https://sqlite.org/lang_datefunc.html) shows using the ```REAL``` datatype to store ```datetime```. Safari stores the timestamp using ```CFAbsoluteTime``` which does **not** work with ```sqlite> date()/time()``` functions.

```
sqlite> select visit_time, datetime(visit_time), date(visit_time), time(visit_time), title from history_visits limit 1;
701547789.516069||||example title
-- note the empty |||| where results should be
```

#### 978307200 offsets the stored value to unixepoch and parsable by sqlite functions

Shamelessly stolen from the math posted on [apple stackexchange](https://apple.stackexchange.com/questions/235357/see-website-visit-time-in-safari-history) 

Here's an example showing a stored Safari value converted to unixepoch.

```
sqlite> select datetime(701547789.516069 + 978307200, 'unixepoch', 'localtime') as 'normalized time';
2023-03-26 14:23:09
```

#### A bonus lesson with ```CFAbsoluteTime```

Once I loaded ```History-copy.db``` and tried to use the built in sqlite ```date()``` and ```time()``` functions but they weren't working. Turns out that Apple is using the ```REAL``` data type to store timestamp but using a calcuated value [CFAbsoluteTime](https://developer.apple.com/documentation/corefoundation/cfabsolutetime) which I had never heard of.

> Type used to represent a specific point in time relative to the absolute reference date of 1 Jan 2001 00:00:00 GMT.

[Apple community discussions - search safari history by date/time](https://discussions.apple.com/thread/250500866?sortBy=best)

> The problem is that the timestamp in that column is expressed in Core Data timestamp format which is not human readable. You can convert it here: https://www.epochconverter.com/coredata

#### More things learned along the way

Its been a long time since I worked with embeded sqlite. So I needed a way to inspect the schema and find the data I was looking for and the [sqlite documentation](https://sqlite.org/cli.html) had the answer.

Ironically lost along the way was the post that directed me to the ```history_items``` and ```history_visits``` tables in ```History.db```... Maybe I'll come back and build a search bot that loads the content and searches content as well.

---

##### Authors Note

First post with jekyll and expiermenting with md code escapes and jekyll codeparser

Obligatory: [https://xkcd.com/2867/](https://xkcd.com/2867/)

##### Significant revisions

tags: {{ page.tags | join: ", " }}

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

##### EOF/Footnotes

[^schema]: history schema

    | history_items | history_visits    |
    |---------------|-------------------|
    | id            | history_item (fk) |
    | url           | visit_time        |
    |               | title             |