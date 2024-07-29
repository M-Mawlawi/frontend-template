import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import googleIcon from "../../assets/media/svg/brand-logos/google-icon.svg";
import appleIcon from "../../assets/media/svg/brand-logos/apple-black.svg";
import enLang from "../../assets/media/flags/united-states.svg";
import spLang from "../../assets/media/flags/spain.svg";
import frLang from "../../assets/media/flags/france.svg";
import grLang from "../../assets/media/flags/germany.svg";
import jpLang from "../../assets/media/flags/japan.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../../assets/media/logos/custom-1.png";
import loginHeroImage from "../../assets/media/misc/auth-screens.png";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/auth";
import { useLocalStorage } from "usehooks-ts";
import HttpError from "../../components/httpError";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, saveisAuthenticated] = useLocalStorage("token", null);

  const onSubmit = async (data) => {
    const res = await authService.login(data);
    if (!(res instanceof HttpError)) {
        saveisAuthenticated(res.token);
        navigate("/");
    }else{
        onError();
    }
  };

  const onError = (errors) => {
    setIsErrorModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
      setIsErrorModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen || isErrorModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, isErrorModalOpen]);

  return (
    <div className="container flex flex-row p-0 m-0 w-screen max-w-full h-screen">
      {/* left container */}
      <div className="sign-in flex-1 bg-white pt-10">
        <div className="w-full text-gray-900 flex flex-col justify-normal mt-28">
          <div className="header mb-10">
            <h1 className="text-2xl font-bold font-sans mb-2">Sign In</h1>
            <h3 className="text-gray-500 text-sm">Your Social Campaigns</h3>
          </div>
          {/* direct login */}
          <div className="flex flex-row w-[435px] mx-auto gap-1.5 mb-10">
            <button className="text-sm text-gray-500 w-full h-10 border-solid border border-gray-300 rounded-md flex flex-row items-center justify-center gap-1.5 hover:text-primary hover:bg-light">
              <img src={googleIcon} alt="googleLogo" className="w-4 h-4" />
              Sign in with Google
            </button>
            <button className="text-sm text-gray-500 w-full h-10 border-solid border border-gray-300 rounded-md flex flex-row items-center justify-center gap-1.5 hover:text-primary hover:bg-light">
              <img src={appleIcon} alt="appleLogo" className="w-4 h-4" />
              Sign in with Apple
            </button>
          </div>

          <div className="w-1/2 flex items-center mx-auto mb-10">
            <div className="flex-grow border-t border-light"></div>
            <span className="text-xs flex-shrink mx-4 text-gray-500">Or with email</span>
            <div className="flex-grow border-t border-light"></div>
          </div>

          {/* login form */}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col w-[435px] mx-auto mb-6"
          >
            <input
              className={`p-3 ${
                errors.email ? "mb-1" : "mb-6"
              } h-[42px] text-sm font-medium bg-white border-solid border outline-none border-gray-300 rounded-md`}
              type="text"
              id="email"
              placeholder="Email"
              {...register("user", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red text-xs mb-6 text-left">{errors.email.message}</span>
            )}
            <input
              className={`p-3 mb-1 h-[42px] text-sm font-medium bg-white border-solid border outline-none border-gray-300 rounded-md`}
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red text-xs mb-1 text-left">{errors.password.message}</span>
            )}
            <div className="text-right">
              <a href="#" className="text-sm font-medium text-primary hover:text-sec">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="text-white text-sm bg-primary w-[435px] h-10 rounded-md mx-auto mb-3 mt-6 hover:bg-primary-active"
            >
              Sign In
            </button>
          </form>

          <h1 className="text-sm text-gray-500">
            Not a Member yet? <a href="#" className="text-sec font-medium">Sign up</a>
          </h1>

          {/* footer left */}
          <div className="flex flex-row justify-center mt-24 w-1/2 mx-auto gap-x-20 relative">
            <button
              onClick={toggleModal}
              className="text-sm text-gray-700 w-full h-10 flex flex-row items-center justify-start gap-1.5 hover:text-primary"
            >
              <img src={enLang} alt="language" className="w-5 h-5 rounded-md" />
              English <MdKeyboardArrowDown className="text-gray-500" />
            </button>
            <div className="w-full flex flex-row items-center justify-center gap-1.5 text-sec text-sm font-medium">
              <a href="#">Terms</a>
              <a href="#">Plans</a>
              <a href="#">Contact Us</a>
            </div>
            {/* Language Modal */}
            {isModalOpen && (
              <div
                ref={modalRef}
                className="absolute bg-white p-4 rounded-md shadow-[0px_0px_50px_0px_rgba(82,63,105,0.15)] top-[-210px] left-0 z-10 w-48"
              >
                <ul className="text-sm">
                  <li className="p-2 cursor-pointer hover:text-primary flex gap-4 text-xs font-medium">
                    <img src={enLang} alt="language" className="w-5 h-5 rounded-md" />
                    English
                  </li>
                  <li className="p-2 cursor-pointer hover:text-primary flex gap-4 text-xs font-medium">
                    <img src={spLang} alt="language" className="w-5 h-5 rounded-md" />
                    Spanish
                  </li>
                  <li className="p-2 cursor-pointer hover:text-primary flex gap-4 text-xs font-medium">
                    <img src={frLang} alt="language" className="w-5 h-5 rounded-md" />
                    French
                  </li>
                  <li className="p-2 cursor-pointer hover:text-primary flex gap-4 text-xs font-medium">
                    <img src={grLang} alt="language" className="w-5 h-5 rounded-md" />
                    German
                  </li>
                  <li className="p-2 cursor-pointer hover:text-primary flex gap-4 text-xs font-medium">
                    <img src={jpLang} alt="language" className="w-5 h-5 rounded-md" />
                    Japanese
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* right container */}
      <div className="right flex-1 bg-primary w-full h-screen bg-login-bg bg-contain">
        <div className="flex flex-col w-full h-screen justify-center items-center gap-y-12">
          <img src={logo} alt="Logo" className="h-[75px]" />
          <img src={loginHeroImage} alt="Hero" className="w-3/5" />
          <div className="w-3/5">
            <h1 className="text-3xl font-bold mb-7 text-white">Fast, Efficient and Productive</h1>
            <p className="text-sm font-medium">
              In this kind of post, <a href="#" className="text-highlight">the blogger</a>{" "}
              introduces a person they’ve interviewed
              <br />
              and provides some background information about{" "}
              <a href="#" className="text-highlight">
                the interviewee
              </a>{" "}
              and their work following this is a transcript of the interview.
            </p>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-2xl bg-white">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsErrorModalOpen(false)}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-500">Sorry, looks like there are some errors detected, please try again.</h3>
                <button
                  type="button"
                  className="text-white bg-primary hover:bg-primary-active focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => setIsErrorModalOpen(false)}
                >
                  Ok, got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
