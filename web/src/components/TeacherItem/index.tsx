import React, { useState, useEffect } from "react";

import "./styles.css";
import { FiUser } from "react-icons/fi";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

import convertDayOfWeekFromNumberToString from "../../utils/returnDayOfWeek";
import convertMinuteToHour from "../../utils/convertMinuteToHour";

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    user_id: number;
    whatsapp: string;
    scheduleItems: Array<{
        week_day: number;
        from: number;
        to: number;
    }>
}

interface TeacherItemProps {
    teacher: Teacher;
}

interface ScheduleItemProps {
    week_day: number;
    from: number | null;
    to: number | null;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    const [scheduleItemCards, setScheduleItemCards] = useState<Array<ScheduleItemProps>>([]);

    function createNewConnection() {
        api.post("connections/entries", {
            user_id: teacher.id
        })
    }

    useEffect(() => {
        const weekDaysCard = [];
        const auxArr: ScheduleItemProps[] = []

        for (let i = 0; i < teacher.scheduleItems.length; i++) {
            auxArr.push(teacher.scheduleItems[i])
        }

        for (let i = 0; i < 7; i++) {
            let firstElement = auxArr[0];
            if (firstElement) {
                if (firstElement.week_day === i) {
                    weekDaysCard.push(firstElement);
                    auxArr.shift();
                } else {
                    weekDaysCard.push({ week_day: i, from: null, to: null })
                }
            } else {
                weekDaysCard.push({ week_day: i, from: null, to: null })
            }
        }
        setScheduleItemCards(weekDaysCard);
    }, []);

    return (
        <article className="teacher-item">
            <header>
                {teacher.avatar
                    ? (
                        <img alt={teacher.name} src={teacher.avatar}></img>
                    )
                    : (
                        <div className="no-avatar">
                            <FiUser color="#aaaa" size={35} />
                        </div>
                    )}
                <div className="username-wrapper">
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>

            <div className="scheduleItem-wrapper">
                {scheduleItemCards.map((item) => {
                    return (item.from !== null && item.to !== null)
                        ? (
                            <div key={item.week_day} className="scheduleItem-block">
                                <span>Dia</span>
                                <b>{convertDayOfWeekFromNumberToString(item.week_day)}</b>
                                <span>Horário</span>
                                <b>{`${convertMinuteToHour(item.from)}-${convertMinuteToHour(item.to)}`}</b>
                            </div>
                        )
                        : (
                            <div key={item.week_day} className="scheduleItem-block-empty">
                                <span>Dia</span>
                                <b>{convertDayOfWeekFromNumberToString(item.week_day)}</b>
                                <span>Horário</span>
                                <b>----:----</b>
                            </div>
                        )
                })}
            </div>

            <footer>
                <p>
                    Preço/hora:
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img alt="Whatsapp" src={whatsappIcon} />
                Entrar em contato
            </a>
            </footer>
        </article>

    )
}

export default TeacherItem;