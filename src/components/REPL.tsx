import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./repl_utils/REPLHistory";
import { REPLInput } from "./repl_utils/REPLInput";
import { REPLFunctions } from "./repl_utils/REPLFunctions";

/**
 * A high-level component for the REPL user interface. Stores high level data that
 * is shared between REPLHistory and REPLInput, and sets up the page orientation.
 *
 * @returns A set of HTML with the REPLHistory on top and a REPLInput at the bottom.
 */
export default function REPL() {
  // An array of tuples, where one value is a string and the other is a string or 2D string array.
  const [historyList, setHistoryList] = useState<
    [string, string | string[][]][]
  >([]);
  const [outputMode, setOutputMode] = useState<boolean>(true); // Tracks verbose / brief mode
  const commandMap = REPLFunctions(); // Allows for developer extensibility

  return (
    <div className="repl">
      <REPLHistory history={historyList} outputMode={outputMode} />
      <REPLInput
        history={historyList}
        setHistory={setHistoryList}
        setOutputMode={setOutputMode}
        commandMap={commandMap}
      />
    </div>
  );
}
