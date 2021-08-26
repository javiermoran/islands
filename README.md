# Tiny Islands World

This project is an angular application that lets the user create a small sea world represented by a grid in which the user can toggle the tiles between sea / land to create islands. The user is presented with information of how many land tiles and islands there are in this sea world. The user can also choose the size of the grid.
\
&nbsp;

## Installation

Run the installation command to install all needed dependencies:

`npm install`
\
&nbsp;

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.
\
&nbsp;

## Project structure

### Components

#### _Controls_:

This component handles the controls used to define the grid size.

#### _Grid_:

This component display the complete grid and works as a container for the tiles.

#### _Summary_:

This component shows the information about the sea world.

#### _Tile_:

This component represent a single tile in the grid and handles the land / sea toggle.

### Services

#### _IslandsService_:

This service is where all the logic happens, grid generation, information calculations and controls components interactions.

### Interfaces

This folder is where all the interfaces used in the app are stored.

\
&nbsp;

---

**NOTES:**

Some of the unit tests are still missing due lack of time but they will be added in the future.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.
