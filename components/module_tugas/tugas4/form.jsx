import { TextInput, View } from "react-native";
import { styles } from "./style";

const SearchBar = ({ value, setValue }) => {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search item..."
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export { SearchBar };