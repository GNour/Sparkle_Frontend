import SideBar from "../Common/SideBar/SideBar";
import styles from "./MainLayout.module.scss";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { useAuth } from "../../stores/AuthContext";
import { mutate } from "swr";
import { toast } from "react-toastify";
const MainLayout = ({ children, router }) => {
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    Pusher.logToConsole = false;

    var pusher = new Pusher("31ab41bd72b4edd636e8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // FROM ARDUINO
      if (data.from == -1) {
        if (user && user.role == "Manager") {
          toast(data.message);
        }
      }
      // FROM USERS
      else if (data.from > 0) {
        mutate("/message/messages");
        if (router.asPath != "/chat") {
          if (user) {
            toast.info("New messages in global chat");
          }
        }
      }
    });
    return () => {
      pusher.unsubscribe("chat");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`theme-default vh-100 ${styles.MainLayout} overflow-hidden`}
    >
      {router.pathname.endsWith("create") ||
      router.pathname.endsWith("login") ? null : (
        <div className={`${styles.MainLayoutSideBar}`}>
          <SideBar router={router} />
        </div>
      )}

      <main className="container ps-lg-2 pe-lg-4 mt-2 w-100 py-5 py-md-0 vh-100 overflow-y-scroll pe-md-4 ps-md-2">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
