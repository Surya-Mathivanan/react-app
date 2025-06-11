import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import './Register.css'; // Make sure to import your CSS

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
        photo: "https://i.pinimg.com/originals/38/8a/78/388a78de37fc7872ba21af5d2f1a7b6f.gif"
      });
      toast.success("User Registered Successfully!!", { position: "top-center" });
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <h3 className="title">Sign Up</h3>

      <div className="flex">
        <label>
          <input
            type="text"
            className="input"
            placeholder="Jhon"
            onChange={(e) => setFname(e.target.value)}
            required
            value={fname}
            />
            <span>First Name</span>
        </label>

        <label>
          <input
            type="text"
            className="input"
            placeholder="Doe"
            onChange={(e) => setLname(e.target.value)}
            value={lname}
          />
          <span>Last Name</span>
        </label>
      </div>

      <label>
        <input
          type="email"
          className="input"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
        <span>Email Address</span>
      </label>

      <label>
        <input
          type="password"
          className="input"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />
        <span>Password</span>
      </label>

      <button type="submit" className="submit">
        Sign Up
      </button>

      <p className="signin">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;




      {/* <div className="mb-3">
        <label>Profile Photo (Base64 or URL)</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter profile photo URL or base64 string"
          onChange={(e) => setPhoto(e.target.value)}
          required
        />
      </div> */}
      