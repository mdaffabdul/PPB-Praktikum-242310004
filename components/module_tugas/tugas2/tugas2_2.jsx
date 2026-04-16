import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Praktikum2 = () => {
  const dataDiri = {
    nama: "Muhammad Daffa Abdul Mufid",
    beratBadan: 87,
    tinggiBadan: 175,
  };

  const porsiMakanHarian = [
    { id: 1, nama: "Nasi Padang", waktuMakan: "Sarapan", kalori: 200 },
    { id: 2, nama: "Mie Acil", waktuMakan: "Makan Siang", kalori: 120 },
    { id: 3, nama: "Bubur Ketan", waktuMakan: "Makan Malam", kalori: 180 },
    { id: 4, nama: "Tahu Bulat", waktuMakan: "Camilan", kalori: 100 },
  ];

  const hitungTotal = () => {
    let total = 0;

    porsiMakanHarian.forEach((item) => {
      total += item.kalori;
    });

    return total;
  };

  const koversiTinggi = () => {
    let konversi = 0;

    konversi = dataDiri.tinggiBadan / 100;

    return konversi;
  };

  const BMI = () => {
    let bmi = 0;

    bmi = dataDiri.beratBadan / (koversiTinggi() * koversiTinggi());

    return bmi;
  };

  const status = () => {
    let status = "";

    if (BMI() < 18.5) {
      status = "Kurus";
    } else if (BMI() <= 22.9) {
      status = "Ideal";
    } else {
      status = "Berlebih";
    }

    return status;
  };

  const kaloriHarian = () => {
    let kaloriHarian = "";

    if (hitungTotal() < 2000) {
      kaloriHarian = "Kurang";
    } else if (hitungTotal() <= 2500) {
      kaloriHarian = "Cukup";
    } else {
      kaloriHarian = "Berlebih";
    }

    return kaloriHarian;
  };

  const kesimpulan = () => {
    const s = status();
    const k = kaloriHarian();

    if (s === "Ideal" && k === "Cukup") {
      return "Berat badan sudah ideal dan asupan kalori sesuai";
    } else if (s === "Berlebih" && k === "Berlebih") {
      return "Berat badan berlebih dan asupan kalori terlalu tinggi. Kurangi porsi makan!";
    } else if (s === "Kurus" && k === "Kurang") {
      return "Asupan kalori sangat kurang untuk berat badanmu. Coba tambah porsi makan bernutrisi.";
    } else if (s === "Berlebih" && k === "Cukup") {
      return "Berat badanmu berlebih, meskipun asupan hari ini cukup. Pertimbangkan untuk olahraga.";
    } else {
      return "Tetap pantau pola makan dan kondisi kesehatanmu setiap hari.";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluasi Berat Badan Ideal</Text>

      <Text style={styles.title}>Pasien</Text>
      <Text>Nama: {dataDiri.nama}</Text>
      <Text>Berat Badan: {dataDiri.beratBadan} kg</Text>
      <Text>Tinggi Badan: {dataDiri.tinggiBadan} cm</Text>

      <Text style={styles.title}>Porsi Makan Harian</Text>
      {porsiMakanHarian.map((MakanHarian) => (
        <Text key={MakanHarian.id}>
          {MakanHarian.waktuMakan} - {MakanHarian.kalori}
        </Text>
      ))}

      <Text>Total Kalori: {hitungTotal()}</Text>

      <Text style={styles.title}>Hasil Perhitungan</Text>
      <Text>BMI: {BMI().toFixed(2)}</Text>
      <Text>Status BMI: {status()}</Text>
      <Text>Status Kalori: {kaloriHarian()}</Text>

      <Text style={styles.title}>{kesimpulan()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "center",
    textAlign: "left",
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Praktikum2;
