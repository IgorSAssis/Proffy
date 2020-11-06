import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi"
import { useForm, useFieldArray } from "react-hook-form";

import PageHeader from "../../components/PageHeader/index";
import Input from "../../components/Input/index";
import Textarea from "../../components/Textarea/index";
import Select from "../../components/Select/index";
import HeaderBar from "../../components/HeaderBar/index"
import ErrorMessage from "../../components/ErrorMessage/index"

import "./styles.css";
import warnIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

interface UserId {
    id: string;
}

type TeacherFormProps = {
    subject: string;
    cost: string;
    scheduleItem: Array<{
        id: number;
        week_day: number;
        from: string;
        to: string;
    }>
}

function TeacherForm() {

    const history = useHistory();
    const params = useParams<UserId>();
    const { register, control, handleSubmit, errors } = useForm<TeacherFormProps>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "scheduleItems"
    });

    const [scheduleItems, setScheduleItem] = useState([
        { order: 0, week_day: 0, from: "", to: "" }
    ]);
    const [scheduleItemId, setScheduleItemId] = useState(0);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    /*
        Load usern profile data
    */
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
    }, [params.id]);

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

    function onSubmit(data: TeacherFormProps) {
        console.log(data)

        const scheduleItems = data.scheduleItem.map((scheduleItem) => {
            return {
                week_day: Number(scheduleItem.week_day),
                from: scheduleItem.from,
                to: scheduleItem.to
            }
        })

        api.post("classes", {
            user_id: params.id,
            subject: data.subject,
            cost: Number(data.cost),
            schedule: scheduleItems
        })
        .then(response => {
            alert("Cadastro salvo com sucesso!")
        })
        .catch(reject => {
            alert("Houve algum erro!")
        })
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                disabled
                            />
                        </div>
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(event) => { setBio(event.target.value) }}
                            disabled
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <div className="teacher-form-about-class-wrapper">

                            <div className="select-block-wrapper">
                                <Select
                                    name="subject"
                                    label="Matéria"
                                    defaultOption="Selecione uma matéria"
                                    register={register({ required: true })}
                                    aria-invalid={errors.subject ? "true" : "false"}
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
                                {errors.subject && errors.subject.type === "required" && (
                                    <ErrorMessage message="Campo obrigatório!" />
                                )}
                            </div>

                            <div className="input-block-wrapper">
                                <Input
                                    name="cost"
                                    label="Custo da sua hora por aula"
                                    register={register({ required: true })}
                                    placeholder="R$ "
                                    type="number"
                                    aria-invalid={errors.cost ? "true" : "false"}
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
                        <button type="button" onClick={() => {
                                append({ id: scheduleItemId, week_day: 0, from: 0, to: 0 })
                                setScheduleItemId(scheduleItemId + 1);
                            }}>
                                + Novo horário
                            </button>
                        </legend>
                        {fields.map((field, index) => {
                            return (
                                <div key={field.id} className="schedule-item">
                                    <div className="select-block-wrapper">
                                        <Select
                                            name={`scheduleItem[${index}].week_day`}
                                            label="Dia da semana"
                                            defaultOption={field.week_day}
                                            register={register({ required: true })}
                                            aria-invalid={(errors.scheduleItem !== undefined && errors.scheduleItem[index]?.week_day) ? "true" : "false"}
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
                                        {
                                            errors.scheduleItem !== undefined &&
                                            errors.scheduleItem[index]?.week_day &&
                                            errors.scheduleItem[index]?.week_day?.type === "required" &&
                                            (
                                                <ErrorMessage message="Selecione um dia da semana!" />
                                            )
                                        }
                                    </div>
                                    <div className="input-block-wrapper">
                                        <Input
                                            name={`scheduleItem[${index}].from`}
                                            label="Das"
                                            type="time"
                                            defaultValue={field.from}
                                            register={register({ required: true })}
                                            aria-invalid={errors.scheduleItem !== undefined && errors.scheduleItem[index]?.from ? "true" : "false"}
                                        />
                                        {
                                            errors.scheduleItem !== undefined &&
                                            errors.scheduleItem[index]?.from &&
                                            errors.scheduleItem[index]?.from?.type === "required" &&
                                            (
                                                <ErrorMessage message="Defina um horário!" />
                                            )
                                        }
                                    </div>

                                    <div className="input-block-wrapper">
                                        <Input
                                            name={`scheduleItem[${index}].to`}
                                            label="Até"
                                            type="time"
                                            defaultValue={field.to}
                                            register={register({ required: true })}
                                            aria-invalid={errors.scheduleItem !== undefined && errors.scheduleItem[index]?.to ? "true" : "false"}
                                        />
                                        {
                                            errors.scheduleItem !== undefined &&
                                            errors.scheduleItem[index]?.to &&
                                            errors.scheduleItem[index]?.to?.type === "required" &&
                                            (
                                                <ErrorMessage message="Defina um horário!" />
                                            )
                                        }
                                    </div>

                                    <button onClick={() => remove(index)} type="button">Excluir horário</button>
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