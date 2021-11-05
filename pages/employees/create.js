import { Fragment, useState } from "react";
import PageHeader from "../../components/Common/PageHeader";
import BackButton from "../../components/Common/BackButton";
import TextInput from "../../components/Common/Inputs/TextInput";
import SelectInput from "../../components/Common/Inputs/SelectInput";
import { Form, Formik } from "formik";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import RoundedImageWithText from "../../components/Common/Images/RoundedImageWithText/RoundedImageWithText";
import axiosConfig from "../../helpers/axiosConfig";
const CreateEmployee = ({ teams }) => {
  console.log(teams);
  const [profilePicturePreview, setProfilePicturePreview] =
    useState("/id_img.jpg");

  const handlePreviewPicture = (picture) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setProfilePicturePreview(fileReader.result);
      }
    };
    fileReader.readAsDataURL(picture);
  };
  return (
    <Fragment>
      <BackButton text={"All employees"} />
      <PageHeader header={"Create Employee"} />
      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          gender: 0,
          phone_number: "",
          email: "",
          password: "",
          role: "",
          position: "",
          password: "",
          card_uid: "",
          team_id: 0,
          password_confirmation: "",
          profile_picture: undefined,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          for (let key in values) {
            formData.append(key, values[key]);
          }
          axiosConfig
            .post("auth/register", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              resetForm();
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="row mb-3">
                <TextInput
                  key="profile_picture"
                  placeholder={`Profile Picture`}
                  label={`Profile Picture`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="profile_picture"
                  type="file"
                  value={undefined}
                  onChange={(e) => {
                    formik.setFieldValue("profile_picture", e.target.files[0]);
                    handlePreviewPicture(e.target.files[0]);
                  }}
                />
                <RoundedImageWithText image={profilePicturePreview} />
                <TextInput
                  key="username"
                  placeholder={`Username`}
                  label={`Username`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="username"
                  type="text"
                />
              </div>
              <div className="row mb-3">
                <TextInput
                  key="password"
                  placeholder={`Password`}
                  label={`Password`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="password"
                  type="password"
                />
                <TextInput
                  key="password_confirmation"
                  placeholder={`Confirm Password`}
                  label={`Confirm Password`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="password_confirmation"
                  type="password"
                />
                <TextInput
                  key="card_uid"
                  placeholder={`Card UID`}
                  label={`Card UID`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="card_uid"
                  type="text"
                />
              </div>
              <div className="row mb-3">
                <h5 className="">Identity Card Information</h5>
                <TextInput
                  key="first_name"
                  placeholder={`First Name`}
                  label={`First Name`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="first_name"
                  type="text"
                />
                <TextInput
                  key="lastname"
                  placeholder={`Last Name`}
                  label={`Last Name`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="last_name"
                  type="text"
                />
                <SelectInput
                  label="Gender"
                  externalStyles="mb-3 col-12 col-sm-4 col-md-2"
                  name="gender"
                >
                  <option defaultValue>Choose Gender</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </SelectInput>
              </div>
              <div className="row mb-3">
                <h5 className="">Communication Tools</h5>
                <TextInput
                  key="phone_number"
                  placeholder={`Mobile Number`}
                  label={`Mobile No.`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="phone_number"
                  type="text"
                />
                <TextInput
                  key="email"
                  placeholder={`Email`}
                  label={`Email`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="email"
                  type="text"
                />
              </div>
              <div className="row">
                <h5 className="">Employment information</h5>
                <SelectInput
                  label="Role"
                  externalStyles="mb-3 col-12 col-sm-4 col-md-2"
                  name="role"
                >
                  <option defaultValue>Choose Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </SelectInput>
                <SelectInput
                  label="Team"
                  externalStyles="mb-3 col-12 col-sm-4 col-md-2"
                  name="team_id"
                >
                  {teams &&
                    teams.length > 0 &&
                    teams.map((team) => {
                      return (
                        <option value={team.id} key={"team" + team.id}>
                          {team.name}
                        </option>
                      );
                    })}
                </SelectInput>
                <TextInput
                  key="position"
                  placeholder={`Position`}
                  label={`Position`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="position"
                  type="text"
                />
              </div>
              <hr />
              <ActionButtonWithIcon
                text="Create"
                externalStyles={"w-100 mb-5"}
                buttonType="submit"
                action={"submit"}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  try {
    const teams = await axiosConfig.post("server/teams", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        teams: teams.data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};

export default CreateEmployee;
