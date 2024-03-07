import "../../styles/main.css";

/**
 * An interface to store props for the REPLHistory component.
 *
 * @param history an array of tuples of [string, string or 2D string array].
 * @param outputMode a boolean tracking whether brief or verbose mode is active.
 */
interface REPLHistoryProps {
  history: [string, string | string[][]][];
  outputMode: boolean;
}

/**
 * A helper method used below to format the output for a given command. If the
 * input is a string, it is returned unchanged. If the input is a 2D string array,
 * the data is reformatted into an HTML table and returned.
 *
 * @param command either a string or 2D string array containing output data.
 * @returns the reformatted output, determined as described above.
 */
function formatOutput(command: string | string[][]) {
  return typeof command === "string" ? (
    command
  ) : (
    <table aria-label="output data">
      <tbody>
        {command.map((row) => (
          <tr aria-label="data row">
            {row.map((col) => (
              <td aria-label="data column">{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * A component for the REPLHistory display. Maps the history if inputs to their
 * appropriate outputs. In brief mode, only displays outputs. In verbose mode,
 * displays labeled inputs and their corresponding outputs. Uses the above helper
 * method to assist in HTML table formatting.
 *
 * @param props the interface defined above with the necessary history / display data.
 * @returns the command history mapped to the appropriate output.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="Command History">
      {props.history.map((command) =>
        props.outputMode ? (
          <p> {formatOutput(command[1])} </p>
        ) : (
          <p>
            <b>{"Command: "}</b> {command[0]} <br></br>
            <b>{"Output: "}</b>
            {formatOutput(command[1])}
          </p>
        )
      )}
    </div>
  );
}
