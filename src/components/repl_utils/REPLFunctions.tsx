import { useState } from "react";
import { MockCSVFiles, MockCSVSearch } from "../../mockeddata/MockedJSON";

/**
 * An interface for a command in the REPL, allowing for developer extensibility beyond
 * the capabilities of our interface.
 *
 * @args an array of strings representing the user input.
 * @returns either a string or a 2D string array as an output response.
 */
export interface REPLFunction {
  (args: string[]): string | string[][];
}

/**
 * A function to build a map of commands for CSV functionality. Defines REPLFunctions for
 * load_file, search and view, and adds them to a Map from string (command name) to REPLFunction.
 *
 * @returns a map from command name to REPLFunction.
 */
export function REPLFunctions() {
  const commandMap = new Map(); // The commands used in our implementation.
  const mockedCSVFiles = MockCSVFiles(); // Mocked csv files from MockedJSON.tsx
  const mockedSearchResults = MockCSVSearch(); // Mocked search results from MockedJSON.tsx
  const [fileLoaded, setFileLoaded] = useState<boolean>(false); // Boolean for if file is loaded
  const [hasHeader, setHasHeader] = useState<boolean>(false); // Boolean for if file has header
  const [filePath, setFilePath] = useState<string>(""); // Filepath of currently loaded file

  /**
   * An implementation of REPLFunction to handle loading csv files.
   *
   * @param args the arguments inputted by the user. 2 args required for load_file.
   * @returns A string indicating whether the load was successful.
   */
  const loadCommand: REPLFunction = (args: string[]) => {
    // Check number of args.
    if (args.length != 2) {
      return "Invalid load_file arguments! Usage: load_file <filepath> <has-header>.";
    }

    // Check for valid has-header input (true or false).
    if (!(args[1] == "true" || args[1] == "false")) {
      return "Invalid input for <has-header>! Valid inputs: 'true', 'false'.";
    }

    // Check if the file exists in the mocked data.
    if (mockedCSVFiles.has(args[0])) {
      // Check whether csv data or an error message was given.
      if (typeof mockedCSVFiles.get(args[0]) === "string") {
        return mockedCSVFiles.get(args[0]);
      } else {
        // Update csv data as appropriate.
        setFileLoaded(true);
        setFilePath(args[0]);
        setHasHeader(args[1] == "true");
        return 'Successfully loaded file from "' + args[0] + '"!';
      }
    }
    return 'Could not load file from "' + args[0] + '"!';
  };

  /**
   * An implementation of REPLFunction to handle searching csv files.
   *
   * @param args the arguments inputted by the user. 1 or 2 args required for search.
   * @returns A 2D string array with the search results, or a string error message.
   */
  const searchCommand: REPLFunction = (args: string[]) => {
    // Check valid number or args.
    if (args.length < 1 || args.length > 2) {
      return "Invalid search arguments! Usage: search <column (optional)> <value>.";
    }
    // Check that a file has been loaded.
    else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }

    // Check if the value is present in the mocked data.
    if (mockedSearchResults.has(args.toString())) {
      return mockedSearchResults.get(args.toString());
    }
    return "Invalid search query: no response found for: " + args.toString();
  };

  /**
   * An implementation of REPLFunction to handle viewing csv files.
   *
   * @param args the arguments inputted by the user. No args required for view.
   * @returns A 2D string array with the csv data, or a string error message.
   */
  const viewCommand: REPLFunction = (args: string[]) => {
    // Check no extraneous args were given.
    if (args.length != 0) {
      return "Invalid view arguments! Usage: view.";
    } else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }
    return mockedCSVFiles.get(filePath);
  };

  // Add desired commands to the command map.
  commandMap.set("load_file", loadCommand);
  commandMap.set("search", searchCommand);
  commandMap.set("view", viewCommand);

  return commandMap;
}
