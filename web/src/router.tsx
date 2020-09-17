import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing/index";
import Register from "./pages/Register/index";
import TeacherForm from "./pages/TeacherForm/index";
import TeacherList from "./pages/TeacherList/index";

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={ Landing }/>
            <Route path="/study" component={ TeacherList }/>
            <Route path="/register" component={ Register }/>
            <Route path="/give-classes" component={ TeacherForm }/>
        </BrowserRouter>
    )
}

export default Routes;