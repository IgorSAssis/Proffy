import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing/index";
import Register from "./pages/Register/index";
import TeacherForm from "./pages/TeacherForm/index";
import TeacherList from "./pages/TeacherList/index";
import ForgotPassword from "./pages/ForgotPassword/index";
import RegisterConclusion from "./pages/RegisterConclusion";
import ForgotPasswordConclusion from "./pages/ForgotPasswordConclusion";

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={ Landing }/>
            <Route path="/study" component={ TeacherList }/>
            <Route path="/register" component={ Register }/>
            <Route path="/register-conclusion" component={ RegisterConclusion }></Route>
            <Route path="/give-classes" component={ TeacherForm }/>
            <Route path="/reset-password" component={ ForgotPassword }></Route>
            <Route path="/reset-password-conclusion" component={ForgotPasswordConclusion}></Route>
        </BrowserRouter>
    )
}

export default Routes;