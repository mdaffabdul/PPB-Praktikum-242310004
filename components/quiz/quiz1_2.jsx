import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { UserData } from "./userdata";

const PortofolioDataList = ({ user }) => {
  return (
    <View>
      <PortofolioCard user={user} />
    </View>
  );
};

const PortofolioCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={user.gambar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.nama}</Text>
          <Text style={styles.userTitle}>{user.title}</Text>
          <Text style={styles.sectionText}>{user.department}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.sectionLabel}>Portofolio List</Text>
        <View style={styles.portfolioGrid}>
          {user.portofolio.map((project, idx) => (
            <View key={idx} style={styles.projectCard}>
              <Image source={project.image} style={styles.projectImage} />
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>Nama: {project.nama}</Text>
                <Text style={styles.projectCode}>Code: {project.code}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const Quiz1_2 = () => {
  const firstUser = UserData[0];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <PortofolioDataList user={firstUser} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#f2f5fb",
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
    marginTop: 2,
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
    lineHeight: 20,
  },
  portfolioLabel: {
    marginTop: 10,
  },
  portfolioGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  projectCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  projectImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  projectInfo: {
    alignItems: "center",
  },
  projectName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  projectCode: {
    fontSize: 12,
    color: "#64748b",
  },
});

export default Quiz1_2;
