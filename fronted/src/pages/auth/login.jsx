import Commonform from "@/components/commonComponents/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login in to your account
        </h1>
        <p>
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Register
          </Link>
        </p>
      </div>
      <Commonform
        formControls={loginFormControls}
        buttonText={"Login In"}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default AuthLogin;
