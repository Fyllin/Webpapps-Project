# **TITLE**

## The basics
---
This is a node.js server app that uses express framework for the whole functionality. Express is basic, gets the job done, and I know how to use it. 

On the website that this app opens, one can create an account, login, create posts and comment on them. It does not have any advanced features, such as removing the post and such, at the moment, but it does the basics. If one wants to manage posts or accounts, it has to be done through the database using other applications (for example MongoDBCompass).

This could have more features, but time is a thing and I didn't have it. That is the main reason why some things are the way they are.

## Installation
---

### install node
- Here's a tutorial https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm
- Newer versions can work, but using version 12 is reliable

### install MongoDB
- https://docs.mongodb.com/manual/installation/

### download the latest release on github
- Should be on the right or somewhere there
- Extract the files where you want them to be

### Setup
- Make a .env file that contains atleast the encrypting secret (SECRET=yoursecrethere)
- you can also change the MONGO_URL and PORT if you need to

### run the startserver.bat file
- This starts the server




## Modules (What? and why?)
---

### bcryptjs
- Used for salting and hashing the passwords and compairing them when logging in

### dotenv
- Used for variables that user can generate themselves (Port, Mongo adress, Jwt token secret)

### express
- The framework for this whole thingamajig. Chosen because it is the only one i know how to use


### express-validator
- Validator for password when registering

### highlight.js
- Used for highlighting the codes on the site

### jsonwebtoken
- Authentication that is used to verify that the user is logged in and who the user is

### materialize-css
- Css framework that makes the pages look not awful

### mongodb
- Basic database that i know how to use

### mongoose
- Data modeling tool that helps make the objects for mongodb

### nodemon
- Monitoring script used for development

### pug
- Template engine that helps us create the html for the pages

### Minor packages that do minor things in the app
- morgan
- multer
- http-errors
- debug
- cookie-parser


## Accessibility testing
---
Screen reader: https://youtu.be/VZM9CNccgS8

Keyboard usage: https://youtu.be/IQjco5UCiRU


## Point count
---
### Basic features with well written documentation: 24 points
- It has the basic features
- The documentation is nice and all
- It's not perfect at all but i guess it gets the job done
- I really want to get through this

### Use some highlight library for the code snippets: 2 points
- It has basic code highlighting through highlight.js
- It detects the language automatically
- This is not perfect either but it works atleast

### Test software for accessibility: 2 points
- Tested screen reader functionality and keyboard usage
- Don't know about voice commands, seemed too hard
- Both of the tested features are working on some level

### Being late: -3 points
- One point for sunday, monday, and tuesday each

### Total: 25 points
-  Should be enough :D


