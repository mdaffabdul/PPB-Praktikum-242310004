import { ListBook } from "@/constants/list_books";
import { useState, useEffect } from "react";
import { ScrollView, StatusBar, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categoriesnav from "../../module_latihan/latihan4/categories";
import { color_list, styles } from "../../module_latihan/styles/StyleApps";
import { getFilteredBooks } from "../tugas4/FilteredBooks";
import { SearchBar } from "../tugas4/form";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeTugas8() {
  const router = useRouter();
  const lastBook = ListBook[ListBook.length - 1];
  const [search, setSearch] = useState("");
  const filteredBooks = getFilteredBooks(search);
  const [userData, setUserData] = useState(null);

  const checkLoginSession = async () => {
    try {
      const dataString = await AsyncStorage.getItem("userData");
      if (dataString) {
        setUserData(JSON.parse(dataString));
      } else {
        setUserData(null);
      }
    } catch (e) {
      setUserData(null);
    }
  };

  useEffect(() => {
    checkLoginSession();
    // Gunakan interval check agar refresh responsif
    const interval = setInterval(checkLoginSession, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNavigation = (bookId) => {
    if (!userData) {
      Alert.alert(
        "Login Required",
        "Please sign in to read this book",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Sign In", onPress: () => router.push("/module_tugas/tugas8/profile") }
        ]
      );
    } else {
      router.push(`/module_tugas/tugas8/books/${bookId}`);
    }
  };

  const CustomCTABook = ({ book }) => {
    return (
      <View style={[styles.new_com_container, styles.shadow]}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ position: "relative" }}>
            <Image
              source={book.img}
              style={[styles.new_book_img, styles.shadow]}
              resizeMode="cover"
            />
            {!book.is_free && (
              <View style={[styles.circle_premium, styles.shadow]}>
                <AntDesign name="crown" size={18} color="black" />
              </View>
            )}
          </View>

          <View
            style={{
              marginLeft: 15,
              flex: 1,
              flexShrink: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.new_book_title}>{book.title}</Text>
              <Text style={styles.new_book_text}>by {book.author}</Text>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={styles.new_book_text}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {book.sinopsis}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.btn_read} 
              onPress={() => handleBookNavigation(book.id)}
            >
              <Text style={styles.btn_read_text}>Read Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const CustomBookGrid = ({ books }) => {
    const sortedBooks = [...books].sort((a, b) => b.id - a.id);
    return (
      <View style={styles.container_book_collections}>
        <View style={styles.h_container}>
          <Text style={styles.container_book_collections_title}>
            Book Collection
          </Text>
          <Text style={{ color: color_list.green }}>
            Total {books.length} Items
          </Text>
        </View>
        <View style={styles.book_grid}>
          {sortedBooks.map((book, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.book_card, styles.shadow]}
              activeOpacity={0.7}
              onPress={() => handleBookNavigation(book.id)}
            >
              <View style={{ position: "relative" }}>
                <Image
                  source={book.img}
                  style={styles.book_card_img}
                  resizeMode="cover"
                />
                {!book.is_free && (
                  <View style={[styles.circle_premium_small, styles.shadow]}>
                    <AntDesign name="crown" size={18} color="black" />
                  </View>
                )}
              </View>
              <View style={{ padding: 10 }}>
                <Text
                  style={styles.book_card_title}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {book.title}
                </Text>
                <Text style={styles.book_card_author} numberOfLines={1}>
                  {book.author}
                </Text>
                <View style={styles.book_card_footer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="star" size={14} color={color_list.orange} />
                    <Text style={styles.book_card_rating}>{book.rating}</Text>
                  </View>
                  {book.views && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="eye-outline" size={14} color="gray" />
                      <Text style={styles.book_card_views}>{book.views}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Custom Header with dynamic username */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 13, color: "gray", fontWeight: "600" }}>
            Good Morning, 👋
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1e293b", marginTop: 2 }}>
            {userData ? userData.username : "Discover Books"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <SearchBar value={search} setValue={setSearch} />
          <CustomCTABook book={lastBook} />
          <Categoriesnav />
          <CustomBookGrid books={filteredBooks} />
        </View>

        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <Text style={{ color: color_list.green }}>
            &copy; 2026 Febry Damatraseta Fairuz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
