import { Dispatch, SetStateAction } from "react";
import "../../styles/main.css";

/**
 * An interface to store props for the LoginButton component.
 * 
 * @param isLoggedIn a boolean for whether a user is logged in.
 * @param setIsLoggedIn a setter for the isLoggedIn boolean.
 */
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * A component to set up and manage the state of the Login Button.
 *
 * @param props an interface defined above to track/modify login status.
 * @returns an HTML button with the desired properties.
 */
export function LoginButton(props: loginProps) {
  /**
   * Switches the login status to the opposite of its current value.
   *
   * @returns the new login status.
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };

  // Return an appropriately labeled button.
  return props.isLoggedIn ? (
    <button
      className="login-button"
      aria-label="Sign Out"
      onClick={authenticate}
    >
      Sign Out
    </button>
  ) : (
    <button className="login-button" aria-label="Login" onClick={authenticate}>
      Login
    </button>
  );
}
