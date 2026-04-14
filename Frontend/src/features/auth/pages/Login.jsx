
import React from "react";
import { Link, useNavigate } from "react-router";
import "../auth.form.scss"

function Login() {

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("hello")
  }
  return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                id="email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                id="password"
              />
            </div>
            <button className="button primary-button">Login</button>
          </form>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
