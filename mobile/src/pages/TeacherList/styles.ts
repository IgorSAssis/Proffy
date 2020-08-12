import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F7"
    },

    teacherList: {
        marginTop: -40
    },

    searchForm: {
        marginBottom: 20
    },

    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputBlock: {
        width: "48%"
    },

    label: {
        color: "#d4c2ff",
        fontFamily: "Poppins_400Regular"
    },

    input: {
        height: 54,
        backgroundColor: "#FFF",
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 36,
        marginTop: 4,
        marginBottom: 12
    },

    submitButton: {
        backgroundColor: "#04d361",
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    submitButtonText: {
        color: "#FFF",
        fontFamily: "Archivo_700Bold",
        fontSize: 16,
        marginLeft: 16
    }
})

export default styles;