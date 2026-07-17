import React, { useState, useEffect } from "react";
import { 
  Image, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileTugas8() {
  const router = useRouter();
  const [username, setUsername] = useState("mor_2314");
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  
  // Data detail profil untuk diedit
  const [personalData, setPersonalData] = useState({
    name: "Febri Damatraseta Fairuz",
    nim: "242310004",
    university: "IBIK Bogor",
    major: "Informatika",
    email: "febri@ibik.ac.id",
    phone_number: "081234567890",
    address: "Jl. Rangga Gading, No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat",
  });

  const checkLoginSession = async () => {
    const dataString = await AsyncStorage.getItem("userData");
    if (dataString) {
      const data = JSON.parse(dataString);
      setUsername(data.username);
    }
  };

  useEffect(() => {
    checkLoginSession();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("userData");
            Alert.alert("Success", "You have been signed out successfully", [
              {
                text: "OK",
                onPress: () => router.replace("/module_tugas/tugas8")
              }
            ]);
          }
        }
      ]
    );
  };

  const handleSaveProfile = () => {
    Alert.alert("Success", "Profile data successfully updated!");
    setIsEditProfileVisible(false);
  };

  // Item List untuk Preferences
  const PreferenceItem = ({ icon, title }) => (
    <TouchableOpacity style={styles.prefItem}>
      <View style={styles.prefItemLeft}>
        <Ionicons name={icon} size={20} color="#475569" style={styles.prefIcon} />
        <Text style={styles.prefText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Profile Card (Gambar 8.6) */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image source={require("@/assets/images/avatar.png")} style={styles.imgAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{personalData.name}</Text>
              <View style={styles.badgeRow}>
                <Ionicons name="shield-checkmark" size={14} color="#49745e" />
                <Text style={styles.profileRole}>Basic Member</Text>
              </View>
            </View>
          </View>

          {/* Action buttons under avatar row */}
          <View style={styles.actionButtonRow}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => setIsEditProfileVisible(true)}
            >
              <Ionicons name="person-outline" size={16} color="#475569" />
              <Text style={styles.actionBtnText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => router.push("/module_tugas/tugas8/scanner")}
            >
              <Ionicons name="qr-code-outline" size={16} color="#475569" />
              <Text style={styles.actionBtnText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section My Rewards (Gambar 8.6) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>My Rewards</Text>
          <View style={styles.rewardsCard}>
            <View style={styles.rewardsHeader}>
              <View style={styles.rewardsTitleRow}>
                <FontAwesome name="crown" size={16} color="#eab308" />
                <Text style={styles.rewardsTitle}>Reward Points</Text>
              </View>
              <MaterialCommunityIcons name="cards-playing-outline" size={24} color="#eab308" />
            </View>
            
            <Text style={styles.pointsText}>
              1,250 <Text style={styles.pointsSubText}>pts</Text>
            </Text>

            <View style={styles.divider} />

            <View style={styles.rewardsActionRow}>
              <TouchableOpacity style={styles.rewardActionBtn}>
                <Ionicons name="gift-outline" size={18} color="#49745e" />
                <Text style={styles.rewardActionText}>Redeem</Text>
              </TouchableOpacity>
              <View style={styles.verticalDivider} />
              <TouchableOpacity style={styles.rewardActionBtn}>
                <Ionicons name="time-outline" size={18} color="#49745e" />
                <Text style={styles.rewardActionText}>History</Text>
              </TouchableOpacity>
              <View style={styles.verticalDivider} />
              <TouchableOpacity style={styles.rewardActionBtn}>
                <Ionicons name="add-circle-outline" size={18} color="#49745e" />
                <Text style={styles.rewardActionText}>Earn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section Preferences (Gambar 8.6) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>Preferences</Text>
          <View style={styles.preferencesCard}>
            <PreferenceItem icon="shield-outline" title="Account Safety" />
            <PreferenceItem icon="card-outline" title="Payment Methods" />
            <PreferenceItem icon="wallet-outline" title="My Coints" />
            <PreferenceItem icon="lock-closed-outline" title="Privacy Policy" />
            <PreferenceItem icon="help-circle-outline" title="Help & Support" />
            <PreferenceItem icon="document-text-outline" title="Terms of Service" />
          </View>
        </View>

        {/* Sign Out Button (Gambar 8.6) */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version Info */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.copyrightText}>© 2026 Febri Damatraseta Fairuz</Text>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditProfileVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile Info</Text>
            <ScrollView style={{ maxHeight: 350, marginVertical: 15 }} showsVerticalScrollIndicator={false}>
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
            </ScrollView>

            <View style={styles.modalActionRow}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.modalCancelBtn]} 
                onPress={() => setIsEditProfileVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.modalSaveBtn]} 
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fa",
  },
  scrollContainer: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  imgAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  profileRole: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  actionButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingVertical: 10,
    gap: 8,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 8,
    paddingLeft: 4,
  },
  rewardsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rewardsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rewardsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  pointsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  pointsSubText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "normal",
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginBottom: 12,
  },
  rewardsActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardActionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
  rewardActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#49745e",
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#e2e8f0",
  },
  preferencesCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  prefItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  prefItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  prefIcon: {
    opacity: 0.8,
  },
  prefText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  signOutBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  signOutBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 10,
  },
  copyrightText: {
    textAlign: "center",
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
    marginBottom: 30,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#1e293b",
  },
  modalActionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelBtn: {
    backgroundColor: "#f1f5f9",
  },
  modalCancelText: {
    color: "#475569",
    fontWeight: "600",
  },
  modalSaveBtn: {
    backgroundColor: "#49745e",
  },
  modalSaveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
