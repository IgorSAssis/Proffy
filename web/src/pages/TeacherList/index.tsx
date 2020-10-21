import React, { useState, FormEvent } from "react";
import api from "../../services/api";

import "./styles.css";

import PageHeader from "../../components/PageHeader/index";
import HeaderBar from "../../components/HeaderBar/index"
import TeacherItem, { Teacher } from "../../components/TeacherItem/index"
import Input from "../../components/Input";
import Select from "../../components/Select";

function TeacherList() {

    const [subject, setSubject] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [time, setTime] = useState("");
    const [teachers, setTeachers] = useState([]);

    async function searchTeachers(event: FormEvent) {
        event.preventDefault();

        const response = await api.get("classes", {
            params: {
                subject,
                week_day: dayOfWeek,
                time
            }
        })
        console.log(response.data)
        setTeachers(response.data);
    }

    return (

        <div id="page-teacher-list" className="container">
            <HeaderBar currentPage="Estudar" />
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                        defaultOption="Selecione uma matéria"
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
                    <Select
                        name="day-of-week"
                        label="Dia da semana"
                        value={dayOfWeek}
                        onChange={event => setDayOfWeek(event.target.value)}
                        defaultOption="Selecione um dia"
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
                        name="time"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.length > 0
                    ? teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />
                    }) :
                    (
                        <p>Nenhum professor encontrado com a sua pesquisa.</p>
                    ) }

            </main>
        </div>
    )
}

export default TeacherList;