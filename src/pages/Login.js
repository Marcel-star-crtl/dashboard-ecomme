import React, { useEffect, useRef } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Use a ref to track if navigation has already occurred
  const hasNavigatedSuccessfully = useRef(false);
  const navigationAttempted = useRef(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Login form submitted. Dispatching login action...");
      hasNavigatedSuccessfully.current = false;
      navigationAttempted.current = false;
      dispatch(login(values));
    },
  });

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Checking existing user on mount:", user);
    if (user && user.token && !hasNavigatedSuccessfully.current) {
      console.log("User already logged in, redirecting...");
      hasNavigatedSuccessfully.current = true;
      window.location.href = "/admin";
    }
  }, []);

  // Handle successful login
  useEffect(() => {
    console.log("Login useEffect triggered. Current state:");
    console.log("isSuccess:", isSuccess);
    console.log("user:", user);
    console.log("hasNavigatedSuccessfully.current:", hasNavigatedSuccessfully.current);
    console.log("navigationAttempted.current:", navigationAttempted.current);
    console.log("current location:", location.pathname);

    if (isSuccess && user && user.token && !hasNavigatedSuccessfully.current && !navigationAttempted.current) {
      console.log("Login successful and user found. Initiating navigation...");
      hasNavigatedSuccessfully.current = true;
      navigationAttempted.current = true;

      dispatch(reset());

      setTimeout(() => {
        console.log("Performing hard redirect to /admin");
        window.location.href = "/admin";
      }, 100);

    } else if (isError && !isLoading) {
        console.error("Login failed or error state active:", message);
    }
  }, [isSuccess, user, dispatch, location.pathname, isError, isLoading, message]);

  const handleSuccessfulLogin = () => {
    if (user && user.token && !hasNavigatedSuccessfully.current) {
      hasNavigatedSuccessfully.current = true;

      setTimeout(() => {
        console.log("Attempting React Router navigation...");
        navigate("/admin", { replace: true });
      }, 200);

      setTimeout(() => {
        if (window.location.pathname === "/login") {
          console.log("React Router failed, using hard redirect...");
          window.location.href = "/admin";
        }
      }, 1000);
    }
  };

  return (
    <div
      className="py-5"
      style={{
        background: "#f8f8f8", 
        minHeight: "100vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        className="my-5 w-25 bg-white rounded-3 mx-auto p-4"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          maxWidth: '400px', 
          width: '90%', 
          padding: '40px',
        }}
      >
        <h3
          className="text-center title"
          style={{
            color: '#E8A5C4', 
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '15px'
          }}
        >
          Login
        </h3>
        <p className="text-center" style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>Login to your account to continue.</p>
        <div className="error text-center" style={{ color: '#d9534f', fontSize: '12px', marginBottom: '15px' }}>
          {isError && message && typeof message === 'string' && message.includes("Rejected")
            ? "You are not an Admin"
            : isError && message && (typeof message === 'string' ? message : message.message)
            ? (typeof message === 'string' ? message : message.message)
            : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2" style={{ color: '#d9534f', fontSize: '12px' }}>
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2" style={{ color: '#d9534f', fontSize: '12px' }}>
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="" style={{ color: '#E8A5C4', textDecoration: 'none', fontSize: '14px' }}>
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{
              background: "#E8A5C4", 
              borderRadius: '5px',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.3s ease',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => { !isLoading && (e.target.style.backgroundColor = '#D192AE'); }}
            onMouseLeave={(e) => { !isLoading && (e.target.style.backgroundColor = '#E8A5C4'); }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;