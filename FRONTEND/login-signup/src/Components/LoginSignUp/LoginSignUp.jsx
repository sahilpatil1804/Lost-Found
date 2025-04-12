import React, { useState } from "react";
import axios from "axios";
import "./LoginSignUp.css";
import password from "../Assets/password.png";
import email from "../Assets/email.png";
import person from "../Assets/person.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState("Sign Up");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (action === "Sign Up" && !state.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!state.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!state.password.trim()) {
      newErrors.password = "Password is required";
    } else if (state.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOnSubmitSignUp = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) return;

    const { username, email, password } = state;

    try {
      const response = await axios.post("http://localhost:8080/api/SignUp", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        alert("SignUp Successful");
        setState({
          username: "",
          email: "",
          password: "",
        });
        setAction("Login");
      }
    } catch (error) {
      alert("SignUp Failed. Please try again");
    }
  };

  const handleOnSubmitLogin = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) return;

    const { email, password } = state;

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userEmail", email);
        dispatch(login());
        setState({ email: "", password: "" });
        alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      alert("Either Password or email is wrong.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="header">
          <div className="text">{action}</div>
        </div>
        
        <form onSubmit={action === "Login" ? handleOnSubmitLogin : handleOnSubmitSignUp}>
          <div className="inputs">
            {action === "Sign Up" && (
              <div className="input-wrapper">
                <div className="input">
                  <img src={person} alt="Person icon" />
                  <input
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                {errors.username && <p className="error-message">{errors.username}</p>}
              </div>
            )}
            
            <div className="input-wrapper">
              <div className="input">
                <img src={email} alt="Email icon" />
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="input-wrapper">
              <div className="input">
                <img src={password} alt="Password icon" />
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
          </div>

          {action === "Login" && (
            <div className="forgot-password">
              Forgot Password? <span>Click here</span>
            </div>
          )}

          <div className="submit-container">
            <button
              type="button"
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={
                action === "Sign Up"
                  ? handleOnSubmitSignUp
                  : () => setAction("Sign Up")
              }
            >
              Sign Up
            </button>
            <button
              type="button"
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={
                action === "Login" ? handleOnSubmitLogin : () => setAction("Login")
              }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;