import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { REGISTER_USER } from "../../../services/api";

export default function SignUpTugas8() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validasi input
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Email cannot be empty");
      return;
    }
    // Validasi email basic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }
    if (password !== retypePassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    const payload = {
      email: email.trim(),
      username: username.trim(),
      password: password,
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "Bogor",
        street: "Rangga Gading",
        number: 1,
        zipcode: "16123",
        geolocation: {
          lat: "-6.2",
          long: "106.6",
        },
      },
      phone: "081234567890",
    };

    const results = await REGISTER_USER(payload);

    if (results.message) {
      Alert.alert("Error", "Gagal membuat akun: " + results.message);
      setIsLoading(false);
    } else if (results.data && results.data.id) {
      setIsLoading(false);
      Alert.alert("Success", "Akun berhasil didaftarkan!", [
        {
          text: "Login Now",
          onPress: () => router.replace("/module_tugas/tugas8/profile"),
        },
      ]);
    } else {
      Alert.alert("Error", "Invalid response from server");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="book-outline" size={40} color="white" />
          </View>
          <Text style={styles.appName}>Readly+</Text>
          <Text style={styles.subtitle}>Sign up to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ padding: 4 }}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Retype Password"
              value={retypePassword}
              onChangeText={setRetypePassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.btnSignUp, isLoading && { opacity: 0.7 }]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnSignUpText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/module_tugas/tugas8/profile")}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={{ color: "#49745e", fontWeight: "700" }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 24 },
  scrollContent: { paddingTop: 40, paddingBottom: 20 },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#49745e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  appName: { fontSize: 26, fontWeight: "700", color: "#1a1a1a" },
  subtitle: { fontSize: 14, color: "gray", marginTop: 4 },
  form: {},
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: "#fafafa",
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 48, fontSize: 15, color: "#1a1a1a" },
  btnSignUp: {
    backgroundColor: "#49745e",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnSignUpText: { color: "white", fontWeight: "700", fontSize: 16 },
  loginText: { color: "gray", fontSize: 14 },
});
