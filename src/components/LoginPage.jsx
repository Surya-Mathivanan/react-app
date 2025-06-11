import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import './Register.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", { position: "top-center" });
      window.location.href = "/profile";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="title">Login</h3>

      <label>
        <input
          type="email"
          className="input"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span>Email Address</span>
      </label>

      <label>
        <input
          type="password"
          className="input"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span>Password</span>
      </label>

      <button type="submit" className="submit">
        Submit
      </button>

      <p className="signin">
        New user? <a href="/register">Register Here</a>
      </p>
    </form>
  );
}

export default Login;
