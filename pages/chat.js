import { Fragment, useEffect, useRef, useState } from "react";
import ChatLayout from "../components/Layouts/ChatLayout";
import Pusher from "pusher-js";
import axiosConfig from "../helpers/axiosConfig";
import useSWR, { mutate } from "swr";
import ScrollableContainer from "../components/Common/ScrollableContainer";
import ChatUserCard from "../components/ChatPage/ChatUserCard";
import ChatMessage from "../components/ChatPage/ChatMessage";
import { Formik, Form } from "formik";
import TextAreaInput from "../components/Common/Inputs/TextAreaInput";
import ActionButtonWithIcon from "../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlineSend, AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../stores/AuthContext";
const Chat = ({ users }) => {
  console.log(users);
  const lastMessage = useRef(null);

  const { user } = useAuth();
  const loggedInUserId = user.id;

  const [selectedUser, setSelectedUser] = useState(null);
  const [startNewChat, setStartNewChat] = useState(false);
  const scrollToBottom = () => {
    if (lastMessage) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  const { data, error } = useSWR("/message/messages", fetcher);
  console.log(data);
  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("31ab41bd72b4edd636e8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      mutate("/message/messages");
    });
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSendMessage = async (values, { setSubmitting, resetForm }) => {
    await axiosConfig.post("message/send", values);
    setSubmitting(false);
    resetForm();
  };

  const handleSendHello = async (id) => {
    await axiosConfig
      .post("message/send", {
        from: user.id,
        to: id,
        message: "hello",
      })
      .then((res) => {
        setStartNewChat(false);
      });
  };

  useEffect(() => {
    scrollToBottom();

    axiosConfig
      .put("message/read/" + selectedUser)
      .then((res) => {
        mutate("/message/messages");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedUser]);
  return (
    <ChatLayout>
      <ScrollableContainer
        externalStyles="col-12 col-md-4 mh-500 overflow-y-scroll chat-container color-white"
        header="Recent"
        button={
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            action={() => setStartNewChat(startNewChat ? false : true)}
            type={1}
            externalStyles="float-end"
          />
        }
      >
        {!startNewChat &&
          data &&
          Object.keys(data).map((key) => {
            let userNameToPreview = data[key][0].from.username;
            if (userNameToPreview == user.username) {
              userNameToPreview = data[key][0].to.username;
            }
            return (
              <ChatUserCard
                key={"recent" + data[key]}
                action={() => setSelectedUser(key)}
                newMessagesCount={getUnreadMessagesCount(data[key], user.id)}
                image={`http://localhost:8000/images/${data[key][0].from.profile_picture}`}
                username={userNameToPreview}
              />
            );
          })}
        {startNewChat &&
          users &&
          users.map((user) => {
            if (user.id == loggedInUserId) {
              return;
            }
            return (
              <ChatUserCard
                key={"newChat" + user.id}
                action={() => handleSendHello(user.id)}
                newMessagesCount={"Send Hello"}
                image={`http://localhost:8000/images/${user.profile_picture}`}
                username={user.username}
              />
            );
          })}
      </ScrollableContainer>

      <ScrollableContainer externalStyles="col-12 col-md-8 mh-500 minh-300 overflow-y-scroll chat-container-sub">
        {data && data.length != 0 && selectedUser ? (
          data[selectedUser] &&
          data[selectedUser].map((message) => {
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
            <span className="text-muted text-sm">
              Select a user to start chating
            </span>
          </div>
        )}
        {selectedUser && (
          <Formik
            initialValues={{
              from: user.id,
              to: selectedUser,
              message: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSendMessage(values, { setSubmitting, resetForm });
            }}
          >
            <Form>
              <div className="d-flex">
                <TextAreaInput
                  key="description"
                  placeholder={`Type you message`}
                  externalStyles="mb-3 flex-fill"
                  name="message"
                />
                <ActionButtonWithIcon
                  icon={<AiOutlineSend />}
                  isTertiary
                  buttonType="submit"
                  externalStyles="align-self-stretch rounded-circle border-0"
                />
              </div>
            </Form>
          </Formik>
        )}
        <div style={{ float: "left", clear: "both" }} ref={lastMessage}></div>
      </ScrollableContainer>
    </ChatLayout>
  );
};

const getUnreadMessagesCount = (messagesFromUser, currentUser) => {
  let count = 0;
  messagesFromUser.forEach((message) => {
    if (message.read == 0 && message.to == currentUser.id) {
      count++;
    }
  });
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
