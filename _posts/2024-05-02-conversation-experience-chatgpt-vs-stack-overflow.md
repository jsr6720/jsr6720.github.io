---
layout: post
author: James Rowe
title: "Conversation experience ChatGPT vs stack overflow"
date: "2024-05-02 21:59:32 -04:00"
category: engineering
tags: stack-overflow communication
uid: E4927E40-0AF6-42A4-A367-ED9F58A73C79
excerpt: "A comparison of the conversation experience between stack overflow and ChatGPT. Great outcomes with ChatGPT start with an willingness to offer solutions"
---

## Idea iteration with ChatGPT

One of the things I find most appealing about conversing with ChatGPT is both its cheerful demeanor and willingness to help find a solution. It's available 24/7, passes no judgement and is ad-free(for now). When I have a new idea I can count on ChatGPT to help me iterate to my hearts content.

Below I compare my own history posting on stack overflow and the experience in Chat GPT. Ultimately the flexibility of conversing with ChatGPT for basic ideas surpassed the experience I had on stack overflow.

**Recommendation:** Use ChatGPT for some initial high level banter and basic ideation.

### ChatGPT conversation style

Why is it that ChatGPT seems so cheerful? When I asked ChatGPT[^1] what its conversation style is set to I got the following response:

> **User**
> What is your conversation style set to?

> **ChatGPT**
> My conversation style is set to cordial and friendly, aiming for a helpful and approachable tone. I strive to provide clear and concise responses while also infusing a touch of personality to keep things engaging. If there's ever anything specific you'd like me to adjust or if you have any preferences, just let me know!

> **User**
> Could you be rude and terse and condescending?

> **ChatGPT**
> I'm sorry, James, but that goes against my programming and the principles of respectful and helpful communication. 


## Comparing the user experience in stack overflow vs ChatGPT

[Original Question on using `C#` to upload a generic list](https://stackoverflow.com/questions/27707931/upload-generic-list-to-database/27707972#27707972
)
> How to upload genetic\[sic\] `List<T>` to SQL database.

### stack overflow experience

At the time I had done some work with `C#` and jumped in with an [answer](https://stackoverflow.com/a/27707972) providing a code snippet using `DataTable`. 

![accepted solution](/assets/posts-images/so-response-data-table.png)

Almost immediately the comments critiqued the poster and my solution saying there isn't enough context or information to provide an informed answer. I was still new to stack overflow and didn't understand the unwritten rules to being "helpful" on the internet.[^2] 

But I've been there. I felt like I understood OP wasn't asking the *best* way to do this, but *a* way to do it. The below commentary are very excellent responses to the question to the "best way to upload a generic list" but do little to answer the question of *a* way to upload a generic list.

![response to op](/assets/posts-images/so-response-to-op.png)

![response to solution](/assets/posts-images/so-response-to-solution.png)


### ChatGPT (3.5) initial conversation

I decided to compare the above experience to ChatGPT. One huge advantage, all of these responses can be inspected and built on. For example you could stop and ask "What are serializable objects?" or "How do you connect to a SQL Database?" and ChatGPT is happy to provide an answer without making you start a new chat.

> **User**
> How to upload genetic List<T> to SQL database

> **ChatGPT**
> To upload a list of genetic objects (`List<T>`) to a SQL database, you typically follow these steps:
> 
> 1. **Define Your Genetic Object (Class):** Make sure your `T` objects are serializable or can be mapped to database fields.
> 
> 2. **Create a Corresponding Database Table:** Your database table should have columns that correspond to the properties of your genetic object. 
> 
> 3. **Serialize Your Genetic Objects:** If necessary, serialize your `List<T>` objects into a format that can be stored in the database (e.g., JSON, XML).
> 
> 4. **Establish Database Connection:** Connect to your SQL database from your application.
> 
> 5. **Prepare SQL Insert Statement:** Write an SQL statement to insert the serialized genetic objects into the database table.
> 
> 6. **Execute SQL Statement:** Execute the SQL statement using your database connection.
> 
> Here's a simplified example in C#:

<script src="https://gist.github.com/jsr6720/76b738af36c62792d1ab7cd6d3bdf91e.js"></script>

#### Expanding that same ChatGPT conversation to utilize `SQLBulkCopy`

> **User**
> what about sql bulk copy

> **ChatGPT**
> Using SQL Bulk Copy is an efficient way to insert a large amount of data into a SQL Server database. Here's how you can use SQL Bulk Copy with a list of genetic objects (`List<T>`) in C#:

<script src="https://gist.github.com/jsr6720/23739f7541934194e306e15f8cace01b.js"></script>

## Postscript

I had to ask

> **User**
> did you steal that example from stackoverflow?

> **ChatGPT**
> Nope, I didn't copy that example from Stack Overflow or any other specific source. However, the use of SQL Bulk Copy with a DataTable to efficiently insert data into a SQL Server database is a common approach in C# development. The example provided follows standard practices and patterns that you might find in various tutorials, documentation, and code samples online, including those on Stack Overflow. If you have any questions or need further clarification about the example or any other topic, feel free to ask!


---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

### Footnotes

[^1]: ChatGPT 3.5 May 2nd, 2024

[^2]: This response also was my last answer on Stack Overflow. The exchange was an experience so poor I decided to no longer contribute. Now I just post here with comments off... Remember there are no [stupid ideas](/assets/posts-images/sharknado.jpg)