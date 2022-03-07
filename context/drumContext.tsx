import { ScriptProps } from "next/script";
import { createContext, FormEvent, MouseEvent, ChangeEvent } from "react";
import { useState } from "react";

type DrumObj = {
  type: string;
  sound: string;
};

type KeyShort = {
  key: string;
  isUsed: boolean;
};
const keyboardShortcuts: KeyShort[] = [
  { key: "Choose a key", isUsed: false },
  { key: "q", isUsed: false },
  { key: "w", isUsed: false },
  { key: "e", isUsed: false },
  { key: "r", isUsed: false },
  { key: "t", isUsed: false },
  { key: "y", isUsed: false },
  { key: "u", isUsed: false },
  { key: "i", isUsed: false },
  { key: "o", isUsed: false },
  { key: "p", isUsed: false },
  { key: "a", isUsed: false },
  { key: "s", isUsed: false },
  { key: "d", isUsed: false },
  { key: "f", isUsed: false },
  { key: "g", isUsed: false },
  { key: "h", isUsed: false },
  { key: "j", isUsed: false },
  { key: "k", isUsed: false },
  { key: "l", isUsed: false },
];

const drumsName = ["Kick", "Cymbal", "Hihat", "Cowbell", "Snare", "Tom"];

const drumTypes: any = [];

const handlePlayDrum = (sound: string): void => {
  const audio = new Audio(sound);
  audio.play();
};

const AppContext = createContext({
  drums: drumTypes,
  showModal: false,
  edited: false,
  key: "",
  drum: "",
  id: "",
  drumsName: drumsName,
  showModalHandler: (event: MouseEvent<HTMLDivElement>): void => {},
  hideModalHandler: (event: MouseEvent<HTMLSpanElement>): void => {},
  drumsObj: [],
  keyboardShortcuts: keyboardShortcuts,
  handlePlayDrum: handlePlayDrum,
  submitFormHandler: (event: FormEvent<HTMLFormElement>): void => {},
  changeDrumHandler: (event: ChangeEvent<HTMLSelectElement>): void => {},
  changeKeyHandler: (event: ChangeEvent<HTMLSelectElement>): void => {},
});

export const DrumsContextProvider: React.FC<ScriptProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [drum, setDrum] = useState("Kick");
  const [key, setKey] = useState("");

  const drumTypes: DrumObj[] = [
    { type: "kick", sound: "/sounds/sounds_kick.mp3" },
    { type: "snare", sound: "/sounds/sounds_snare.mp3" },
    { type: "hihat", sound: "/sounds/sounds_hihat.mp3" },
    { type: "tom", sound: "/sounds/sounds_tom.mp3" },
    { type: "cymbal", sound: "/sounds/sounds_cymbal.mp3" },
    { type: "cowBell", sound: "/sounds/sounds_cowbell.mp3" },
  ];

  const [drumsObj, setDrumsObj] = useState([
    { id: "drum1id", sound: "", type: "", key: "" },
    { id: "drum2id", sound: "", type: "", key: "" },
    { id: "drum3id", sound: "", type: "", key: "" },
    { id: "drum4id", sound: "", type: "", key: "" },
    { id: "drum5id", sound: "", type: "", key: "" },
    { id: "drum6id", sound: "", type: "", key: "" },
    { id: "drum7id", sound: "", type: "", key: "" },
    { id: "drum8id", sound: "", type: "", key: "" },
    { id: "drum9id", sound: "", type: "", key: "" },
    { id: "drum10id", sound: "", type: "", key: "" },
    { id: "drum11id", sound: "", type: "", key: "" },
    { id: "drum12id", sound: "", type: "", key: "" },
  ]);

  const showModalHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowModal(true);
    setId(event.currentTarget.id);
  };
  const hideModalHandler = () => setShowModal(false);

  const changeDrumHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setDrum(event.currentTarget.value);
  };
  const changeKeyHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setKey(event.currentTarget.value);
  };
  const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clickedObject = drumsObj.find((item) => item.id === id);
    clickedObject.sound = `/sounds/sounds_${drum.toLowerCase()}.mp3`;
    clickedObject.type = drum;
    if (key === "") {
      return;
    }
    if (clickedObject.key === "") {
      clickedObject.key = key;
      keyboardShortcuts.find(
        (item) => item.key === clickedObject.key.toLowerCase()
      ).isUsed = true;
      setKey("");
    } else if (clickedObject.key !== "") {
      keyboardShortcuts.find(
        (item) => item.key === clickedObject.key.toLowerCase()
      ).isUsed = false;
      clickedObject.key = key;
      keyboardShortcuts.find(
        (item) => item.key === clickedObject.key.toLowerCase()
      ).isUsed = true;
      setKey("");
    }
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        showModal: showModal,
        showModalHandler: showModalHandler,
        hideModalHandler: hideModalHandler,
        drumsName: drumsName,
        drumsObj: drumsObj,
        keyboardShortcuts: keyboardShortcuts,
        submitFormHandler: submitFormHandler,
        changeDrumHandler: changeDrumHandler,
        changeKeyHandler: changeKeyHandler,
        handlePlayDrum: handlePlayDrum,
        key: key,
        drum: drum,
        id: id,
        drums: [],
        edited: false,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
