import MainLayout from "../components/Layouts/MainLayout";
import { ProtectRoute } from "../stores/AuthContext";
import "../styles/globals.scss";
import { AuthContextProvider } from "../stores/AuthContext";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { mutate } from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    Pusher.logToConsole = false;

    var pusher = new Pusher("31ab41bd72b4edd636e8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // FROM ARDUINO
      if (data.from == -1) {
        toast(data.message);
      }
      // FROM USERS
      else if (data.from > 0) {
        mutate("/message/messages");
        if (router.asPath != "/chat") {
          toast.info("New messages in global chat");
        }
      }
    });
    return () => {
      pusher.unsubscribe("chat");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContextProvider>
      <ProtectRoute router={router}>
        <MainLayout router={router}>
          <Component router={router} {...pageProps} />
          <ToastContainer />
        </MainLayout>
      </ProtectRoute>
    </AuthContextProvider>
  );
}

export default MyApp;
