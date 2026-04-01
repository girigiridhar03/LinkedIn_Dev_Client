import { CodeXml } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authRegister } from "@/store/auth/auth.service";
import { reset } from "@/store/auth/auth.reducer";
import { getUserMeDetails } from "@/store/user/user.service";
export default function AuthPage() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { authLoading, loginError, registerError } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const renderText = (loginText, registerText) => {
    return pathname === "/login" ? loginText : registerText;
  };

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({
      name: "",
      email: "",
      password: "",
    });
    dispatch(reset());
  }, [pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const errObj = {};

    try {
      if (isRegister) {
        if (!formData.name || !formData.name.trim()) {
          errObj.name = "Full name is required";
        }

        if (!formData.email || !formData.email.trim()) {
          errObj.email = "Email is required";
        }
        if (!formData.password || !formData.password.trim()) {
          errObj.password = "Password is required";
        }

        if (Object.keys(errObj)?.length > 0) {
          console.log(errObj);
          setErrors(errObj);
          return;
        }

        const result = await dispatch(authRegister(formData)).unwrap();
        console.log(result);
        if (result?.success) {
          await dispatch(getUserMeDetails()).unwrap();
          navigate("/feed");
        }
      } else {
        if (!formData.email || !formData.email.trim()) {
          errObj.email = "Email is required";
        }
        if (!formData.password || !formData.password.trim()) {
          errObj.password = "Password is required";
        }

        if (Object.keys(errObj).length > 0) {
          setErrors(errObj);
          return;
        }
        const result = await dispatch(authLogin(formData)).unwrap();
        console.log("loginResponse", result);
        if (result?.success) {
          await dispatch(getUserMeDetails()).unwrap();
          navigate("/feed");
        }
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex lg:flex-col lg:h-full bg-linear-to-br from-primary to-primary/80 p-10 text-primary-foreground">
        <div className="flex items-center gap-2.5">
          <span
            className="
    h-10 w-10 rounded-xl flex items-center justify-center text-white text-xl
    bg-white/10 backdrop-blur-md border border-white/20
    shadow-[inset_0_2px_5px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.2)]
  "
          >
            <CodeXml />
          </span>
          <span className="text-xl font-semibold">DevConnect</span>
        </div>
        <div className="flex-1 flex h-full justify-center flex-col gap-9">
          <div className="text-4xl w-[50%] font-semibold leading-12">
            {renderText(
              "Connect with developers who share your passion.",
              "Join 50,000+ developers building together.",
            )}
          </div>
          <div className="opacity-65 w-[80%]">
            Build your professional network, share projects, find collaborators,
            and grow your career in the developer community.
          </div>
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold">50K+</span>
              <span className="opacity-65">Developers</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold">120K+</span>
              <span className="opacity-65">Posts</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold">8K+</span>
              <span className="opacity-65">Companies</span>
            </div>
          </div>
        </div>
        <p className="opacity-65 text-xs">
          © 2026 DevConnect. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm
              renderText={renderText}
              onChange={handleChange}
              onSubmit={handleSumbit}
              isRegister={isRegister}
              formData={formData}
              errors={errors}
              authLoading={authLoading}
              loginError={loginError}
              registerError={registerError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
