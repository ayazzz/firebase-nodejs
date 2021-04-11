import React from "react";

import LoginGoogle from "./Login.Google";
import LoginYahoo from "./Login.Yahoo";

import EmailRegister from "./EmailRegister";
import EmailLogin from "./EmailLogin";
import ResetPassword from "./ResetPassword"

export default function SuperLogin() {
    return (
        <div>
            <LoginGoogle />

            <LoginYahoo />

            <EmailLogin />

            <ResetPassword />

            <EmailRegister />
        </div>
    );
}