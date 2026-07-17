import { ListBook } from "@/constants/list_books";
import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categoriesnav from "../../module_latihan/latihan4/categories";
import { color_list, styles } from "../../module_latihan/styles/StyleApps";
import { getFilteredBooks } from "../tugas4/FilteredBooks";
import { SearchBar } from "../tugas4/form";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity } from "react-native";

export default function HomeTugas7() {
  const router = useRouter();
  const lastBook = ListBook[ListBook.length - 1];
  const [search, setSearch] = useState("");
  const filteredBooks = getFilteredBooks(search);

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
              style={[styles.btn_read, { backgroundColor: "#3b82f6" }]} 
              onPress={() => router.push(`/module_tugas/tugas7/books/${book.id}`)}
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
          <Text style={{ color: "#3b82f6" }}>
            Total {books.length} Items
          </Text>
        </View>
        <View style={styles.book_grid}>
          {sortedBooks.map((book, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.book_card, styles.shadow]}
              activeOpacity={0.7}
              onPress={() => router.push(`/module_tugas/tugas7/books/${book.id}`)}
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
        <View style={{ flex: 1 }}>
          <SearchBar value={search} setValue={setSearch} />
          <CustomCTABook book={lastBook} />
          <Categoriesnav />
          <CustomBookGrid books={filteredBooks} />
        </View>

        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <Text style={{ color: "#3b82f6" }}>
            &copy; 2026 Febry Damatraseta Fairuz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
