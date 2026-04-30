import { useMemo } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(ListBook);

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
      <SearchBar value={search} setValue={setSearch} />
      <ScrollView style={{ flex: 1 }}>
        <BookCollectioins books={BookDataMemori} />
      </ScrollView>
    </SafeAreaView>
  );
}
