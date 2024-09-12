# News scraping project

This project purpose to collect news divided into categories (news, politics, etc.) from the **Ansa Sicilia** website and insert them into a database.

The scraping system works in two modes:
## 1. Manual
Inserting news can be done manually via an HTTP call to the `scraping/insertDatabase` endpoint. The system takes the latest news from the site and stores it in the database, ensuring that no articles already present are duplicated.

## 2. Automatic
The system scrapes news automatically every six hours.

## Viewing the News
To get and display all the news stored in the database, make an HTTP request to the endpoint `scraping/all-news`.

## Viewing the news by filter
Two types of filters are available to view news:
1. **By category type**: You can filter news based on the category they belong to (for example, news, politics, etc.). To search by category, use the following URL format: `scraping/news?t=type_category`

2. **By range date**: ou can also filter news based on a date range, specifying a start date and an end date. To search by date range, use this format: `scraping/news?dateI=YYYY-MM-DD&dateF=YYYY-MM-DD`

## Technologies used: 
* **Backend**: NestJS
* **Database**: MongoDB
