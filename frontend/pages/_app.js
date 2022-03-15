import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const tfScripta = document.createElement("script");
    tfScripta.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs";
    document.body.appendChild(tfScripta);
    const tfScriptb = document.createElement("script");
    tfScriptb.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity";
    document.body.appendChild(tfScriptb);
  });
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
