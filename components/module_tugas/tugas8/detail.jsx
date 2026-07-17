import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookDetailAudio8() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cari buku berdasarkan ID parameter
  const book = ListBook.find((book) => book.id === parseInt(id)) || ListBook[0];

  // Speech State Management
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Authentication Guard Check
  useEffect(() => {
    const checkAuth = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (!data) {
        setIsAuthenticated(false);
        Alert.alert(
          "Login Required",
          "You must log in to view book details.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/module_tugas/tugas8/profile")
            }
          ]
        );
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    return () => {
      Speech.stop();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      Speech.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      const textToRead = `${book.title}. written by ${book.author}. Synopsis: ${book.sinopsis}`;
      
      setIsPlaying(true);
      setIsPaused(false);

      Speech.speak(textToRead, {
        language: "en-US",
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      });
    }
  };

  const handlePause = () => {
    Speech.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    Speech.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Checking authorization...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Upper header controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity 
          style={styles.circleBtn} 
          onPress={() => {
            Speech.stop();
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/module_tugas/tugas8");
            }
          }}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>

        <View style={styles.rightHeaderControls}>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="heart-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="share-social-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Book cover area */}
        <View style={styles.coverWrapper}>
          <Image source={book.img} style={styles.bookCover} resizeMode="cover" />
        </View>

        {/* Book Title & Author */}
        <View style={styles.metaContainer}>
          <Text style={styles.bookTitle}>{book.title.toUpperCase()}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          
          {/* Rating */}
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={16} color="#e5a93b" />
            <Text style={styles.ratingText}> {book.rating}/5.0</Text>
          </View>
        </View>

        {/* Audio Player Controls */}
        <View style={styles.audioControlsContainer}>
          <Text style={styles.audioTitle}>🔊 AUDIOBOOK CONTROLS</Text>
          
          {isPlaying && (
            <Text style={styles.audioStatusActive}>Playing audio book...</Text>
          )}
          {isPaused && (
            <Text style={styles.audioStatusPaused}>Audio book paused</Text>
          )}
          {!isPlaying && !isPaused && (
            <Text style={styles.audioStatusIdle}>Ready to read aloud</Text>
          )}

          <View style={styles.audioButtonRow}>
            {isPlaying ? (
              <TouchableOpacity style={[styles.controlBtn, styles.pauseBtn]} onPress={handlePause}>
                <Ionicons name="pause" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.controlBtn, styles.playBtn]} onPress={handlePlay}>
                <Ionicons name="play" size={24} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.controlBtn, styles.stopBtn]} 
              onPress={handleStop}
              disabled={!isPlaying && !isPaused}
            >
              <Ionicons name="square" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Synopsis Section */}
        <View style={[styles.synopsisContainer, isPlaying && styles.highlightedSection]}>
          <Text style={styles.sectionTitle}>SINOPSIS</Text>
          <Text style={styles.synopsisText}>{book.sinopsis}</Text>
        </View>

        {/* Short story preview */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>PRATINJAU CERITA</Text>
          <Text style={styles.synopsisText}>{book.story || "Belum ada pratinjau cerita untuk buku ini."}</Text>
        </View>
      </ScrollView>

      {/* Dynamic bottom action button / Premium subscribe modal */}
      {!book.is_free ? (
        <View style={styles.premiumCardContainer}>
          <Text style={styles.premiumCardTitle}>Subscribe to Read</Text>
          <Text style={styles.premiumCardSub}>{book.title}</Text>
          <Text style={styles.premiumDesc}>
            Subscribe to unlock this premium book and access thousands of other titles.
          </Text>
          <Text style={styles.premiumPrice}>IDR 35.000/month</Text>
          <Text style={styles.premiumPriceSub}>Cancel anytime</Text>
          
          <TouchableOpacity style={styles.subscribePremiumBtn}>
            <Text style={styles.subscribePremiumText}>Subscribe Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.goBackBtn}
            onPress={() => {
              Speech.stop();
              router.back();
            }}
          >
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.readBookBtn}>
            <Ionicons name="book-outline" size={18} color="black" style={{ marginRight: 8 }} />
            <Text style={styles.readBookText}>Read Book</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  rightHeaderControls: {
    flexDirection: "row",
    gap: 10,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  coverWrapper: {
    alignItems: "center",
    marginBottom: 25,
  },
  bookCover: {
    width: 180,
    height: 240,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  metaContainer: {
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 14,
    color: "#e5a93b",
    fontWeight: "600",
  },
  audioControlsContainer: {
    backgroundColor: "#1f2937",
    marginHorizontal: 25,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  audioTitle: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  audioStatusActive: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  audioStatusPaused: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  audioStatusIdle: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 16,
  },
  audioButtonRow: {
    flexDirection: "row",
    gap: 16,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    backgroundColor: "#49745e",
  },
  pauseBtn: {
    backgroundColor: "#f59e0b",
  },
  stopBtn: {
    backgroundColor: "#ef4444",
  },
  synopsisContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 10,
  },
  highlightedSection: {
    backgroundColor: "rgba(16, 185, 129, 0.05)",
    borderLeftWidth: 3,
    borderLeftColor: "#10b981",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1,
    marginBottom: 10,
  },
  synopsisText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 22,
    textAlign: "justify",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  readBookBtn: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  readBookText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Premium Card Layout Styling
  premiumCardContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  premiumCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  premiumCardSub: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "600",
    marginBottom: 16,
  },
  premiumDesc: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  premiumPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d97706",
    marginBottom: 2,
  },
  premiumPriceSub: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 20,
  },
  subscribePremiumBtn: {
    backgroundColor: "#eab308",
    width: "100%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  subscribePremiumText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  goBackBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  goBackText: {
    color: "#4b5563",
    fontSize: 16,
    fontWeight: "600",
  },
});
