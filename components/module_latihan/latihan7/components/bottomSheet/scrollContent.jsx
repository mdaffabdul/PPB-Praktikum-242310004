import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import ListStores from "../listStores";

const ScrollContent = ({ address, stores }) => {
  return (
    <BottomSheetScrollView>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 16 }}>
        Explore Store
      </Text>
      {address && (
        <Text style={{ fontSize: 13, color: "#666", marginHorizontal: 16, marginBottom: 4 }}>
          Location:{" "}
          {(address?.city || address?.name || "-") +
            ", " +
            (address?.subregion || address?.region || "-")}
        </Text>
      )}
      <View style={{ marginTop: 20 }}>
        <ListStores stores={stores} />
      </View>
    </BottomSheetScrollView>
  );
};

export default ScrollContent;