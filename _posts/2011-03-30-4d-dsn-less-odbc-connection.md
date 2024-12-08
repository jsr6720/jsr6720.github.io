---
layout: post
author: James Rowe
title:  "4D DSN-less ODBC connection"
date: "2011-03-30 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D odbc
uid: dc30133e-b5d9-4632-a423-f75a984cebd5
---

## 4D DSN-less ODBC connection

Took me forever to figure this out because the docs out there for 4D are minimal[^1] on connecting to the database without a system configured DSN using 4D's ODBC driver.

Easy configuration of multiple data sources is crucial if you want to use `CodeIgniter` or any other framework that allows configuration files to control the deployment and connection to various databases.[^2]

```php
// get the connection resource circa 2011 so php ~v5.x 4D's database default port was `19812`
$connect=odbc_connect('DRIVER={4D v11 ODBC Driver};SSL=false;SERVER=192.168.1.100;PORT=19812;UID=user;PWD=password',"","");
```

I played with various different ways of doing this connection string, and found the above the most straight forward. You can leave password blank if there isn’t one.

Now if only they would make a linux odbc driver...[^3]

## DSN Configuration

If I recall correctly our `4D` instance was deployed on a Mac Server and `PHP` a `Windows IIS` server. So the DSN configuration would've had a dialog something like below.

<figure>
    <img src="/assets/posts-images/myodbc-macos-odbcadmin-main.png" alt="mac odbc admin" class="img-stylish"/>
    <figcaption>Credit: <a href="https://docs.oracle.com/cd/E17952_01/connector-odbc-en/connector-odbc-configuration-dsn-macos.html">Oracle documentation</a></figcaption>
</figure>
<figure>
    <img src="/assets/posts-images/actian-odbc-admin.png" alt="windows odbc driver" class="img-stylish"/>
    <figcaption>Credit: <a href="https://docs.actian.com/ingres/10s/index.html#page/Connectivity/Configure_a_Data_Source_(Windows).htm">Actian documentation</a></figcaption>
</figure>

---

## Author's Note

In hindsight one of my more "popular" 4D/technology posts. [2024-05-27 comments screenshot](/assets/posts-images/4d-dsn-less-odbc-connection-comments.png)

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D ODBC driver", "DSN"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/03/30/4d-dsn-less-odbc-connection/#comments">7 Comments</a>

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-27 01:13:57 -0400" | date_to_string: "ordinal", "US" }} Came in and updated content testing layout. Added original comments
- {{ "2024-05-06 22:47:17 -0400" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/30/4d-dsn-less-odbc-connection/)

## EOF/Footnotes

[^1]: Happy to report documentation is much more comprehensive now https://doc.4d.com/4Dv20/4D/20/Using-a-connection-string.200-6341904.en.html

[^2]: Configuration as code all the way back in 2011!

[^3]: Nope. 2024 no linux.