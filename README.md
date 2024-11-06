# SCSU CNT Time Manager
## Rick Mingione

## Description 
 This is application serves graduate and undergraduate students as a repository for tracking daily progress within the Center for Nanotechnology.

 This is block formatted webpage that manages an student database, where students can log their work hours and productivity, as well as access their last 10 entries of time logged to keep track of previous activities.

 This interface allows students to adjust their logs, upload relavant documents, and add notes for their various activities and experiements. Additionally, this tool can provide department heads and faculty to track the progress of active projects and tasks completed in real time.

## Features: 
  
  * uses Node and Express server
​
  * Handlebars.js as the template engine, designed for Southern Connecticut State University using Bootstrap
​
  * data is housed in MySQL database with a Sequelize ORM
​
  * uses GET, POST, and PUT routes for retrieving and adding new data to database
​
  * deployment to Heroku
​
  * uses Mocha & Chai for testing
​
  * MVC standard file structure



## Installation:
  You can 'git clone' this application onto your local machine, be sure to change the database password to your own in the config.json file. Otherwise, the deployed app can be accessed on heroku through this link:

## License:
  ISC
  

## Contributing:
Not currently open source, but visit the contact section to get a hold of the developers for suggestions and editing. 

 ## Tests:
  Mocha - Javascript testing framework
  Chai - BDD / TDD assertion library for NodeJS
  'npm run test'

## How To Use
 Run as a user on the deployed app

## Set Up Cloned Repo for testing
 * Revise the config.json file development "password" for your local machine.
 * Run node server.js on cloned repository
 * Use the seeds.sql file to upload some initial data using MySql Workbench (Note that this is necessary for certain routes to function properly)
 * Use npm start in terminal to launch the application
 * Navigate to https:/localhost:8080 in browser
 
## Dependencies
 * chai@5.1.1
 * chartjs@0.3.24
 * datepicker-moment@2.0.2
 * dotenv@16.4.5
 * express-handlebars@8.0.1
 * express@4.21.1
 * fs@0.0.1-security
 * glob@11.0.0
 * handlebars-helpers@0.10.0
 * jquery@3.7.1
 * jsdom@25.0.1
 * mocha@10.7.3
 * moment@2.30.1
 * mysql2@3.11.3
 * path@0.12.7
 * sequelize@6.37.4

## Questions: 
If you have any questions, you can contact the creators of this repo here: 
[lootz.dev@gmail.com](lootz.dev@gmail.com)

GitHub: https://github.com/rivenception

<!-- ## Screenshots 

<img width="1177" alt="Screen Shot 2020-11-21 at 9 53 02 PM" src="https://user-images.githubusercontent.com/68867054/99892581-27ad5000-2c44-11eb-8e60-3af39a719361.png">


<img width="1179" alt="Screen Shot 2020-11-21 at 9 53 27 PM" src="https://user-images.githubusercontent.com/68867054/99892594-50cde080-2c44-11eb-8fe9-9992573e1340.png">


<img width="1044" alt="Screen Shot 2020-11-21 at 9 59 08 PM" src="https://user-images.githubusercontent.com/68867054/99892637-d782bd80-2c44-11eb-8a02-5cbeb8e7e0ec.png"> -->

<!-- ## Submission on BCS 

Heroku Deployed Link: https://intense-badlands-45869.herokuapp.com/  -->
