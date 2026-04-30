import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { UserData } from "./userdata";

const UserDataList = ({ users }) => {
  return (
    <View>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </View>
  );
};

const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={user.gambar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.nama}</Text>
          <Text style={styles.userTitle}>{user.title}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.sectionLabel}>Department</Text>
        <Text style={styles.sectionText}>{user.department}</Text>
      </View>
    </View>
  );
};

const Quiz1 = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>User List</Text>
        <Text style={styles.pageSubTitle}>Total Users: {UserData.length}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <UserDataList users={UserData} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f5fb",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageSubTitle: {
    fontSize: 14,
    marginTop: 24,
    marginBottom: 16,
    marginRight: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#dbe2ef",
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  userTitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 2,
  },
  userEmail: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 10,
    lineHeight: 20,
  },
  portfolioLabel: {
    marginTop: 10,
  },
  portfolioItem: {
    fontSize: 13,
    color: "#475569",
    marginLeft: 8,
    marginBottom: 6,
  },
});

export default Quiz1;
