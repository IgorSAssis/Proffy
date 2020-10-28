import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi"
import { useForm } from "react-hook-form";

import PageHeader from "../../components/PageHeader/index";
import Input from "../../components/Input/index";
import Textarea from "../../components/Textarea/index";
import Select from "../../components/Select/index";
import HeaderBar from "../../components/HeaderBar/index"

import "./styles.css";
import warnIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

interface UserId {
    id: string;
}

function TeacherForm() {

    const history = useHistory();
    const params = useParams<UserId>();

    const [scheduleItems, setScheduleItem] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    useEffect(() => {
        api.get(`users/${params.id}`)
            .then(response => {
                const { name,
                    surname,
                    whatsapp,
                    bio,
                    avatar } = response.data;

                setName(name);
                setSurname(surname);
                setAvatar(avatar);
                setWhatsapp(whatsapp);
                setBio(bio)
            })
            .catch(reject => {
                console.warn(reject)
                alert("Houve algum erro inesperado.")
            })
    }, [params.id])

    function addNewScheduleItem() {
        setScheduleItem([
            ...scheduleItems,
            { week_day: 0, from: "", to: "" }
        ])
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post("classes", {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
            .then(() => {
                alert("Cadastro realizado com sucesso!");
                history.push("/");
            })
            .catch(() => {
                alert("Erro no cadastro.")
            })
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

        <div id="page-teacher-form" className="container">

            <HeaderBar currentPage="Dar aulas" />
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
                icon="rocket"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <div className="teacher-form-data-wrapper">
                            <div className="teacher-data-wrapper">
                                {avatar
                                    ? (
                                        <img src={avatar} alt="Teacher avatar" />
                                    ) : (
                                        <div className="no-avatar">
                                            <FiUser color="#FFF" size={35} />
                                        </div>
                                    )}
                                <strong>{`${name} ${surname}`}</strong>
                            </div>
                            <Input
                                name="whatsapp"
                                label="WhatsApp"
                                value={whatsapp}
                                onChange={(event) => { setWhatsapp(event.target.value) }}
                            />
                        </div>
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(event) => { setBio(event.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <div className="teacher-form-about-class-wrapper">
                            <Select
                                name="subject"
                                label="Matéria"
                                defaultOption="Selecione uma matéria"
                                value={subject}
                                onChange={(event) => { setSubject(event.target.value) }}
                                options={[
                                    { value: "Artes", label: "Artes" },
                                    { value: "Biologia", label: "Biologia" },
                                    { value: "Química", label: "Química" },
                                    { value: "Educação física", label: "Educação física" },
                                    { value: "Matemática", label: "Matemática" },
                                    { value: "Português", label: "Português" },
                                    { value: "História", label: "História" },
                                    { value: "Geografia", label: "Geografia" }
                                ]}
                            />
                            <Input
                                name="cost"
                                label="Custo da sua hora por aula"
                                value={cost}
                                onChange={(event) => { setCost(event.target.value) }}
                                placeholder="R$ "
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
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
                            <img alt="Aviso importante" src={warnIcon} />
                        Importante! <br />
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

export default TeacherForm;