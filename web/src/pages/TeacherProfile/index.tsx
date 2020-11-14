import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { FiCamera, FiUser, FiXSquare, FiCheck } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";

import "./styles.css";
import warning from "../../assets/images/icons/warning.svg";

import Input from "../../components/Input/index";
import TextArea from "../../components/Textarea/index";
import Select from "../../components/Select/index";
import HeaderBar from "../../components/HeaderBar/index";
import ErrorMessage from "../../components/ErrorMessage/index";

import api from "../../services/api";
import convertMinuteToHourFormated from "../../utils/convertMinuteToHour";

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
    subject: string;
    cost: number;
    scheduleItem: Array<{
        id: number;
        week_day: number;
        from: string;
        to: string;
    }>
}

type ScheduleItem = {
    week_day: number;
    from: number;
    to: number;
}

function TeacherProfile() {

    const params = useParams<UserId>();
    const { register, handleSubmit, setValue, getValues, errors, control } = useForm<UserProfile>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "scheduleItem"
    });

    const [avatar, setAvatar] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [oldAvatar, setOldAvatar] = useState("");
    const [shouldRemoveClassScheduleItems, setShouldRemoveClassScheduleItems] = useState(false);

    const [isChooseProfilePhotoEnabled, setIsChooseProfilePhotoEnabled] = useState(false);

    function setProfileData(name: string, surname: string, avatar: string, email: string, whatsapp: string, bio: string) {
        setValue("name", name);
        setValue("surname", surname);
        setValue("avatar", avatar);
        setValue("email", email);
        setValue("whatsapp", whatsapp);
        setValue("bio", bio);

        setAvatar(avatar)
    }

    function setAboutClassData(subject: string, cost: number) {
        setValue("subject", subject);
        setValue("cost", cost);
    }

    /*
        Load user profile data
    */
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

                setProfileData(name, surname, avatar, email, whatsapp, bio);
            })
            .catch(reject => {
                console.warn(reject)
                alert("Houve algum erro inesperado.")
            })
    }, [params.id])

    /*
        Load classes
    */
    useEffect(() => {

        api.get(`classes/${params.id}`)
            .then(response => {

                const classesData = response.data;

                if (classesData) {
                    const { subject, cost } = classesData[0];
                    setAboutClassData(subject, cost)

                    const scheduleItemsFormated = classesData.map((scheduleItem: ScheduleItem, index: number) => {
                        return {
                            id: index,
                            week_day: scheduleItem.week_day,
                            from: convertMinuteToHourFormated(scheduleItem.from),
                            to: convertMinuteToHourFormated(scheduleItem.to),
                        }
                    });
                    append(scheduleItemsFormated);
                }
            })
            .catch(reject => {

            })
    }, [])

    if (!getValues()) {
        return <p>Loading...</p>
    }

    function handleChangeAvatarImage() {
        if (newAvatar) {
            setOldAvatar(avatar)
            setAvatar(newAvatar);
        }
    }

    function handleRevertChangeAvatarImage() {
        if (oldAvatar) {
            setAvatar(oldAvatar);
        }
    }

    function handleRemoveAllScheduleItensAndClassInformation() {
        remove();
        setAboutClassData("", 0);
        setShouldRemoveClassScheduleItems(true);
    }

    function onSubmit(data: UserProfile) {

        const updateData = {
            name: data.name,
            surname: data.surname,
            bio: data.bio,
            email: data.email,
            whatsapp: data.whatsapp,
            avatar: avatar
        }

        api.put(`users/${params.id}`, updateData)
            .then(response => {
                alert("Dados atualizados com sucesso!")
            })
            .catch(reject => {
                alert("Falha ao atualizar o perfil.")
            });

        if (shouldRemoveClassScheduleItems) {
            api.delete(`classes/${params.id}`)
                .then(response => {
                    alert("Aula removida com sucesso!")
                })
                .catch(reject => {
                    alert("Houve algum erro ao deletar a aula.")
                });
        }
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
                        <button onClick={() => {
                            setIsChooseProfilePhotoEnabled(!isChooseProfilePhotoEnabled);
                        }} type="button">
                            <FiCamera color="#FFF" size={24} />
                        </button>
                    </div>

                    <div className={!isChooseProfilePhotoEnabled ? "" : "active"}>
                        <Input
                            name="image-url"
                            label="Cole o endereço da imagem da sua foto abaixo"
                            placeholder="Digite o endereço da imagem"
                            value={newAvatar}
                            onChange={event => setNewAvatar(event.target.value)}
                        />
                        <button className="confirm-button" type="button" onClick={handleChangeAvatarImage}><FiCheck color="#FFF" size={20} /></button>
                        <button className="revert-button" type="button" onClick={handleRevertChangeAvatarImage}><FiXSquare color="#FFF" size={20} /></button>
                    </div>

                    <h1>{`${getValues("name")} ${getValues("surname")}`}</h1>
                    {getValues("subject") ? <h4>{getValues("subject")}</h4> : <h4></h4>}

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
                                    register={register({ required: false })}
                                    disabled
                                />
                                {errors.subject && errors.subject.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>

                            <div className="input-block-wrapper">
                                <Input
                                    name="cost"
                                    label="Custo da sua hora por aula"
                                    register={register({ required: false })}
                                    disabled
                                />
                                {errors.cost && errors.cost.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        </legend>

                        {fields.map((field, index) => {
                            return (
                                <div key={field.id} className="schedule-item">
                                    <div className="select-block-wrapper">
                                        <Select
                                            name={`scheduleItem[${index}].week_day`}
                                            label="Dia da semana"
                                            defaultOption="Selecione um dia"
                                            register={register({ required: false })}
                                            value={field.week_day}
                                            options={[
                                                { value: "0", label: "Domingo" },
                                                { value: "1", label: "Segunda-feira" },
                                                { value: "2", label: "Terça-feira" },
                                                { value: "3", label: "Quarta-feira" },
                                                { value: "4", label: "Quinta-feira" },
                                                { value: "5", label: "Sexta-feira" },
                                                { value: "6", label: "Sábado" }
                                            ]}
                                            disabled
                                        />
                                    </div>

                                    <div className="input-block-wrapper">
                                        <Input
                                            name={`scheduleItem[${index}].from`}
                                            label="Das"
                                            type="time"
                                            register={register({ required: false })}
                                            value={field.from}
                                            disabled
                                        />
                                    </div>

                                    <div className="input-block-wrapper">
                                        <Input
                                            name={`scheduleItem[${index}].to`}
                                            label="Até"
                                            type="time"
                                            register={register({ required: false })}
                                            value={field.to}
                                            disabled
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        {fields.length > 0 && (
                            <button type="button" onClick={handleRemoveAllScheduleItensAndClassInformation} >Deletar aulas</button>
                        )}

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