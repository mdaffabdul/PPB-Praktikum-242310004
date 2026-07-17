const Header = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={style_explore.headerContainer}
      edges={["top"]}
    >
      <View style={style_explore.headerContent}>
        <TouchableOpacity onPress={() => router.push("/main-apps")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};