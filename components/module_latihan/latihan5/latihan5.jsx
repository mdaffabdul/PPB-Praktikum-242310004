import { ListBook } from "@/constants/list_books";
import { useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCollectioins from "../latihan4/bookcolection";
import Categoriesnav from "../latihan4/categories";
import CTABook from "../latihan4/CTABook";
import Header from "../latihan4/header";
import { color_list, styles } from "../styles/StyleApps";
import SearchBar from "./SearchBar";

export default function HomeScreen() {
  const lastBook = ListBook[ListBook.length - 1];
  const [books, setBooks] = useState(ListBook);
  const [search, setSearch] = useState("");

  const BookDataMemori = useMemo(() => {
    let computedData = [...books];
    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }
    return computedData;
  }, [search, books]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* HEADER */}
      <Header />
      {/* END HEADER */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* MAIN CONTENT */}
        <View style={{ flex: 1 }}>
          <SearchBar value={search} setValue={setSearch} />
          <CTABook book={lastBook} />
          <Categoriesnav />
          <BookCollectioins books={BookDataMemori} />
        </View>
        {/* MAIN CONTENT */}

        {/* FOOTER */}
        <View>
          <Text style={{ color: color_list.green }}>
            &copy; 2026 Febry Damatraseta Fairuz``
          </Text>
        </View>
        {/* END FOOTER */}
      </ScrollView>
    </SafeAreaView>
  );
}
