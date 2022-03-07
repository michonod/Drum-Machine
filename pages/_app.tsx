import type { AppProps } from "next/app";
import "../styles/globals.css";
import { DrumsContextProvider } from "../context/drumContext";
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <DrumsContextProvider>
      <Component {...pageProps} />
    </DrumsContextProvider>
  );
};

export default MyApp;
