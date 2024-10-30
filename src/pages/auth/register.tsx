import RegisterForm from "@/components/RegisterForm";
import { Helmet } from "react-helmet-async";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register | Article App Travel</title>
      </Helmet>
      <RegisterForm />
    </>
  );
};

export default Register;
