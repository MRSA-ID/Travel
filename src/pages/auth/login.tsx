import LoginForm from "@/components/LoginForm";
import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login | Article App Travel</title>
      </Helmet>
      <LoginForm />
    </>
  );
};

export default Login;
