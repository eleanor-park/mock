# Project Details: Mock

### Contributors

    Gavin Dhanda (gdhanda): 10 Hrs

    Eleanor Park (enpark): 10 Hrs

### GitHub Repo
https://github.com/cs0320-s24/mock-enpark-gdhanda/tree/main

# Design Choices

In terms of React component nesting, our App component is the highest level. Within App, we create the LoginButton and the REPL, in which the REPLHistory and REPLInput are nested. Then, REPLInput makes use of the ControlledInput component to respond to user inputs. 

We chose to abstract the implementation of the load, search and view commands into a separate component, REPLFunctions, which builds a map from command name (a string) to a function interface (defined to take in command line arguments and produce a string or 2d string array). This allows for greater extensibility for other developers, who need not modify REPLInput directly to implement new commands.

That said, we chose to keep the handling of the "mode" command in REPLInput, since we did not want to make this functionality optional, as we want it always available to the user. 

Lastly, we set up the REPLHistory output format such that it can handle both strings and 2D string arrays as command outputs. By storing command and output history in an array of tuples of [string, string OR string[][]], we were able to simplify our data storage to one comprehensive data structure.

# Errors/Bugs

When attempted a search query for a string that contains spaces, the input parser may attempt to split the string into separate args, leading to errors when attempting such a search.

There may also be some visual aspects that do not behave as desired, specifically with how the visual components shift when the page is resized.

# Tests

This project contains an extensive end-to-end testing suite. The App.spec.ts file tests overall functionality, like loading the page, logging in, and seeing the correct buttons and titles. The Functions.spec.ts file tests each of our commands, including mode, load, view, and search. For each of these commands, we test edge cases such as missing/incorrect arguments and case sensitivity/extra white space.

For load, we tested loading and reloading files, ensuring that the correct success or failure message is given to the user. For search and view, we tested that the expected output, in the form of HTML tables, was produced and that the rows contained their expected values. We also check that a file is loaded before view/search. For search specifically, we included tests for different search types——by column index, column header, no index/header, invalid index/header, unfound values——and make sure they return their respective success/error messages.

We also created numerous tests that integrated multiple commands to ensure that they are able to work sequentially, such as loading, reloading, and searching or switching mode then viewing.

As far as unit testing, we chose not to implement any such tests. This was because many of the functions that would require unit testing are implemented in the backend, which we have not yet integrated. Other functions included useState hooks so they were unable to be run as part of a unit test.

# How To

### Run the Program:
In order to build and run the program, clone the repo and navigate into the mock directory. From there, ensure that you have run "npm install", and then launch the website using "npm start". To reach the webpage, you can then use command+click on the link provided to the terminal.

### Run Tests:
In order to run the end-to-end tests we have written, you can use "npm run tests".

# Collaboration

Much of the boilerplate code for this website comes from the cs32 Mock Gear-Up repository (which our file-structure is mirrored from). This also includes the structure of App.tsx and index.tsx, along with the nesting of REPLHistory and REPLInput contained within REPL. Our implementation adapts and enhances this code to suit our desired user stories.

We also collaborated conceptually with Asia Nguyen (atnguyen) and Julian Dhanda (jdhanda), but do not use any of their code directly.

Online resources were used for HTML styling syntax—and other minor syntactic features—but no significant implementation components were taken from the web.