import { Fragment, useState } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import CustomModal from "../../components/Common/CustomModal";
import { Formik, Form } from "formik";
import axiosConfig from "../../helpers/axiosConfig";
import TextAreaInput from "../../components/Common/Inputs/TextAreaInput";
import TextInput from "../../components/Common/Inputs/TextInput";
import useSWR, { mutate } from "swr";
import TaskCard from "../../components/TasksPage/TaskCard/TaskCard";
import { useRouter } from "next/router";
const CoursesPage = ({ courses }) => {
  const router = useRouter();

  const fetcher = (url) =>
    axiosConfig
      .post(url)
      .then((res) => res.data)
      .catch((err) => {
        err;
      });

  // Keep the fallbackData to the server side pre-fetched courses
  const { data, error } = useSWR("server/courses", fetcher, {
    fallbackData: courses,
  });

  const [isModalOpened, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateCourse = async (values, { setSubmitting }) => {
    await axiosConfig
      .post("course/create", values)
      .then(() => mutate("server/courses"));
    setIsModalOpen(false);
    setSubmitting(false);
  };

  return (
    <Fragment>
      <PageHeaderWithActions
        header="Courses"
        button={
          <div>
            <ActionButtonWithIcon
              icon={<AiOutlinePlus />}
              text={"Create Course"}
              externalStyles="me-1"
              action={handleOpen}
            />
          </div>
        }
      />
      <div className="row g-3 gy-5 py-3 row-deck">
        {data &&
          data.map((_, index) => {
            // Render in desc order
            let course = data[data.length - index - 1];
            return (
              <div
                key={"Course" + course.id}
                className="col-12 col-sm-8 col-md-4"
              >
                <TaskCard
                  externalStyles={"col"}
                  handleRoute={() => router.push("/courses/" + course.id)}
                  task={course}
                  isCourse
                />
              </div>
            );
          })}
      </div>
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleCreateCourse(values, { setSubmitting });
            }}
          >
            {(form) => {
              return (
                <Form className="modal-content">
                  <div className="modal-header">
                    <h4>Create Course</h4>
                  </div>
                  <div className="modal-body">
                    <TextInput
                      key="title"
                      placeholder="Course Title"
                      label="Course Title"
                      externalStyles="mb-3"
                      name="name"
                      type="text"
                    />

                    <TextAreaInput
                      key="description"
                      placeholder="Course Description"
                      label="Course Description"
                      externalStyles="mb-3"
                      name="description"
                      type="text"
                    />
                  </div>
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon text="Create" buttonType="submit" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  try {
    const res = await axiosConfig.post("server/courses", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        courses: res.data,
      },
      revalidate: 20,
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};

export default CoursesPage;
