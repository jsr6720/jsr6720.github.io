---
layout: post
author: James Rowe
title: "Ruby Rakefile auto executes includes"
date: "2011-01-17 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder ruby rake
uid: a41da66c-b735-4380-ab0c-ec43ad759ef3
---

## Ruby Rakefile auto executes includes

When the custom [rake task](http://www.jsrowe.com/request-tracker-to-redmine-migration/index.html) to migrate data from one system to another was implemented our cron job stopped working.

It looked like it was trying to execute the contents of the custom rake file every time a call to `rake -f Rakefile` was made.

The problem ended up being Redmine’s Rakefile was set to include all defined task in a `{root}/lib/tasks` directory. Anything not in a namespace was executing regardless of the rake task called.

**Custom rake task**

```ruby
# code here executes all the time
puts 'I execute ever time rake -f Rakefile RAILS_ENV="{env}" is executed'

namespace :redmine do
  desc "Migrate from RT3 to Redmine"
  task :a_task  => :environment do
    # code here only executes when it's called
    puts 'I execute only when my namespace:task is invoked rake -f Rakefile redmine:a_task RAILS_ENV="{env}" is executed'
   end
end
```

**Redmine’s Rakefile**

```ruby
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/switchtower.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'
```

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/17/ruby-rakefile-auto-executes-includes/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

  Original Wordpress categories: ['Ruby']

  Original Wordpress tags: "Ruby", "namespace", "rake"