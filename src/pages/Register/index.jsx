import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  function validate(username, email, password, repassword) {
    if (username.current.value.length < 3) {
      alert("Username is not valid");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (email.current.value.length < 3) {
      alert("Email is not valid");
      email.current.style.outlineColor = "red";
      email.current.focus();
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Password is not valid");
      password.current.style.outlineColor = "red";
      password.current.focus();
      return false;
    }
    if (repassword.current.value.length < 3) {
      alert("Repassword is not valid");
      repassword.current.style.outlineColor = "red";
      repassword.current.focus();
      return false;
    }
    if (password.current.value !== repassword.current.value) {
      alert("Password and Repassword do not match");
      repassword.current.style.outlineColor = "red";
      repassword.current.focus();
      return false;
    }
    return true;
  }

  function handleRegister(event) {
    event.preventDefault();
    const isValid = validate(usernameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) return;

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setDisable(true);

    fetch(`https://auth-rg69.onrender.com/api/auth/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User registered successfully!") {
          navigate("/login");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setDisable(false));
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1>Register</h1>
        <input type="text" ref={usernameRef} placeholder="Enter username..." />
        <input type="email" ref={emailRef} placeholder="Enter email..." />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter password..."
          autoComplete="off"
        />
        <input
          type="password"
          ref={rePasswordRef}
          placeholder="Re-enter password..."
          autoComplete="off"
        />
        <button type="submit" disabled={disable}>
          {disable ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
