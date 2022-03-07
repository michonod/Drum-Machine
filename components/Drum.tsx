import React from "react";
import classes from "../styles/Drum.module.css";
import { useContext } from "react";
import AppContext from "../context/drumContext";
import { useHotkeys } from "react-hotkeys-hook";

const Drum = () => {
  const ctx = useContext(AppContext);
  const drumsObjectKeys = ctx.drumsObj.map((item) => item.key);

  useHotkeys(drumsObjectKeys.join(), (e) => {
    const pressedKey = e.key.toUpperCase();
    const pressedObjSound = ctx.drumsObj.find(
      (item) => item.key === pressedKey
    ).sound;
    ctx.handlePlayDrum(pressedObjSound);
  });

  const mappedDrums = ctx.drumsObj.map((drum) => (
    <div
      key={drum.id}
      className={classes.drum}
      onClick={
        !drum.sound
          ? ctx.showModalHandler
          : () => ctx.handlePlayDrum(drum.sound)
      }
      id={drum.id}
    >
      <p>{drum.key}</p>
      {!drum.sound && <p id={drum.id}>+</p>}
      <p
        className={classes.edit}
        id={drum.id}
        onClick={ctx.showModalHandler}
      >
        Edit
      </p>
    </div>
  ));

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Drum Machine</h1>
      <div className={classes.drumContainer}>{mappedDrums}</div>
    </div>
  );
};

export default Drum;
