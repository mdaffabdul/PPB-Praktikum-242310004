import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

export default function QRScanner() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Minta izin kamera
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    // Beri info atau redirect
    // QR Code data harus berisi ID buku (misal: "1", "2", atau "3")
    const bookId = parseInt(data.trim());

    if (!isNaN(bookId) && bookId >= 1 && bookId <= 3) {
      Alert.alert(
        "Book Scanned",
        `Redirecting to book ID: ${bookId}`,
        [
          {
            text: "OK",
            onPress: () => {
              setScanned(false);
              router.push(`/module_tugas/tugas7/books/${bookId}`);
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Scan Result",
        `Scanned QR: "${data}" is not a valid book ID (1-3).`,
        [
          {
            text: "Scan Again",
            onPress: () => setScanned(false)
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.overlayText}>Align QR Code within the square</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginVertical: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  scanArea: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: "#3b82f6",
    backgroundColor: "transparent",
    borderRadius: 16,
  },
  overlayText: {
    color: "white",
    fontSize: 14,
    marginTop: 20,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});
