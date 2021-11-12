import ScrollableContainer from "../../components/Common/ScrollableContainer";
import ContentCard from "../../components/CoursesPage/ContentCard";
import CourseLayout from "../../components/Layouts/TasksLayout/CourseLayout";
import { RiVideoFill, RiArticleFill, RiCheckDoubleFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import { useRef, useState, Fragment } from "react";
import TitleDescription from "../../components/Common/TitleDescription";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { Form, Formik } from "formik";
import { useAuth } from "../../stores/AuthContext";
import useSWR, { mutate } from "swr";
import axiosConfig from "../../helpers/axiosConfig";
import CustomModal from "../../components/Common/CustomModal";
import SquareButton from "../../components/Common/Buttons/SquareButton";
import { AiFillPlusCircle } from "react-icons/ai";
import Loader from "react-loader-spinner";
import {
  createQuizModal,
  createArticleModal,
  createVideoModal,
  createQuestionModal,
} from "../../helpers/ModalHelper";
const CoursePage = ({ router }) => {
  const { user } = useAuth();

  const courseId = router.query.courseId;
  const previewedContentRef = useRef(null);
  const [previewedContent, setPreviewedContent] = useState(
    <div className="text-muted text-center my-5">
      Choose from content to get started
    </div>
  );

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          alert("Your not allowed to view this course");
          router.back();
        } else if (err.code == 404) {
          alert("Not found");
        }
      });

  const { data, error } = useSWR("/course/show/" + courseId, fetcher);

  const [isCompleteButtonDisabled, setIsCompleteButtonDisabled] =
    useState(true);

  // Complete course material
  // Used while rendering content to check if all metrials are finished

  const isMaterialCompleted = (userRole, userMaterialDetails) => {
    if (userRole == "Staff" && userMaterialDetails) {
      return userMaterialDetails.completed;
    }
    return 0;
  };

  const isAllMaterialCompleted = () => {
    let completed = 0;
    data.articles.forEach((temp) => {
      if (temp.user[0] && temp.user[0].details.completed) {
        completed++;
      }
    });
    data.videos.forEach((temp) => {
      if (temp.user[0] && temp.user[0].details.completed) {
        completed++;
      }
    });
    data.quizzes.forEach((temp) => {
      if (temp.user[0] && temp.user[0].details.completed) {
        completed++;
      }
    });
    return (
      data.articles.length + data.quizzes.length + data.videos.length !==
      completed
    );
  };

  const handleCompleteButton = async (type, id) => {
    let url = `course/${type.toLowerCase()}/complete/${id}`;
    await axiosConfig.put(url).then((res) => {
      mutate("/course/show/" + courseId);
    });
  };

  const handleCompleteCourse = async (values, { setSubmitting }) => {
    let grade = -1;
    if (data.quizzes.length) {
      grade = 0;
      data.quizzes.forEach((quiz) => {
        grade += quiz.user[0].details.grade;
      });
    }

    await axiosConfig
      .put("course/complete/" + values.id, { grade: grade })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    await axiosConfig
      .put("task/complete/" + router.query.tid)
      .then((res) => {
        mutate("/course/show/" + courseId);
      })
      .catch((err) => console.log(err));
  };

  const [previewedContentDetails, setPreviewedContentDetails] = useState({
    title: "Content preview",
    description: "",
  });

  // Manager functionalities
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(<div></div>);

  const handleCreateQuiz = async (values, { setSubmitting }) => {
    const data = { ...values, course_id: courseId };
    const res = await axiosConfig
      .post("course/quiz/create", data)
      .then((res) => {
        mutate("/course/show/" + courseId);
        setSubmitting(false);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log();
        console.log(err.message);
      });
  };

  const handleCreateQuestion = async (values, { setSubmitting }) => {
    await axiosConfig
      .put("course/quiz/question/create/" + data.quizzes[0].id, values)
      .then((res) => {
        mutate("/course/show/" + courseId);
        setSubmitting(false);
        setIsModalOpen(false);
      });
  };

  const handleCreateArticle = async (values, { setSubmitting }) => {
    await axiosConfig
      .post("course/article/create", {
        ...values,
        course_id: courseId,
      })
      .then((res) => {
        mutate("/course/show/" + courseId);
        setSubmitting(false);
        setIsModalOpen(false);
      });
  };
  const handleCreateVideo = async (values, { setSubmitting }) => {
    const data = { ...values, course_id: courseId };
    await axiosConfig
      .post("course/video/createviaurl", data)
      .then((res) => {
        mutate("/course/show/" + courseId);
        setSubmitting(false);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const openCreateArticleModal = () => {
    setModal(createArticleModal(handleClose, handleCreateArticle));
    setIsModalOpen(true);
  };

  const openCreateVideoModal = () => {
    setModal(createVideoModal(handleClose, handleCreateVideo));
    setIsModalOpen(true);
  };

  const openCreateQuizModal = () => {
    setModal(createQuizModal(handleClose, handleCreateQuiz));
    setIsModalOpen(true);
  };

  const openCreateQuestionModal = () => {
    setModal(
      createQuestionModal(data.quizzes[0], handleClose, handleCreateQuestion)
    );
    setIsModalOpen(true);
  };

  const handleRemoveContent = async (type, id) => {
    await axiosConfig
      .delete("course/" + type.toLowerCase() + "/delete/" + id)
      .then((res) => mutate("/course/show/" + courseId))
      .catch((err) => console.log(err));
  };

  const handleContentCardOnClick = async (content, details) => {
    setPreviewedContentDetails(details);
    setPreviewedContent(
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader
          type="Puff"
          color="#355ea0"
          height={100}
          width={100}
          timeout={1000}
        />
      </div>
    );
    if (details.type == "Article" || details.type == "Video") {
      let route =
        details.type == "Article"
          ? "article/read/" + details.id
          : "video/watch/" + details.id;
      await axiosConfig
        .put("course/" + route)
        .then((res) => {
          console.log(res);
          setPreviewedContent(
            <div>
              <div className="mb-2">{content}</div>
              <div>
                {details.type == "Quiz" ? null : (
                  <ActionButtonWithIcon
                    id={details.id}
                    externalStyles="w-100"
                    type={details.type}
                    icon={<RiCheckDoubleFill style={{ marginRight: "2px" }} />}
                    text={`Complete ${details.type}`}
                    action={handleCompleteButton}
                  />
                )}
              </div>
            </div>
          );
        })
        .catch((err) => console.log(err));
    } else {
      setPreviewedContent(
        <div>
          <div className="mb-2">{content}</div>
          <div>
            {details.type == "Quiz" ? null : (
              <ActionButtonWithIcon
                id={details.id}
                externalStyles="w-100"
                type={details.type}
                icon={<RiCheckDoubleFill style={{ marginRight: "2px" }} />}
                text={`Complete ${details.type}`}
                action={handleCompleteButton}
              />
            )}
          </div>
        </div>
      );
    }
  };
  if (error) {
    console.log(error);
  }
  if (!data)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader
          type="Puff"
          color="#355ea0"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );

  const renderAdminCreateActions = () => {
    return (
      <div className="row w-100 align-items-center m-0 justify-content-start order-3">
        <div className="col-12 m-0 me-md-2 p-0 col-md-4 mb-2 col-lg-2">
          <SquareButton
            text={"Article"}
            icon={<AiFillPlusCircle size={50} />}
            handleAction={openCreateArticleModal}
          />
        </div>
        <div className="col-12 p-0 m-0 me-md-2 col-md-4 mb-2 col-lg-2">
          <SquareButton
            text={"Video"}
            icon={<AiFillPlusCircle size={50} />}
            handleAction={openCreateVideoModal}
          />
        </div>
        {data && !data.quizzes.length ? (
          <div className="col-12 p-0 m-0 me-md-2 col-md-4 mb-2 col-lg-2">
            <SquareButton
              text={"Quiz"}
              icon={<AiFillPlusCircle size={50} />}
              handleAction={openCreateQuizModal}
            />
          </div>
        ) : (
          <div className="col-12 p-0 m-0 me-md-2 col-md-4 mb-2 col-lg-2">
            <SquareButton
              text={"Question"}
              icon={<AiFillPlusCircle size={50} />}
              handleAction={openCreateQuestionModal}
            />
          </div>
        )}
      </div>
    );
  };
  return (
    <Fragment>
      <CourseLayout
        title={data && data.course.name}
        grade={
          data.user && data.user.user_course && data.user.user_course.completed
            ? `${
                data.user.user_course.grade == -1
                  ? "Completed"
                  : `${data.user.user_course.grade}/100`
              }`
            : null
        }
      >
        <div className="col-xl-7  col-lg-7 order-2 order-md-1">
          <div className="custom-container rounded p-2">
            <TitleDescription
              title={previewedContentDetails.title}
              description={previewedContentDetails.description}
            />
            {previewedContent}
          </div>
        </div>
        <ScrollableContainer
          externalStyles="p-0 mh-350 overflow-y-scroll order-1 order-md-2 col-lg-5 rounded custom-container"
          header="Content"
          button={
            user.role == "Staff" ? (
              <Formik
                initialValues={{ id: router.query.courseId }}
                onSubmit={(values, { setSubmitting }) => {
                  handleCompleteCourse(values, { setSubmitting });
                }}
              >
                <Form className="float-end">
                  <ActionButtonWithIcon
                    text={"Complete"}
                    icon={<RiCheckDoubleFill size={24} />}
                    externalStyles="float-end"
                    isDisabled={isAllMaterialCompleted()}
                  />
                </Form>
              </Formik>
            ) : null
          }
        >
          {data &&
            data.articles.length > 0 &&
            data.articles.map((article) => {
              return (
                <ContentCard
                  key={`Article${article.id}`}
                  icon={<RiArticleFill size={24} />}
                  title={article.title}
                  isCompleted={isMaterialCompleted(
                    user.role,
                    article.user[0]?.details
                  )}
                  type="Article"
                  content={article}
                  forwardedRef={previewedContentRef}
                  handleRemoveContent={
                    user && user.role == "Manager" && handleRemoveContent
                  }
                  action={handleContentCardOnClick}
                />
              );
            })}
          {data &&
            data.videos.length > 0 &&
            data.videos.map((video) => {
              return (
                <ContentCard
                  key={`video${video.id}`}
                  icon={<RiVideoFill size={24} />}
                  title={video.title}
                  type="Video"
                  isCompleted={isMaterialCompleted(
                    user.role,
                    video.user[0]?.details
                  )}
                  content={video}
                  forwardedRef={previewedContentRef}
                  handleRemoveContent={
                    user && user.role == "Manager" && handleRemoveContent
                  }
                  action={handleContentCardOnClick}
                />
              );
            })}
          {data &&
            data.quizzes.length > 0 &&
            data.quizzes.map((quiz) => {
              return (
                <ContentCard
                  key={`quiz${quiz.id}`}
                  icon={<MdQuiz size={24} />}
                  title={quiz.title}
                  sub={quiz.questions.length + " Questions"}
                  isCompleted={isMaterialCompleted(
                    user.role,
                    quiz.user[0]?.details
                  )}
                  type="Quiz"
                  content={quiz}
                  handleRemoveContent={
                    user && user.role == "Manager" && handleRemoveContent
                  }
                  forwardedRef={previewedContentRef}
                  action={handleContentCardOnClick}
                />
              );
            })}
        </ScrollableContainer>
      </CourseLayout>
      {user && user.role == "Manager" ? renderAdminCreateActions() : null}
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        {modal}
      </CustomModal>
    </Fragment>
  );
};

export default CoursePage;
