import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import { styles } from "../styles/StyleApps";

export default function SearchBar({ value, setValue }) {
  return (
    <View style={styles.h_container}>
      <View style={style_searchBar.search_container}>
        <Ionicons name="search-outline" size={16} color="gray" />
        <TextInput
          style={style_searchBar.input}
          autoFocus
          placeholder="Search here"
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      </View>
    </View>
  );
}

const style_searchBar = StyleSheet.create({
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
  },
});
