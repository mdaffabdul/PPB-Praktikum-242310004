import { TextInput, View } from "react-native";

export default function InputField({
  value,
  setValue,
  placeholder = "Enter text",
  keyboardType = "default",
}) {
  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}

// const inputStyles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: "#e9ecef",
//   },
//   input: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: "#333",
//   },
// });
