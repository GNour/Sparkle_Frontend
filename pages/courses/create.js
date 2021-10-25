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
const CreateCourse = () => {
  const router = useRouter();
  const [isContentShown, setIsContentShown] = useState(false);
  const [articlesAdded, setArticlesAdded] = useState([]);
  const [videosAdded, setVideosAdded] = useState([]);
  const [quizzesAdded, setQuizzesAdded] = useState([]);
  const handleCreateCourse = (values) => {
    setIsContentShown(true);
  };

  // States for modal, Confirmation modal and Add note modal
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modal, setModal] = useState(<div></div>);

  const handleModalOpen = (value, id) => {
    setModalType(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setModalType(-1);
  };

  const handleCreateQuiz = (values) => {
    setQuizzesAdded([values, ...quizzesAdded]);
  };
  const handleCreateArticle = (values) => {
    setArticlesAdded([values, ...articlesAdded]);
  };
  const handleCreateVideo = (values) => {
    setVideosAdded([values, ...videosAdded]);
  };

  const handleRemoveQuiz = () => {};

  const handleRemoveArticle = () => {};

  const handleRemoveVideo = () => {};

  useEffect(() => {
    // Models => Article: 0, Video: 1, Quiz: 2
    if (modalType == 0) {
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
                  setSubmitting(false);
                  setIsModalOpen(false);
                  handleCreateArticle(values);
                }}
              >
                <Form>
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
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    } else if (modalType == 1) {
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
                  setSubmitting(false);
                  setIsModalOpen(false);
                  handleCreateVideo(values);
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
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    } else if (modalType == 2) {
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
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  setIsModalOpen(false);
                  handleCreateQuiz(values);
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
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    }
  }, [modalType]);

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
          setSubmitting(false);
          handleCreateCourse(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
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
                          {articlesAdded.length != 0 ? (
                            articlesAdded.map((article) => {
                              return (
                                <CoursesContentPreview
                                  key={article.title}
                                  title={article.title}
                                  icon={<RiArticleFill />}
                                  action={handleRemoveArticle}
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
                          {videosAdded.length != 0 ? (
                            videosAdded.map((video) => {
                              return (
                                <CoursesContentPreview
                                  key={video.title}
                                  title={video.title}
                                  icon={<RiVideoFill />}
                                  action={handleRemoveVideo}
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
                          {quizzesAdded.length != 0 ? (
                            quizzesAdded.map((quiz) => {
                              return (
                                <CoursesContentPreview
                                  key={quiz.title}
                                  title={quiz.title}
                                  icon={<MdQuiz />}
                                  action={handleRemoveQuiz}
                                />
                              );
                            })
                          ) : (
                            <div className="d-flex justify-content-center text-muted">
                              No quizzes added
                            </div>
                          )}
                          <ActionButtonWithIcon
                            icon={<AiOutlinePlus />}
                            isSecondary
                            id={2}
                            action={handleModalOpen}
                            externalStyles={"w-100 my-1"}
                          />
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
    </Fragment>
  );
};

export default CreateCourse;
