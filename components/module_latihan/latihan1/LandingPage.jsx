import react from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LandingPage() {
    return (
        <View style={styles.container}>
            <Text>Landing Page</Text>
            <Text>Pertemuan 1 Lab. Pemrograman Perangkat Bergerak</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",

    },
})