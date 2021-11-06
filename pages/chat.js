import { useRef, useState } from "react";
import ChatLayout from "../components/Layouts/ChatLayout";
import Pusher from "pusher-js";
import axiosConfig from "../helpers/axiosConfig";
import useSWR, { mutate } from "swr";
import ScrollableContainer from "../components/Common/ScrollableContainer";
import ChatMessage from "../components/ChatPage/ChatMessage";
import { Formik, Form } from "formik";
import TextInput from "../components/Common/Inputs/TextInput";
import ActionButtonWithIcon from "../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../stores/AuthContext";
const Chat = ({ users }) => {
  const lastMessage = useRef(null);
  const { user } = useAuth();
  const loggedInUserId = user.id;
  const [sentMessages, setSentMessages] = useState([]);

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
        setSentMessages([]);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  const { data, error } = useSWR("/message/messages", fetcher);

  const handleSendMessage = async (values, { setSubmitting, resetForm }) => {
    setSentMessages([...sentMessages, values]);
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
        {sentMessages.length > 0 &&
          sentMessages.map((message) => {
            return <ChatMessage key={"SENT"} type={"sent"} content={message} />;
          })}
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
