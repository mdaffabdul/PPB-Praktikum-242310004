import React, { useState, useRef, useEffect } from "react";
import { 
  Image, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Alert,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function ProfileTugas7() {
  const [personalData, setPersonalData] = useState({
    name: "Muhammad Daffa Abdul Mufid",
    nim: "242310004",
    university: "IBIK Bogor",
    major: "Informatika",
    email: "daffa@ibik.ac.id",
    phone_number: "081234567890",
    address: "Jl. Rangga Gading, No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat",
  });

  const [avatarUri, setAvatarUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Ambil data diri tersimpan jika ada (bisa kembangkan ke AsyncStorage nanti)
  const handleSave = () => {
    Alert.alert("Success", "Data pribadi berhasil diperbaharui!");
  };

  // Dialog opsi ganti avatar
  const showImagePickerOptions = () => {
    Alert.alert(
      "Change Avatar",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: handleOpenCamera,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImageFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Kamera: Membuka modal CameraView
  const handleOpenCamera = async () => {
    if (!cameraPermission) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos");
        return;
      }
    } else if (!cameraPermission.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos");
        return;
      }
    }
    setIsCameraVisible(true);
  };

  // Kamera: Ambil foto
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  // Galeri: Memilih foto
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required to select photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Avatar container */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={showImagePickerOptions} activeOpacity={0.8}>
          <View style={styles.avatarOutline}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.imgAvatar} />
            ) : (
              <Image source={require("@/assets/images/avatar.png")} style={styles.imgAvatar} />
            )}
            <View style={styles.cameraIconOverlay}>
              <FontAwesome name="camera" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.changeLabel}>Tap to change avatar</Text>
        </TouchableOpacity>

        {/* Data Diri Form */}
        <View style={styles.infoSection}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              value={personalData.name}
              onChangeText={(text) => setPersonalData({ ...personalData, name: text })}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>NIM / Student ID</Text>
            <TextInput
              value={personalData.nim}
              onChangeText={(text) => setPersonalData({ ...personalData, nim: text })}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>University</Text>
            <TextInput
              value={personalData.university}
              onChangeText={(text) => setPersonalData({ ...personalData, university: text })}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Major</Text>
            <TextInput
              value={personalData.major}
              onChangeText={(text) => setPersonalData({ ...personalData, major: text })}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              value={personalData.email}
              onChangeText={(text) => setPersonalData({ ...personalData, email: text })}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              value={personalData.phone_number}
              onChangeText={(text) => setPersonalData({ ...personalData, phone_number: text })}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              value={personalData.address}
              onChangeText={(text) => setPersonalData({ ...personalData, address: text })}
              multiline
              style={[styles.input, { height: 75, textAlignVertical: "top" }]}
            />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fullscreen Camera Modal */}
      <Modal visible={isCameraVisible} animationType="slide" onRequestClose={() => setIsCameraVisible(false)}>
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing="front" mode="picture" ref={cameraRef}>
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsCameraVisible(false)}>
                <Ionicons name="close-circle-outline" size={32} color="white" />
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                <View style={styles.captureBtnInner} />
              </TouchableOpacity>
              
              <View style={{ width: 80 }} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 24,
    alignItems: "center",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarOutline: {
    position: "relative",
    borderRadius: 65,
    padding: 3,
    backgroundColor: "#e2e8f0",
  },
  imgAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#cbd5e0",
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 4,
    backgroundColor: "#3b82f6",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  changeLabel: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "600",
    marginTop: 8,
  },
  infoSection: {
    width: "100%",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1e293b",
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  cancelBtn: {
    alignItems: "center",
    width: 80,
  },
  btnText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureBtnInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "white",
  },
});
