import { Image, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTugas6() {
  const PersonalData = {
    name: "Muhammad Daffa Abdul Mufid",
    isStudent: true,
    placebirth: "Bogor",
    education: {
      university: "IBIK Bogor",
      major: "Informatika",
    },
    nim: 242310004,
    address:
      "Jl. Rangga Gading, No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat",
    email: "daffa@ibik.ac.id",
    phone_number: "081234567890",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.imgAvatar}
          />
          <Text style={styles.title}>{PersonalData.name}</Text>
          <Text style={styles.subtitle}>NIM: {PersonalData.nim}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>University</Text>
            <TextInput
              value={PersonalData.education.university}
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Major</Text>
            <TextInput
              value={PersonalData.education.major}
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              value={PersonalData.email}
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              value={PersonalData.phone_number}
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              value={PersonalData.address}
              editable={false}
              multiline
              style={[styles.input, { height: 70, textAlignVertical: "top" }]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 24,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imgAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#49745e",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#718096",
    marginTop: 4,
  },
  infoSection: {
    width: "100%",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#49745e",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#f7fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#4a5568",
  },
});
