import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script_a = document.createElement("script");
    const script_b = document.createElement("script");
    const script_c = document.createElement("script");
    script_a.src = "https://code.jquery.com/jquery-3.5.1.min.js";
    script_b.src = "https://meet.jit.si/libs/lib-jitsi-meet.min.js";
    script_c.src = "https://meet.jit.si/external_api.js";
    document.body.appendChild(script_a);
    document.body.appendChild(script_b);
    document.body.appendChild(script_c);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
