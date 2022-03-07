import React from "react";
import classes from "../styles/Overlay.module.css";
import AppContext from "../context/drumContext";
import { useContext } from "react";
const Overlay = () => {
  const ctx = useContext(AppContext);
  const filteredKeys = ctx.keyboardShortcuts.filter(
    (key) => key.isUsed !== true
  );

  return (
    <div className={classes.formContainer}>
      <form onSubmit={ctx.submitFormHandler}>
        <span className={classes.close} onClick={ctx.hideModalHandler}>
          X
        </span>
        <label htmlFor="drum">Drum Sample</label>
        <select onChange={ctx.changeDrumHandler}>
          {ctx.drumsName.map((drum) => (
            <option key={drum} value={drum}>
              {drum}
            </option>
          ))}
        </select>
        <label htmlFor="keyboard">Keyboard Shortcut</label>
        <select onChange={ctx.changeKeyHandler}>
          {filteredKeys.map((key) => (
            <option key={key.key} >{key.key.toUpperCase()}</option>
          ))}
        </select>
        <button>Save</button>
      </form>
    </div>
  );
};

export default Overlay;
