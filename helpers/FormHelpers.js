import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

export const createEmployeeSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(6).required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  gender: Yup.boolean().required("Required"),
  phone_number: Yup.string().min(6).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  role: Yup.string()
    .oneOf(["Manager", "Staff"], "Choose a role")
    .required("Required"),
  team_id: Yup.string().min(1).required("Required"),
});
