import React, { useState } from "react";
import { Link } from "react-router-dom"
import { FiCamera } from "react-icons/fi";

import "./styles.css";
import arrowBack from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";
import warning from "../../assets/images/icons/warning.svg";

import Input from "../../components/Input";
import TextArea from "../../components/Textarea";
import Select from "../../components/Select";

function TeacherProfile() {

    const [scheduleItems, setScheduleItem] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

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

                <header>
                    <Link to="/home">
                        <img src={arrowBack} alt="Arrow back" />
                    </Link>
                    <span>Meu perfil</span>
                    <img src={logo} alt="Logo" />
                </header>

                <div className="teacher-image-container">
                    <div className="teacher-photo-wrapper">
                        <img src="https://avatars3.githubusercontent.com/u/53535028?s=460&u=5c8d9211e92350617aa6604ac57445a7dffdfa8b&v=4" alt="Teacher" />
                        <button type="button">
                            <FiCamera color="#FFF" size={24} />
                        </button>
                    </div>
                    <h1>Igor Semphoski de Assis</h1>
                    <h4>Geografia</h4>
                </div>

                <div className="teacher-data-container">
                </div>

            </div>

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="name-surname-wrapper">
                            <Input name="name" label="Nome" />
                            <Input name="surname" label="Sobrenome" />
                        </div>

                        <div className="email-whatsapp-wrapper">
                            <Input name="email" label="E-mail" type="email" />
                            <Input name="whatsapp" label="Whatsapp" />
                        </div>

                        <TextArea name="bio" label="Biografia" />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class-wrapper">
                            <Input name="subject" label="Matéria" />
                            <Input name="costPerHour" label="Custo da sua hora por aula" />
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