import { Fragment, useEffect, useRef, useState } from "react";
import ChatLayout from "../components/Layouts/ChatLayout";
import Pusher from "pusher-js";
import axiosConfig from "../helpers/axiosConfig";
import useSWR, { mutate } from "swr";
import ScrollableContainer from "../components/Common/ScrollableContainer";
import ChatUserCard from "../components/ChatPage/ChatUserCard";
import ChatMessage from "../components/ChatPage/ChatMessage";
import { Formik, Form } from "formik";
import TextInput from "../components/Common/Inputs/TextInput";
import ActionButtonWithIcon from "../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlineSend, AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../stores/AuthContext";
const Chat = ({ users }) => {
  const lastMessage = useRef(null);
  const { user } = useAuth();
  const loggedInUserId = user.id;

  const scrollToBottom = () => {
    if (lastMessage) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => {
        scrollToBottom();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  const { data, error } = useSWR("/message/messages", fetcher);
  useEffect(() => {
    Pusher.logToConsole = false;

    var pusher = new Pusher("31ab41bd72b4edd636e8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      mutate("/message/messages");
      scrollToBottom();
    });
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSendMessage = async (values, { setSubmitting, resetForm }) => {
    resetForm();
    await axiosConfig.post("message/send", values);
    setSubmitting(false);
    scrollToBottom();
  };

  return (
    <ChatLayout>
      <ScrollableContainer externalStyles="" header="Global Channel">
        {data && data.length != 0 ? (
          data.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                content={message}
                type={message.from.id == user.id ? "sent" : null}
              />
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <span className="text-muted text-sm">No Messages yet...</span>
          </div>
        )}
        {
          <Formik
            initialValues={{
              from: loggedInUserId,
              message: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSendMessage(values, { setSubmitting, resetForm });
            }}
          >
            <Form>
              <div className="d-flex">
                <TextInput
                  key="description"
                  placeholder={`Start Chatting`}
                  externalStyles="mb-3 flex-fill"
                  name="message"
                />
                <ActionButtonWithIcon
                  icon={<AiOutlineSend />}
                  isTertiary
                  buttonType="submit"
                  externalStyles="align-self-stretch border-0"
                />
              </div>
            </Form>
          </Formik>
        }
        <div style={{ display: "none" }} ref={lastMessage}></div>
      </ScrollableContainer>
    </ChatLayout>
  );
};

const getUnreadMessagesCount = (messagesFromUser, currentUser) => {
  let count = 0;
  // messagesFromUser.forEach((message) => {
  //   if (message.read == 0 && message.to.id == currentUser) {
  //     count++;
  //   }
  // });
  return count;
};

export const getServerSideProps = async () => {
  try {
    const res = await axiosConfig.post("server/users", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        users: res.data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};
export default Chat;
