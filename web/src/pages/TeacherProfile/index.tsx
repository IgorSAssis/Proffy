import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { FiCamera, FiUser, FiAlertOctagon } from "react-icons/fi";
import { useForm } from "react-hook-form";

import "./styles.css";
import warning from "../../assets/images/icons/warning.svg";

import Input from "../../components/Input/index";
import TextArea from "../../components/Textarea/index";
import Select from "../../components/Select/index";
import HeaderBar from "../../components/HeaderBar/index";
import ErrorMessage from "../../components/ErrorMessage/index"

import api from "../../services/api"

interface UserId {
    id: string;
}

type UserProfile = {
    name: string;
    surname: string;
    whatsapp: string;
    bio: string;
    avatar: string;
    email: string;
    subject?: string;
    costPerHour?: string;
}

function TeacherProfile() {


    const [scheduleItems, setScheduleItem] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    const params = useParams<UserId>();

    const { register, handleSubmit, setValue, getValues, errors } = useForm<UserProfile>();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        api.get(`users/${params.id}`)
            .then(response => {

                const {
                    name,
                    surname,
                    email,
                    whatsapp,
                    bio,
                    avatar
                } = response.data;

                setValue("name", name)
                setValue("surname", surname)
                setValue("email", email)
                setValue("whatsapp", whatsapp)
                setValue("bio", bio)
                setValue("avatar", avatar)

                setName(getValues("name"));
                setSurname(getValues("surname"))
                setAvatar(getValues("avatar"))

            })
            .catch(reject => {
                console.warn(reject)
                alert("Houve algum erro inesperado.")
            })
    }, [params.id])

    if(!getValues()) {
        return <p>Loading...</p>
    }

    function onSubmit(data: UserProfile) {
        console.log(data)
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
                        {avatar
                            ? (
                                <img src={avatar} alt="Teacher avatar" />
                            ) : (
                                <div className="no-avatar">
                                    <FiUser color="#FFF" size={100} />
                                </div>
                            )}
                        <button type="button">
                            <FiCamera color="#FFF" size={24} />
                        </button>
                    </div>
                    <h1>{`${name} ${surname}`}</h1>
                    <h4>Geografia</h4>
                </div>
            </div>

            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="name-surname-wrapper">
                            <div className="input-block-wrapper">
                                <Input
                                    name="name"
                                    label="Nome"
                                    register={register({ required: true })}
                                />
                                {errors.name && errors.name.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>

                            <div className="input-block-wrapper">
                                <Input
                                    name="surname"
                                    label="Sobrenome"
                                    register={register({ required: true })}
                                />
                                {errors.surname && errors.surname.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>
                        </div>

                        <div className="email-whatsapp-wrapper">
                            <div className="input-block-wrapper">
                                <Input
                                    name="email"
                                    label="E-mail"
                                    register={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                                />
                                {errors.email && errors.email.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <ErrorMessage message="E-mail inválido!" />
                                )}
                            </div>
                            <div className="input-block-wrapper">
                                <Input
                                    name="whatsapp"
                                    label="Whatsapp"
                                    placeholder="(DDD) xxxxx - xxxx"
                                    register={register({ required: true })}
                                />
                                {errors.whatsapp && errors.whatsapp.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>

                        </div>

                        <div className="textarea-block-wrapper">
                            <TextArea
                                name="bio"
                                label="Biografia"
                                register={register({ required: true })}
                            />
                            {errors.bio && errors.bio.type === "required" && (
                                <ErrorMessage message="Campo obrigatório!" />
                            )}
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className="about-class-wrapper">
                            <div className="input-block-wrapper">
                                <Input
                                    name="subject"
                                    label="Matéria"
                                    register={register({ required: true })}
                                />
                                {errors.subject && errors.subject.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>
                            <div className="input-block-wrapper">
                                <Input
                                    name="costPerHour"
                                    label="Custo da sua hora por aula"
                                    placeholder="R$ "
                                    register={register({ required: true })}
                                />
                                {errors.costPerHour && errors.costPerHour.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>
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
                        <button type="submit" onClick={() => { }} >
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>

        </div>
    )
}

export default TeacherProfile;