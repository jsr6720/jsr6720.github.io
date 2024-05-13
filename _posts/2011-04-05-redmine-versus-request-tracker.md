---
layout: post
author: James Rowe
title:  "Redmine versus Request Tracker"
date:   "2011-04-05 00:00:00 -0400"
tags: 2011 wordpress, txcowboycoder, "Misc", "redmine", "request tracker", "rt vs redmine", "rt3"
uid: f4fbbfdc-180b-42ea-b022-a38d2153bcef
---


## Redmine versus Request Tracker


A comparison of [Request Tracker](http://bestpractical.com/rt/) version 3.8.4 to [Redmine](http://www.redmine.org) version [1.0.4](http://www.redmine.org/projects/redmine/versions/26).


This evaluation preceded scripting a [migration](https://github.com/jsr6720/Request-Tracker-to-Redmine-Migration) between the two systems.


## Introduction


This targets the general features in Redmine vs. Request Tracker and is not a comparison of custom variables, or configuration options. This is not an exhaustive list; this was written as a simple comparison of basic issue tracking features between Request Tracker 3.8.4 and Redmine 1.0.4.


## Features unique to Redmine


### More than just a ticket tracking system


Request Tracker excels at one thing, ticket tracking. Redmine is an [issue tracking system](http://www.redmine.org/wiki/redmine/RedmineIssueTrackingSetup) and has additional modules available.


* Time tracking
* News
* Documents
* Files
* Wiki
* Repository
* Forums


## Features unique to Request Tracker


### Reply to closed ticket re-opens it


In redmine replying to a ticket does not change the status.


### Outgoing e-mails stored


Request Tracker tickets show an entire chain of events, including all automated e-mails with full headers. In experience, occasionally useful.


### Comment vs. Reply to requester


Request Tracker has a concept of replying to requester and making comments on an issue. Redmine will send update e-mails for every comment, regardless of content.  

 There is an open feature request for [private comments](http://www.redmine.org/issues/1554) that addresses this issue.


[Redmine Stealth Plugin](http://www.redmine.org/wiki/redmine/PluginRedmineStealth) to temporarily disable notifications on actions taken by a user.   

 It is ajax based, so if I wanted to make a comment on an issue that sent no notifications; I would click the **Enable Stealth Mode** link, take my actions, then **Disable Stealth Mode** after I’m done.  

 Again this is user based, so it does not affect other actions taken by other users.


There is an open request on Redmine for functionality similar to this:  

<http://www.redmine.org/issues/6229>


### Ticket Requester


One of the more advanced features of Request Tracker was the **People** section. Request Tracker stored who created the ticket, who owned the ticket, and requesters of the ticket. Created is a searchable, but essentially hidden attribute of a Request Tracker ticket.  

 This allowed Request Tracker users to create a ticket for a user, and assign them as the requester. This is not possible in Redmine.


Redmine only stores Author (Request Tracker – creator). The only way to get an issue created with the proper author is for that person to create it via e-mail or by logging in.


Open feature request to change that:  

<http://www.redmine.org/issues/2035>


### Merge Tickets


In Request Tracker when a ticket was merged with another, only one ticket existed at the end of the process. The original ticket number would point to the ticket it was merged into, and the content from the merging ticket would appear in the merged ticket.


This was useful for joining several e-mails that were related to one ticket.


In Redmine you can only link related tickets by adding a **duplicates** or **duplicated by** related issue. This will only establish a link between the two issues, not copy content from one to another.


Also, there is a standing practice to find the duplicate ticket and close it, so time/comments/updates are logged against one issue.


There are a few standing feature request for this functionality


* <http://www.redmine.org/issues/1624>
* <http://www.redmine.org/issues/3708>


To accomplish the same concept as Request Tracker “merge” mark multiple Redmine issues **duplicates** and update the most recent ticket as the “active” one.


### Reminders


In Request Tracker you could attach reminders to tickets that would show up on your main page. Reminders could have a date and subject. There is no concept of this in Redmine.


At best comments can be made against an issue, or watch an issue.


**NOTE** reminders live in the tickets table as rt3.tickets.type = ‘reminder’ so they could be converted as pseudo tickets if needed, related to the attached ticket.


### Ticket Status ‘delete’


In Request Tracker tickets could not be deleted. A status of ‘delete’ only meant the ticket was hidden from the gui, but can still be accessed via direct ticket number input, and still existed in the database.


## Conclusion


For just issue tracking, both systems offer lots of features. However for me Redmine takes the cake with the larger feature set of project management.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Misc']

Original Wordpress tags: "Misc", "redmine", "request tracker", "rt vs redmine", "rt3"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/04/05/redmine-versus-request-tracker/#comments">6 Comments</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/04/05/redmine-versus-request-tracker/)

##### EOF/Footnotes

