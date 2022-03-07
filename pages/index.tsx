import styles from "../styles/Home.module.css";
import { useContext } from "react";
import Drum from "../components/Drum";
import AppContext from "../context/drumContext";
import Overlay from "../components/Overlay";
const Home: React.FC = () => {
  const ctx = useContext(AppContext);
  return (
    <div className={styles.container}>
      <Drum />
      {ctx.showModal && <Overlay />}
    </div>
  );
};

export default Home;
