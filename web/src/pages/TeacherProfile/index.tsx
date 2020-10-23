import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { FiCamera, FiUser } from "react-icons/fi";

import "./styles.css";
import warning from "../../assets/images/icons/warning.svg";

import Input from "../../components/Input/index";
import TextArea from "../../components/Textarea/index";
import Select from "../../components/Select/index";
import HeaderBar from "../../components/HeaderBar/index";

import api from "../../services/api"

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

function TeacherProfile() {

    const [scheduleItems, setScheduleItem] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    const params = useParams<UserId>();
    const [teacherProfile, setTeacherProfile] = useState<UserProfile>()

    useEffect(() => {
        api.get(`users/${params.id}`)
            .then(response => {
                setTeacherProfile(response.data);
            })
            .catch(reject => {
                console.warn(reject)
                alert("Houve algum erro inesperado.")
            })
    }, [])

    if (!teacherProfile) {
        return <p>Loading.....</p>
    }

    function setScheduleItemValue(position: number, fieldName: string, value: string) {
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [fieldName]: value }
            }
            return scheduleItem;
        })
        console.log(updatedScheduleItem)
        setScheduleItem(updatedScheduleItem)
    }

    return (
        <div id="page-teacher-profile">

            <div className="teacher-profile-upper-container">

                <HeaderBar currentPage="Meu perfil" />
                <div className="teacher-image-container">
                    <div className="teacher-photo-wrapper">
                        {teacherProfile.avatar
                            ? (
                                <img src={teacherProfile.avatar} alt="Teacher avatar" />
                            ) : (
                                <div className="no-avatar">
                                    <FiUser color="#FFF" size={100} />
                                </div>
                        )}
                        <button type="button">
                            <FiCamera color="#FFF" size={24} />
                        </button>
                    </div>
                    <h1>{`${teacherProfile.name} ${teacherProfile.surname}`}</h1>
                    <h4>Geografia</h4>
                </div>
            </div>

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="name-surname-wrapper">
                            <Input name="name" label="Nome" value={teacherProfile.name} />
                            <Input name="surname" label="Sobrenome" value={teacherProfile.surname} />
                        </div>

                        <div className="email-whatsapp-wrapper">
                            <Input name="email" label="E-mail" type="email" value={teacherProfile.email} />
                            <Input name="whatsapp" label="Whatsapp" placeholder="(DDD) xxxxx - xxxx" value={teacherProfile.whatsapp} />
                        </div>

                        <TextArea name="bio" label="Biografia" value={teacherProfile.bio} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class-wrapper">
                            <Input name="subject" label="Matéria" />
                            <Input name="costPerHour" label="Custo da sua hora por aula" defaultValue="R$ "  />
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button"> + Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="day-of-week"
                                        label="Dia da semana"
                                        defaultOption="Selecione um dia"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, "week_day", event.target.value)}
                                        options={[
                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-feira" },
                                            { value: "2", label: "Terça-feira" },
                                            { value: "3", label: "Quarta-feira" },
                                            { value: "4", label: "Quinta-feira" },
                                            { value: "5", label: "Sexta-feira" },
                                            { value: "6", label: "Sábado" }
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={event => setScheduleItemValue(index, "from", event.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={event => setScheduleItemValue(index, "to", event.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img alt="Aviso importante" src={warning} />
                            Importante!<br />
                            Preencha todos os dados
                    </p>
                        <button type="submit" >
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>

        </div>
    )
}

export default TeacherProfile;