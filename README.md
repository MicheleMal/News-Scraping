# News scraping project

This project purpose to collect news divided into categories (news, politics, etc.) from the **Ansa Sicilia** website and insert them into a database.

The scraping system works in two modes:
## 1. Manual
Inserting news can be done manually via an HTTP call to the `scraping/insertDatabase` endpoint. The system takes the latest news from the site and stores it in the database, ensuring that no articles already present are duplicated.

## 2. Automatic
The system scrapes news automatically every six hours.

## Technologies used: 
* **Backend**: NestJS
* **Database**: MongoDB
