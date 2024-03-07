import "../../styles/repl.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../user_interaction/ControlledInput";
import { REPLFunction } from "./REPLFunctions";

/**
 * An interface to store props for the REPLInput component.
 *
 * @param history an array of tuples of [string, string or 2D string array].
 * @param setHistory a setter for the history array to update when input is given.
 * @param setOutputMode a setter for whether brief or verbose mode is active.
 * @param commandMap a map from string (command name) to the corresponding function.
 */
interface REPLInputProps {
  history: [string, string | string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string | string[][]][]>>;
  setOutputMode: Dispatch<SetStateAction<boolean>>;
  commandMap: Map<string, REPLFunction>;
}

/**
 * A component for the REPLInput display. Sets up the controlled input component
 * and a submit button, which calls the handleSubmit helper method. This uses the
 * command map to call functions as needed, and updates relevant state variables
 * to allow history to properly show new outputs.
 *
 * @param props the interface defined above with the necessary I/O data.
 * @returns the updated REPL input interface.
 */
export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box.
  const [commandString, setCommandString] = useState<string>("");

  /**
   * A helper method to deal with submissions. Parses the command line, checks
   * for valid inputs, handles mode switches, and calls appropriate functions if
   * they are available in the commandMap from props.
   *
   * @param commandString the input provided in the text box upon submission.
   */
  function handleSubmit(commandString: string) {
    // Parse the command line arguments.
    const commandArray = commandString.trim().split(/\s+/);
    const command = commandArray[0].toLowerCase();
    let args = commandArray.slice(1, commandArray.length);

    // Prevent case sensitivity issues.
    console.log(args);
    for (var i = 0; i < args.length; i++) {
      args[i] = args[i].toLowerCase().trim();
    }

    // Check if no command was specified.
    if (commandArray[0] == "") {
      props.setHistory([
        ...props.history,
        [commandString, "Please specify a command!"],
      ]);
    }
    // Check if the mode was changed.
    else if (command == "mode") {
      if (
        commandArray.length != 2 ||
        !(args[0] == "verbose" || args[0] == "brief")
      ) {
        props.setHistory([
          ...props.history,
          [commandString, "Usage: mode <verbose> OR mode <brief>."],
        ]);
      } else {
        const output = "Mode updated: " + args[0] + "!";
        props.setHistory([...props.history, [commandString, output]]);
        props.setOutputMode(args[0] == "brief");
      }
    }
    // Otherwise, use the given function.
    else {
      handleCommands(command, args);
    }

    // Reset the text in the input box.
    setCommandString("");
  }

  /**
   * Helper function to call the correct commands based on user input.
   *
   * @param command The command entered by the user.
   * @param args The arguments of the command.
   */
  function handleCommands(command: string, args: string[]) {
    const result = props.commandMap.get(command);
    if (result != null) {
      const output = result(args);
      props.setHistory([...props.history, [commandString, output]]);
    } else {
      props.setHistory([...props.history, [commandString, "Invalid Command!"]]);
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend className="input-legend">Enter a Command:</legend>
        {/* Add the controlledInput component with desired style elements. */}
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Add the submit button with desired handleSubmit functionality. */}
      <button
        className="submit-button"
        onClick={() => handleSubmit(commandString)}
        aria-label={"Submit"}
      >
        <b>{"Submit!"}</b>
      </button>
    </div>
  );
}
