import { ListBook } from "@/constants/list_books";
import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCollectioins from "../../module_latihan/latihan4/bookcolection";
import Categoriesnav from "../../module_latihan/latihan4/categories";
import CTABook from "../../module_latihan/latihan4/CTABook";
import Header from "../../module_latihan/latihan4/header";
import { color_list, styles } from "../../module_latihan/styles/StyleApps";
import { getFilteredBooks } from "./FilteredBooks";
import { SearchBar } from "./form";

export default function HomeScreen() {
  const lastBook = ListBook[ListBook.length - 1];
  const [search, setSearch] = useState("");
  const filteredBooks = getFilteredBooks(search);

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
          <BookCollectioins books={filteredBooks} />
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
