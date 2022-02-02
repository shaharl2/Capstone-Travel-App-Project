# Capstone Travel Planner App

## Project Description

In this project I built a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs

The project includes a simple form where the user enters the city he is traveling to and the date he is leaving. If the trip is within the next 16 days, the app will return the weather forecast for the departure date, the next day, and two days after departure date. If the trip is in the future, the app returns a predicted forecast based on the average temperatures of the last 30 years at the departure date, and the two following days.

## Content and Dependencies

- Webpack
- Express
- Sass styles
- Webpack Loaders and Plugins
- Service workers

## Instructions

Build and start the webpack dev server at port 8080
_npm run build-dev_

In a diferrent terminal run the command:
_npm run build-prod_

and then run the Express server on port 3030:

_npm run start_

## Extras

- Jest testing unit is intalled. run the _npm run test command_ to test the handleSubmit functions and the express server.
