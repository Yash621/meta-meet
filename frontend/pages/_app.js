import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    document.body.appendChild(script);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
