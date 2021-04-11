import React from "react";

import Login from "./Login";
import EmailRegister from "./EmailRegister";
import EmailLogin from "./EmailLogin";
import ResetPassword from "./ResetPassword"

export default function SuperLogin() {
    return (
        <div>
            <Login />

            <EmailRegister />

            <EmailLogin />

            <ResetPassword />
        </div>
    );
}