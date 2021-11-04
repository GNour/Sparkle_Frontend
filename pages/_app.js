import MainLayout from "../components/Layouts/MainLayout";
import { ProtectRoute } from "../stores/AuthContext";
import "../styles/globals.scss";
import { AuthContextProvider } from "../stores/AuthContext";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { mutate } from "swr";
function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("31ab41bd72b4edd636e8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // Message from users for global messages
      if (data.from > 0) {
        mutate("/message/messages");
      }

      // Message from arduino RFID Card Reader
      if (data.from == -1) {
        console.log("Arduino");
      }
    });
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);
  return (
    <AuthContextProvider>
      <ProtectRoute router={router}>
        <MainLayout router={router}>
          <Component router={router} {...pageProps} />
        </MainLayout>
      </ProtectRoute>
    </AuthContextProvider>
  );
}

export default MyApp;
