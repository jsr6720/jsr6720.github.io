---
layout: post
author: James Rowe
title: "4Dv11.8 drag and drop with list boxes header gotcha"
date: "2010-11-17 00:00:00 -0400"
category: engineering
tags: 2010 txcowboycoder 4D
uid: 0c551d75-95d6-486b-84e4-88f3e48568e2
---

## 4Dv11.8 drag and drop with list boxes header gotcha

Using new functionality [drag and drop](http://doc.4d.com/4D-Language-Reference-11.6/Drag-and-Drop/Drag-and-Drop.300-206161.en.html) with 4D list boxes?

Watch out for this: only the entire listbox object can be made draggable/droppable from the actions pane of the object properties. 

Even though a listbox is made of headers and column rows, a drag from cells to the header will show as invalid at the UI level. If the user tries to drop it on a header 4D will still go into the list box object method `On drop` form event.

Moving the on drop code to the columns object method inside the list box has no effect. Dropping a cell onto a header still throws the `On drop` event.

`OK` is of no help either, it is 1 regardless of drop target. If [`Drop position`](http://doc.4d.com/4D-Language-Reference-11.6/Drag-and-Drop/Drop-position.301-206162.en.html) returns -1 seems to be the only indicator a header row was dropped on. A 0 indicates dropping the cell beyond the populated values.

Either way it is frustrating to program around. How about a `Get current target` method, or change drag and drop properties function call. To state that the current object method executing is the drop target is clearly not granular enough to differentiate from data rows and header rows.

I should also note that returning -1 from `On Drag Over` event prevents any code from executing `On Drop` and displays the invalid drop target icon.


```
` old way
DRAG AND DROP PROPERTIES ( srcObject ; srcElement ; srcProcess )
` new way
DRAG AND DROP PROPERTIES ( srcObject ; srcElement ; srcProcess ; tarObject ; tarElement ; tarProcess )

```


---

### Significant Revisions

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/17/4d-drag-and-drop-with-list-boxes-header-gotcha/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4D", "drag-and-drop", "listbox"