const ListStores = ({ stores }) => {
  return (
    <View>
      {stores.map((store, index) => (
        <View key={index}>
          <View>
            <AntDesign
              name="shopping"
              size={24}
              color={"green"}
            />
          </View>

          <View>
            <Text>
              {store?.title}
            </Text>

            <Text>
              <AntDesign
                name="star"
                size={18}
                color={"orange"}
              />{" "}
              4
            </Text>

            <Text>
              Open &middot; Closes 10.00 pm &middot; (021) 1234-5678
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};