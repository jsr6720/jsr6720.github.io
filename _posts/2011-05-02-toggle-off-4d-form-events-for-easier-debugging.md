---
layout: post
author: James Rowe
title:  "Toggle off 4D form events for easier debugging"
date:   "2011-05-02 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "4D", "4Dv11", "clean code", "debugger", "event", "form event"
uid: 0d1f11d1-9d3c-454a-aad4-b404d2b84f1e
---


## Toggle off 4D form events for easier debugging


**Default Setup**  

[![default form events](https://txcowboycoder.files.wordpress.com/2011/04/default_form_events.png?w=153&h=300 "default_form_events")](http://txcowboycoder.files.wordpress.com/2011/04/default_form_events.png)


When creating a new form in 4D v11 it comes with a range of events ‘enabled’ (see figure). I’m assuming this is for ease of development.


However, I advocate for turning off all events first and then [enabling specific events](http://txcowboycoder.wordpress.com/2011/04/03/encapsulate-formobject-methods-with-form-event-case-statements/ "Encapsulate form/object methods with form event case statements") on an as needed basis.


4D will go into each form method and object method that has the event enabled and execute the method. When debugging this can be a real hassle because each event will trigger even if there is no ‘real’ code executed. 4D can’t tell what is in your methods and is just throwing events that the developer has specified.


### Example


Consider a simple form with a drop down chooser and two buttons. The form level `On Click` event does not have to be enabled for the object to throw the same event. However if there is code in the form method that is not protected by a form event case statement it will be executed in addition to the object method.


**Form Design View**


[![simple form](https://txcowboycoder.files.wordpress.com/2011/04/simple_form.png?w=300&h=219 "simple_form")](http://txcowboycoder.files.wordpress.com/2011/04/simple_form.png)


**Form method**



```
` executes on load and on click and whatever other events are triggered
` set a default choice for the array aTable (drop down chooser)
aTables:=aTables{1}

```

**Object method**



```
` executes on click
vTable_Chosen:=aTables

```

The object method goes first and gets the table name, but then the form method ‘resets’ the array location back to the first pointer. Moral of the story, wrap your code.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "4Dv11", "clean code", "debugger", "event", "form event"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/05/02/toggle-off-4d-form-events-for-easier-debugging/#comments">2 Comments</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/02/toggle-off-4d-form-events-for-easier-debugging/)

##### EOF/Footnotes

