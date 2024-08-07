import React from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  const [passwordMismatch, setPasswordMismatch] = React.useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        password,
      };
      register(newUser).then((user) => {
        if (user.errors) {
          setErrors(user.errors);
        } else {
          setLoggedInUser(user);
          navigate("/");
        }
      });
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "15px",
        marginTop: "30px",
        borderRadius: "8px",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        maxWidth: "500px",
      }}
    >
      <h3>Sign Up</h3>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>User Name</Label>
        <Input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Confirm Password</Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
        />
        <FormFeedback>Passwords do not match!</FormFeedback>
      </FormGroup>
      {Array.isArray(errors) &&
        errors.map((e, i) => (
          <p key={i} style={{ color: "red" }}>
            {e}
          </p>
        ))}
      <Button
        color="primary"
        onClick={handleSubmit}
        disabled={passwordMismatch}
      >
        Register
      </Button>
      <p>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}
