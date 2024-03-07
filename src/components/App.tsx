import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./user_interaction/LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component of the webpage. Here, we track whether the user
 * is logged in, and set up the upper-level page logic accordingly.
 *
 * @returns HTML for the Header, with a login button and the REPL towards the bottom.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Update the size of the header according to login-status.
  let headerHeight = "98vh";
  if (isLoggedIn) {
    headerHeight = "26vh";
  }
  return (
    <div className="App">
      <p className="App-header" style={{ height: headerHeight }}>
        <h1 style={{ position: "absolute", top: "0px" }}>Welcome!</h1>
        {/* Update the Sub-Header according to Login Status. */}
        {isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Enter Your Command Below)
          </h3>
        )}
        {!isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Please Login to Continue)
          </h3>
        )}
        {/* Add the Login Button, and the REPL if logged in. */}
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn && <REPL />}
      </p>
    </div>
  );
}

export default App;
