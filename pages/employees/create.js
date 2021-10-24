import { Fragment, useState } from "react";
import PageHeader from "../../components/Common/PageHeader";
import BackButton from "../../components/Common/BackButton";
import TextInput from "../../components/Common/Inputs/TextInput";
import SelectInput from "../../components/Common/Inputs/SelectInput";
import { Form, Formik } from "formik";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import RoundedImageWithText from "../../components/Common/Images/RoundedImageWithText/RoundedImageWithText";
const CreateEmployee = () => {
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
          first_name: "",
          father_name: "",
          last_name: "",
          surname: "",
          nationality: "",
          idnumber: "",
          dob: null,
          gender: null,
          blood_type: null,
          mobile_number: "",
          home_number: "",
          email: "",
          address_state: "",
          address_province: "",
          address_town: "",
          address_st: "",
          address_bldg: "",
          profile_picture: undefined,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
                  key="father_name"
                  placeholder={`Father Name`}
                  label={`Father Name`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="father_name"
                  type="text"
                />
                <TextInput
                  key="surname"
                  placeholder={`Surname`}
                  label={`Surname`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="surname"
                  type="text"
                />
                <TextInput
                  key="mother_name"
                  placeholder={`Mother Name`}
                  label={`Mother Name`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="mother_name"
                  type="text"
                />
                <TextInput
                  key="nationality"
                  placeholder={`Nationality`}
                  label={`Nationality`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="nationality"
                  type="text"
                />
                <TextInput
                  key="idnumber"
                  placeholder={`Identity Number`}
                  label={`Identity Number`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="idnumber"
                  type="text"
                />
                <TextInput
                  key="dob"
                  placeholder={`Date of birth`}
                  label={`Date of birth`}
                  externalStyles="mb-3 col-12 col-sm-4 col-md-2"
                  name="dob"
                  type="date"
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
                <SelectInput
                  label="Blood type"
                  externalStyles="mb-3 col-12 col-sm-4 col-md-2"
                  name="blood_type"
                >
                  <option defaultValue>Choose Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                  <option value="O-">O-</option>
                </SelectInput>
              </div>
              <div className="row mb-3">
                <h5 className="">Communication Tools</h5>
                <TextInput
                  key="mobile_number"
                  placeholder={`Mobile Number`}
                  label={`Mobile No.`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="mobile_number"
                  type="text"
                />
                <TextInput
                  key="home_number"
                  placeholder={`Home Number`}
                  label={`Home No.`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="home_number"
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
                <h5 className="">Present Address</h5>
                <TextInput
                  key="state"
                  placeholder={`State`}
                  label={`State`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="address_state"
                  type="text"
                />
                <TextInput
                  key="province"
                  placeholder={`Province`}
                  label={`Province`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="address_province"
                  type="text"
                />
                <TextInput
                  key="town"
                  placeholder={`Town`}
                  label={`Town`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="address_town"
                  type="text"
                />
                <TextInput
                  key="street"
                  placeholder={`Street`}
                  label={`Street`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="address_st"
                  type="text"
                />
                <TextInput
                  key="building"
                  placeholder={`Building`}
                  label={`Building`}
                  externalStyles="mb-3 col-12 col-sm-6 col-md-3"
                  name="address_bldg"
                  type="text"
                />
              </div>
              <hr />
              <ActionButtonWithIcon
                text="Create"
                externalStyles={"w-100 mb-5"}
                type="submit"
                action={"submit"}
              />
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CreateEmployee;
