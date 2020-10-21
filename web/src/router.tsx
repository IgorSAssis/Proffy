import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login/index";
import Landing from "./pages/Landing/index";
import Register from "./pages/Register/index";
import TeacherForm from "./pages/TeacherForm/index";
import TeacherList from "./pages/TeacherList/index";
import ForgotPassword from "./pages/ForgotPassword/index";
import TeacherProfile from "./pages/TeacherProfile/index";
import ConclusionPage from "./components/ConclusionPage/index";

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={Login} />
            <Route path="/home" component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/register" component={Register} />
            <Route path="/register/conclusion"
                component={() =>
                    <ConclusionPage
                        title="Cadastro concluído!"
                        description="Agora você faz parte da plataforma Proffy. Tenha uma ótima experiência."
                        textButton="Fazer login"
                    />}>
            </Route>
            <Route path="/teacher/profile" component={TeacherProfile}></Route>
            <Route path="/classes/give" component={TeacherForm} />
            <Route path="/password/reset" component={ForgotPassword}></Route>
            <Route path="/password/reset/conclusion"
                component={() =>
                    <ConclusionPage
                        title="Redefinição enviada!"
                        description="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
                        textButton="Voltar ao login"
                    />}>
            </Route>
            <Route path="/classes/conclusion"
                component={() =>
                    <ConclusionPage
                        title="Cadastro salvo!"
                        description="Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp."
                        textButton="Acessar"
                    />}>
            </Route>

        </BrowserRouter>
    )
}

export default Routes;