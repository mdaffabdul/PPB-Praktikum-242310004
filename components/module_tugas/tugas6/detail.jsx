import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Cari buku berdasarkan ID parameter
  const book = ListBook.find((book) => book.id === parseInt(id)) || ListBook[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Upper header controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity 
          style={styles.circleBtn} 
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/module_tugas/tugas6");
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

        {/* Synopsis Section */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>SINOPSIS</Text>
          <Text style={styles.synopsisText}>{book.sinopsis}</Text>
        </View>

        {/* Short story preview */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>PRATINJAU CERITA</Text>
          <Text style={styles.synopsisText}>{book.story || "Belum ada pratinjau cerita untuk buku ini."}</Text>
        </View>
      </ScrollView>

      {/* Dynamic bottom action button */}
      <View style={styles.bottomBar}>
        {book.is_free ? (
          <TouchableOpacity style={styles.readBookBtn}>
            <Ionicons name="book-outline" size={18} color="black" style={{ marginRight: 8 }} />
            <Text style={styles.readBookText}>Read Book</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.subscribeBtn}>
            <Ionicons name="card-outline" size={18} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16222b", // Premium dark aesthetic background
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
    marginBottom: 25,
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
    color: "#a0aec0",
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
  synopsisContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
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
    color: "#cbd5e0",
    lineHeight: 22,
    textAlign: "justify",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#16222b",
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
    color: "#16222b",
    fontSize: 16,
    fontWeight: "bold",
  },
  subscribeBtn: {
    backgroundColor: "#d5a248",
    borderRadius: 25,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
