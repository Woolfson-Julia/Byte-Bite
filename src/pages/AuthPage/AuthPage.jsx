import { useParams, Navigate } from "react-router-dom";

import css from "./AuthPage.module.css";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
// import NotFound from "../../components/NotFound";

export default function AuthPage() {
  const { authType } = useParams();
  if (authType !== "login" && authType !== "register") {
    return <Navigate to="/auth/login" replace />; //redirect if the query is invalid
  }

  return (
    <>
      {authType === "login" && <LoginForm />}
      {authType === "register" && <RegistrationForm />}
      {/* {authType !== "login" && authType !== "register" && <NotFound />} */}
    </>
  );
}
