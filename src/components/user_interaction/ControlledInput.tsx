import "../../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * An interface to store props for the ControlledInput component.
 * 
 * @param value the string contained in the input box.
 * @param setValue a setter for the value string.
 * @param ariaLabel the aria label to use for the input box. 
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * A component that wraps the Input Box, to ensure that React is properly 
 * managing its state.
 * 
 * @param props an interface defined above with relevant Input variables.
 * @returns An input box with the appropriate values for our REPL interface.
 */
export function ControlledInput(props: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={props.value}
      placeholder="Enter command here!"
      onChange={(ev) => props.setValue(ev.target.value)}
      aria-label={props.ariaLabel}
    ></input>
  );
}
