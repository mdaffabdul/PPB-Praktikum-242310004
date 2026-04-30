import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Quiz2() {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [institusi, setInstitusi] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatar}
          />
        </View>

        {/* FORM CONTAINER */}
        <View style={styles.formContainer}>
          {/* NAMA */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Nama:</Text>
            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              placeholder="Enter name"
            />
          </View>

          {/* NIP */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>NIP:</Text>
            <TextInput
              style={styles.input}
              value={nip}
              onChangeText={setNip}
              placeholder="Enter NIP"
            />
          </View>

          {/* JABATAN */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Jabatan:</Text>
            <TextInput
              style={styles.input}
              value={jabatan}
              onChangeText={setJabatan}
              placeholder="Enter position"
            />
          </View>

          {/* INSTITUSI */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Institusi:</Text>
            <TextInput
              style={styles.input}
              value={institusi}
              onChangeText={setInstitusi}
              placeholder="Enter institution"
            />
          </View>
        </View>

        {/* Output CONTAINER */}
        <View style={styles.formContainer}>
          {/* NAMA */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.input}>{nama}</Text>
          </View>

          {/* NIP */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>NIP:</Text>
            <Text style={styles.input}>{nip}</Text>
          </View>

          {/* JABATAN */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Jabatan:</Text>
            <Text style={styles.input}>{jabatan}</Text>
          </View>

          {/* INSTITUSI */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Institusi:</Text>
            <Text style={styles.input}>{institusi}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#333",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    width: 80,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#f8f9fa",
  },
});
