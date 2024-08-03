import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  function validate(username, password) {
    if (username.current.value.length < 3) {
      alert("Username isn't valid");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Password isn't valid");
      passwordRef.current.style.outlineColor = "red";
      passwordRef.current.focus();
      return false;
    }
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) return;

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    setDisable(true);

    fetch(`https://auth-rg69.onrender.com/api/auth/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setDisable(false));
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" ref={usernameRef} placeholder="Enter username..." />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter password..."
        />
        <button type="submit" disabled={disable}>
          {disable ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
