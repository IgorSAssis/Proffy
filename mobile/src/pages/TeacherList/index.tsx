import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, } from "react-native";
import { TextInput, BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';

import api from "../../services/api";

import styles from "./styles";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [subject, setSubject] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get("classes", {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        })
        console.log(response.data)
        setTeachers(response.data)
        setIsFiltersVisible(false)
    }

    function loadFavorites() {
        AsyncStorage.getItem("favorites").then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    )

    return (
        <View>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton>
                        <Feather
                            name="filter"
                            size={20}
                            color="#FFF"
                            onPress={handleToggleFiltersVisible}
                        />
                    </BorderlessButton>
                )}>

                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Selecione uma matéria"
                            placeholderTextColor="#c1bcc1"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={weekDay}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Dias"
                                    placeholderTextColor="#c1bcc1"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Horários"
                                    placeholderTextColor="#c1bcc1"
                                />
                            </View>
                        </View>
                        <RectButton
                            onPress={handleFiltersSubmit}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;