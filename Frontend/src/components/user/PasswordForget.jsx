import React from "react";
import MetaData from "../MetaData";
import './passwordforget.css'
function PasswordForget() {
  return (
    <div className="resetpassword-container">
      <MetaData title={"ShopKaro Sign In"}></MetaData>
      <div className="resetpassword-box card">
        <form className="resetpassword-form" encType="">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div className="login-btn">
            <button className="btn btn-primary w-100 btn-lg">SEND OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordForget;
