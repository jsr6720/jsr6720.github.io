---
layout: post
author: James Rowe
title:  "SVN Windows and ‘._’ Apple double files"
date:   "2010-10-28 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder svn error-messages mac-programming
uid: 778069d0-95ba-4272-807b-4e58ce3a052c
---


## SVN Windows and ‘._’ Apple double files


While going through and versioning old projects I had to import a fairly large project (6-7 subfolders, hundreds of files). Never mind that they weren’t under version control, they were on a windows machine, and I work via SMB mounts.


Not that I would expect many people to get hung up on this. Editing windows files on a mac apple will sometimes generate a ‘.\_text.txt’ for a modified ‘text.txt’ file ([apple double files](http://support.apple.com/kb/TA20578)).


This shows as an invisible file on the SMB mount. Since I did a straight import, all ‘.\_\*’ files were included in the repository. However ‘\_.’ is an illegal file name for a windows machine. So when I tried to `svn co` or `svn up` I got the following error on other windows machines.



```
svn: In directory 'sesame/Images'
svn: Can't open file 'sesame/images/.svn/tmp/text-base/._sesame_50.jpg.svn-base': No such file or directory

```

Notice the error mentions a file with a ‘.\_’ prefix. On a windows box I discovered ‘.\_’ is not part of a valid file name. After removing all of the ‘.\_’ files from the repository everything works great. Moral of the story: use `global-ignores` to skip over ‘.\_\*’ files.




---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['SVN']

Original Wordpress tags: "SVN", "data fork", "mac"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/28/svn-windows-and-apple-double-files/)

## EOF/Footnotes

