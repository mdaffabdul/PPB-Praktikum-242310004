import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AUTH_USER } from "../../services/api";

export default function SignIn() {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    // ── Validasi ──────────────────────────────────────────────
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
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

    setIsLoading(true);

    // ── Request ke API ────────────────────────────────────────
    const results = await AUTH_USER({ username, password });
    console.log("Login response:", results);

    if (results.message) {
      Alert.alert("Error", results.message);
      setIsLoading(false);
      return;
    } else if (results.data && results.data.token) {
      // ── Simpan ke AsyncStorage ────────────────────────────
      try {
        const userData = {
          username: username,
          token: results.data.token,
          loginTime: new Date().toISOString(),
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem("authToken", results.data.token);

        setIsLoading(false);

        Alert.alert("Success", `Welcome back, ${username}!`, [
          {
            text: "OK",
            onPress: () => router.replace("/main-apps"),
          },
        ]);
      } catch (error) {
        console.error("Error saving user data:", error);
        Alert.alert("Error", "Failed to save login data");
        setIsLoading(false);
      }
    } else {
      Alert.alert("Error", "Invalid response from server");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons name="book-outline" size={40} color="white" />
        </View>
        <Text style={styles.appName}>Readly+</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Username */}
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

        {/* Password */}
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

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Tombol Sign In */}
        <TouchableOpacity
          style={[styles.btnSignIn, isLoading && { opacity: 0.7 }]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnSignInText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Link Sign Up */}
        <TouchableOpacity
          onPress={() => router.push("/main-apps/signup")}
          style={{ marginTop: 20, alignItems: "center" }}
        >
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={{ color: "#49745e", fontWeight: "700" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 24 },
  logoContainer: { alignItems: "center", marginTop: 40, marginBottom: 40 },
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
  form: { flex: 1 },
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
  forgotText: {
    textAlign: "right",
    color: "gray",
    fontSize: 13,
    marginBottom: 20,
  },
  btnSignIn: {
    backgroundColor: "#49745e",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSignInText: { color: "white", fontWeight: "700", fontSize: 16 },
  signupText: { color: "gray", fontSize: 14 },
});
