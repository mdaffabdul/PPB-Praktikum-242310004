import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const tugas3_2 = () => {
  const PersonalData = {
    name: "Muhammad Daffa Abdul Mufid",
    isStudent: true,
    placebirth: "Bogor",
    education: {
      university: "IBIK Bogor",
      major: "Informatika",
    },
    nim: 242310004,
    address:
      "Jl. Rangga Gading, No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat",
    email: "daffa@ibik.ac.id",
    phone_number: "081234567890",
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("@/assets/images/android-icon-background.png")}
        style={{ width: "100%", opacity: 0.5 }}
      >
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.header.imgAvatar}
          />
          <Text style={styles.header.title}>Nama: {PersonalData.name}</Text>
          <Text style={styles.header.subtitle}>NIM: {PersonalData.nim}</Text>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Phone</Text>
            <TextInput
              value={PersonalData.phone_number}
              keyboardType="numeric"
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Address</Text>
            <TextInput
              value={PersonalData.address}
              multiline={true}
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Major</Text>
            <TextInput
              value={PersonalData.education.major}
              multiline={true}
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Placebirth</Text>
            <TextInput
              value={PersonalData.placebirth}
              multiline={true}
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Active Student</Text>
            <TextInput
              value={PersonalData.isStudent ? "Yes" : "No"}
              multiline={true}
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <Text style={styles.identity.title}>Email</Text>
            <TextInput
              value={PersonalData.email}
              keyboardType="email-address"
              style={styles.identity.card_input}
            />
          </View>

          <View style={styles.identity.container}>
            <TouchableOpacity style={styles.identity.button}>
              <Text style={styles.identity.button_text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    title: {
      fontSize: 40,
      fontWeight: "bold",
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#9b9d9f",
    },
    imgAvatar: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderWidth: 4,
      padding: 2,
      backgroundColor: "#f2f2f2",
      borderColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      padding: 10,
      alignSelf: "stretch",
    },
    card_input: {
      borderWidth: 1,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 16,
      color: "#000",
    },
    title: {
      fontSize: 16,
      color: "#9b9d9f",
      marginBottom: 5,
    },
    input_text: {
      fontSize: 16,
      padding: 0,
      color: "#000",
    },
    button: {
      backgroundColor: "#0ea6d0",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
    },
    button_text: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  },
});

export default tugas3_2;
