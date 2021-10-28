import { Fragment, useState, useEffect } from "react";
import PageHeader from "../../components/Common/PageHeader";
import BackButton from "../../components/Common/BackButton";
import TextInput from "../../components/Common/Inputs/TextInput";
import { FieldArray, Form, Formik } from "formik";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import TextAreaInput from "../../components/Common/Inputs/TextAreaInput";
import ScrollableContainer from "../../components/Common/ScrollableContainer";
import { AiOutlinePlus } from "react-icons/ai";
import CustomModal from "../../components/Common/CustomModal";
import SelectInput from "../../components/Common/Inputs/SelectInput";
import { useRouter } from "next/router";
import CoursesContentPreview from "../../components/Common/CoursesContentPreview";
import { RiVideoFill, RiArticleFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import axiosConfig from "../../helpers/axiosConfig";
import useSWR, { useSWRConfig } from "swr";
const CreateCourse = () => {
  const router = useRouter();
  const [isContentShown, setIsContentShown] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(null);
  const [isCreateQuestionEnabled, setIsCreateQuestionEnabled] = useState(false);

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        err;
      });

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR("course/show/" + courseId, fetcher);

  console.log(data);

  const handleIsQuestionModalOpen = () => {
    setIsQuestionModalOpen(true);
  };

  const handleQuestionModalClose = () => {
    setIsQuestionModalOpen(false);
  };

  const handleCreateCourse = async (values, { setSubmitting }) => {
    const res = await axiosConfig.post("course/create", values);
    console.log(res.data);
    setCourseId(res.data.Course.id);
    setIsContentShown(true);
    setSubmitting(false);
  };

  // States for modal, Confirmation modal and Add note modal
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modal, setModal] = useState(<div></div>);

  const handleModalOpen = (value, id) => {
    // Models => Article: 0, Video: 1, Quiz: 2
    console.log(id);
    if (id == 0) {
      setModal(
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Article</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  body: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleCreateArticle(values, { setSubmitting });
                }}
              >
                <Form key="articleForm">
                  <TextInput
                    key="title"
                    placeholder="Article Title"
                    label="Article Title"
                    externalStyles="mb-3"
                    name="title"
                    type="text"
                  />

                  <TextAreaInput
                    key="description"
                    placeholder="Article Description"
                    label="Article Description"
                    externalStyles="mb-3"
                    name="description"
                    type="text"
                  />

                  <TextAreaInput
                    key="body"
                    placeholder="Article body"
                    label="Article body"
                    externalStyles="mb-3"
                    name="body"
                    type="text"
                  />
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon
                      text="Create"
                      type="submit"
                      buttonType="submit"
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    } else if (id == 1) {
      setModal(
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Video</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  video: "",
                  title: "",
                  description: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleCreateVideo(values, { setSubmitting });
                }}
              >
                <Form>
                  <TextInput
                    key="title"
                    placeholder="Video Title"
                    label="Video Title"
                    externalStyles="mb-3"
                    name="title"
                    type="text"
                  />

                  <TextAreaInput
                    key="description"
                    placeholder="Video Description"
                    label="Video Description"
                    externalStyles="mb-3"
                    name="description"
                    type="text"
                  />

                  <TextInput
                    key="url"
                    placeholder="Video url"
                    label="Video url"
                    externalStyles="mb-3"
                    name="video"
                    type="text"
                  />
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon
                      text="Create"
                      type="submit"
                      buttonType="submit"
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    } else if (id == 2) {
      setModal(
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Quiz</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  title: "",
                  limit: "",
                  description: "",
                  weight: 100,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleCreateQuiz(values, { setSubmitting });
                }}
              >
                {(form) => {
                  return (
                    <Form key="quizForm">
                      <TextInput
                        key="title"
                        placeholder="Quiz Title"
                        label="Quiz Title"
                        externalStyles="mb-3"
                        name="title"
                        type="text"
                      />
                      <TextAreaInput
                        key="description"
                        placeholder="Quiz Description"
                        label="Quiz Description"
                        externalStyles="mb-3"
                        name="description"
                        type="text"
                      />
                      <TextInput
                        key="limit"
                        placeholder="01:30:00 (Hours:Minutes:Seconds)"
                        label="Quiz Limit"
                        externalStyles="mb-3"
                        name="limit"
                        type="text"
                      />
                      <div className="modal-footer">
                        <ActionButtonWithIcon
                          text="Close"
                          isSecondary
                          action={handleClose}
                        />
                        <ActionButtonWithIcon
                          text="Create"
                          type="submit"
                          buttonType="submit"
                          action={"submit"}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      );
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setModalType(-1);
  };

  const handleCreateQuiz = async (values, { setSubmitting }) => {
    const data = { ...values, course_id: courseId };
    const res = await axiosConfig
      .post("course/quiz/create", data)
      .catch((err) => {
        console.log();
        console.log(err.message);
      });
    setSubmitting(false);
    setIsModalOpen(false);
    mutate("course/show/" + courseId);
    setIsCreateQuestionEnabled(true);
  };

  const handleCreateQuestion = async (values, { setSubmitting }) => {
    const res = await axiosConfig.put(
      "course/quiz/question/create/" + data.quizzes[0].id,
      values
    );
    setSubmitting(false);
    setIsQuestionModalOpen(false);
    mutate("course/show/" + courseId);
  };

  const handleCreateArticle = async (values, { setSubmitting }) => {
    const res = await axiosConfig.post("course/article/create", {
      ...values,
      course_id: courseId,
    });

    console.log(res);
    setSubmitting(false);
    setIsModalOpen(false);
    mutate("course/show/" + courseId);
  };
  const handleCreateVideo = async (values, { setSubmitting }) => {
    const data = { ...values, course_id: courseId };
    const res = await axiosConfig
      .post("course/video/createviaurl", data)
      .catch((err) => {
        console.log();
        console.log(err.message);
      });
    setSubmitting(false);
    setIsModalOpen(false);
    mutate("course/show/" + courseId);
  };

  const handleRemoveQuiz = () => {};

  const handleRemoveArticle = () => {};

  const handleRemoveVideo = () => {};

  return (
    <Fragment>
      <BackButton text={"Tasks"} />
      <PageHeader header={"Create Course"} />
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateCourse(values, { setSubmitting });
        }}
      >
        {(formik) => {
          return (
            <Form key="courseForm" form="courseForm">
              <div className="row">
                <h5>Course Basic info</h5>
                <div className="col-12 col-md-4 me-0">
                  <TextInput
                    key="name"
                    placeholder={`Course Title`}
                    label={`Course Title`}
                    externalStyles="mb-3"
                    name="name"
                    disabled={isContentShown ? true : false}
                    type="text"
                  />
                  <TextAreaInput
                    key="description"
                    placeholder={`Course Description`}
                    label={`Course Description`}
                    externalStyles="mb-3"
                    disabled={isContentShown ? true : false}
                    name="description"
                  />
                  <div className="text-center">
                    <ActionButtonWithIcon
                      text="Confirm"
                      externalStyles={"w-50 mb-5"}
                      type="submit"
                      buttonType="submit"
                      form="courseForm"
                      isDisabled={isContentShown ? true : false}
                    />
                  </div>
                </div>
                {isContentShown ? (
                  <div className="col-12 col-md-8">
                    <div className="row">
                      <div className="col-12 col-sm-4 mb-2">
                        <ScrollableContainer
                          externalStyles="mh-450 overflow-y-scroll order-1 order-md-2 rounded custom-container"
                          header="Articles"
                        >
                          {data && data.articles.length != 0 ? (
                            data.articles.map((article) => {
                              return (
                                <CoursesContentPreview
                                  key={article.id}
                                  title={article.title}
                                  icon={<RiArticleFill />}
                                  action={() => handleRemoveArticle(article.id)}
                                />
                              );
                            })
                          ) : (
                            <div className="d-flex justify-content-center text-muted">
                              No articles added
                            </div>
                          )}
                          <ActionButtonWithIcon
                            icon={<AiOutlinePlus />}
                            isSecondary
                            buttonType={"button"}
                            id={0}
                            action={handleModalOpen}
                            externalStyles={"w-100 my-1"}
                          />
                        </ScrollableContainer>
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <ScrollableContainer
                          externalStyles="mh-450 overflow-y-scroll order-1 order-md-2 rounded custom-container"
                          header="Videos"
                        >
                          {data && data.videos.length != 0 ? (
                            data.videos.map((video) => {
                              return (
                                <CoursesContentPreview
                                  key={video.id}
                                  title={video.title}
                                  icon={<RiVideoFill />}
                                  action={() => handleRemoveVideo(video.id)}
                                />
                              );
                            })
                          ) : (
                            <div className="d-flex justify-content-center text-muted">
                              No videos added
                            </div>
                          )}
                          <ActionButtonWithIcon
                            icon={<AiOutlinePlus />}
                            isSecondary
                            buttonType={"button"}
                            id={1}
                            action={handleModalOpen}
                            externalStyles={"w-100 my-1"}
                          />
                        </ScrollableContainer>
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <ScrollableContainer
                          externalStyles="mh-450 overflow-y-scroll order-1 order-md-2 rounded custom-container"
                          header="Quizzes"
                        >
                          {data && data.quizzes.length != 0 ? (
                            data.quizzes.map((quiz) => {
                              return (
                                <CoursesContentPreview
                                  key={quiz.id}
                                  title={quiz.title}
                                  icon={<MdQuiz />}
                                  action={() => handleRemoveQuiz(quiz.id)}
                                />
                              );
                            })
                          ) : (
                            <div className="d-flex justify-content-center text-muted">
                              No quizzes added
                            </div>
                          )}
                          {!isCreateQuestionEnabled ? (
                            <ActionButtonWithIcon
                              icon={<AiOutlinePlus />}
                              isSecondary
                              buttonType={"button"}
                              id={2}
                              action={handleModalOpen}
                              externalStyles={"w-100 my-1"}
                            />
                          ) : (
                            <ActionButtonWithIcon
                              icon={<AiOutlinePlus />}
                              text={"Create Question"}
                              isSecondary
                              buttonType={"button"}
                              action={handleIsQuestionModalOpen}
                              externalStyles={"w-100 my-1"}
                            />
                          )}
                        </ScrollableContainer>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Form>
          );
        }}
      </Formik>

      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        {modal}
      </CustomModal>

      <CustomModal
        isModalOpened={isQuestionModalOpen}
        modalClose={handleQuestionModalClose}
      >
        {isCreateQuestionEnabled ? (
          <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Create Question for {data.quizzes[0].title}</h4>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    question: "",
                    answer: "",
                    weight: 0,
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    handleCreateQuestion(values, { setSubmitting });
                  }}
                >
                  {(form) => {
                    return (
                      <Form key="questionForm">
                        <TextInput
                          key="question_title"
                          placeholder="Question"
                          label="Enter Question here"
                          externalStyles="mb-3"
                          name="question"
                          type="text"
                        />
                        <TextAreaInput
                          key="question_answer"
                          placeholder="Enter answer here"
                          label="Question Answer"
                          externalStyles="mb-3"
                          name="answer"
                          type="text"
                        />
                        <TextInput
                          key="question_weight"
                          placeholder="Enter question weight here"
                          label="Question weight"
                          externalStyles="mb-3"
                          name="weight"
                          type="number"
                        />
                        <div className="modal-footer">
                          <ActionButtonWithIcon
                            text="Close"
                            isSecondary
                            action={handleQuestionModalClose}
                          />
                          <ActionButtonWithIcon
                            text="Create"
                            type="submit"
                            buttonType="submit"
                            action={"submit"}
                          />
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        ) : null}
      </CustomModal>
    </Fragment>
  );
};

export default CreateCourse;
