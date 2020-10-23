import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom";
import { FiPower, FiUser } from "react-icons/fi"

import "./styles.css"
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import purpleHeart from "../../assets/images/icons/purple-heart.svg";
import giveClasses from "../../assets/images/icons/give-classes.svg";
import study from "../../assets/images/icons/study.svg";

import api from "../../services/api";

interface UserId {
    id: string;
}

interface UserProfile {
    name: string;
    surname: string;
    whatsapp: string;
    bio: string;
    avatar: string;
    email: string;
}

function Landing() {

    const history = useHistory();
    const params = useParams<UserId>();

    const [profile, setProfile] = useState<UserProfile>();
    const [totalConnections, setTotalConnections] = useState(0);


    useEffect(() => {
        api.get(`users/${params.id}`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(reject => {
                console.warn(reject)
                alert("Houve algum erro inesperado.")
            })

    }, [params.id]);

    useEffect(() => {
        api.get("connections")
            .then(response => {
                const { total: totalConnections } = response.data;
                setTotalConnections(totalConnections);
            })
            .catch(reject => {
                alert("Houve um erro ao carregar o total de conexões!")
            })
    }, [])

    if(!profile) {
        return <p>Loading...</p>
    }


    function handleLogoff() {
        localStorage.clear();
        history.push("/login")
    }

    return (
        <div id="home-page-container">

            <div className="home-page-upper-content">

                <div className="upper-container">
                    <div className="user-container">
                        <div className="user-content">
                            <Link className="user-icon" to={`/teacher/profile/${params.id}`}>
                                {profile.avatar
                                    ? (
                                        <img src={profile.avatar} alt="Avatar" />
                                    ) : (
                                        <FiUser color="#FFF" size={28} />
                                )}
                            </Link>
                                    <Link to={`/teacher/profile/${params.id}`}>{`${profile.name} ${profile.surname}`}</Link>
                        </div>
                        <div className="logoff-container">
                            <button onClick={handleLogoff}>
                                <FiPower />
                            </button>
                        </div>
                    </div>

                    <div className="logo-proffy-container">
                        <div className="logo-proffy-content">
                            <img src={logoImg} alt="Proffy logo"></img>
                            <h2>Sua plataforma de <br />estudos online</h2>
                        </div>
                        <img src={landingImg} alt="Hero"></img>

                    </div>

                </div>
            </div>
            <div className="home-page-lesser-content">
                <div className="lesser-container">

                    <h4>Seja bem-vindo!<br /><strong>O que deseja fazer?</strong></h4>
                    <div className="total-connections-container">
                        <p>Total de {totalConnections} conexões <br />já realizadas <img src={purpleHeart} alt="heart icon"></img></p>
                    </div>

                    <div className="button-group-container">
                        <Link to="/study">
                            <img src={study} alt="Study" />
                            Estudar
                        </Link>

                        <Link to={`/classes/give/${params.id}`}>
                            <img src={giveClasses} alt="Give classes" />
                            Dar aulas
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Landing;