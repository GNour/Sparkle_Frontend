import { Fragment, useContext } from "react";
import Image from "next/image";
import { Form, Formik } from "formik";
import TextInput from "../components/Common/Inputs/TextInput";
import ActionButtonWithIcon from "../components/Common/Buttons/ActionButtonWithIcon";
import { useAuth } from "../stores/AuthContext";
const Login = () => {
  const { login } = useAuth();
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-4">
          <div className="h-100 rounded custom-container-primary p-5">
            <div className="d-flex justify-content-center mb-3">
              <Image
                src="/logoBig.png"
                height="75"
                width="112"
                layout="fixed"
                alt="LOGO"
                quality="100"
              />
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                login(values);
              }}
            >
              <Form>
                <TextInput
                  key="email"
                  placeholder={`example@email.com`}
                  label={`Enter Email`}
                  externalStyles="mb-3"
                  externalLabelStyles="color-white"
                  name="email"
                  type="text"
                />
                <TextInput
                  key="password"
                  placeholder={`password`}
                  label={`Enter Password`}
                  externalStyles="mb-5"
                  externalLabelStyles="color-white"
                  name="password"
                  type="password"
                />
                <div className="d-flex justify-content-center">
                  <ActionButtonWithIcon
                    text="Sign In"
                    icon={null}
                    isSecondary
                    buttonType="submit"
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
