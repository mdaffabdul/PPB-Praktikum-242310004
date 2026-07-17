import { ListBook } from "@/constants/list_books";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LibraryTugas8() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const data = await AsyncStorage.getItem("userData");
      setIsLoggedIn(!!data);
    };
    checkLogin();
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tambahkan data progress membaca simulasi untuk buku-buku
  const libraryBooks = ListBook.map((book, idx) => {
    let progress = 0;
    let status = "Not Started";
    if (idx === 0) {
      progress = 0.75;
      status = "Reading";
    } else if (idx === 1) {
      progress = 1.0;
      status = "Completed";
    } else {
      progress = 0.0;
      status = "Saved";
    }
    return { ...book, progress, status };
  });

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="lock-closed-outline" size={64} color="#94a3b8" />
          <Text style={styles.lockedTitle}>Library Locked</Text>
          <Text style={styles.lockedDesc}>
            Please sign in to access your personal book library and reading progress.
          </Text>
          <TouchableOpacity 
            style={styles.signInBtn}
            onPress={() => router.push("/module_tugas/tugas8/signin")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Library</Text>
        <Text style={styles.headerSubtitle}>Continue reading your saved books</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {libraryBooks.map((book) => (
          <TouchableOpacity 
            key={book.id} 
            style={styles.bookCard}
            onPress={() => router.push(`/module_tugas/tugas8/books/${book.id}`)}
          >
            <Image source={book.img} style={styles.bookImg} resizeMode="cover" />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressText}>
                    {book.status} {book.status === "Reading" && `· ${(book.progress * 100).toFixed(0)}%`}
                  </Text>
                  {book.status === "Completed" && (
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  )}
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${book.progress * 100}%`, backgroundColor: book.status === "Completed" ? "#10b981" : "#49745e" }]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  lockedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#334155",
    marginTop: 16,
    marginBottom: 8,
  },
  lockedDesc: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  signInBtn: {
    backgroundColor: "#49745e",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  signInText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImg: {
    width: 70,
    height: 95,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
  },
  bookDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  bookAuthor: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#cbd5e1",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
