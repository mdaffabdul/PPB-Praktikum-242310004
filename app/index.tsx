import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Landing Page</Text>
      <Link href={"/module_tugas/tugas6"} push asChild>
        <Button title="Get Started" />
      </Link>
    </View>
  );
}
// export { default } from "./module_latihan/latihan7/latihan7";
