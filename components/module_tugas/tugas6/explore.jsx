import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

// Data Toko Buku
const markersAddress = [
  {
    id: "1",
    title: "The UBM Library",
    coordinates: { latitude: -6.2253615, longitude: 106.6549385 },
  },
  {
    id: "2",
    title: "Toko Buku NAS",
    coordinates: { latitude: -6.227, longitude: 106.653 },
  },
  {
    id: "3",
    title: "Stationery Gading Serpong",
    coordinates: { latitude: -6.229, longitude: 106.657 },
  },
  {
    id: "4",
    title: "Gramedia Summarecon Mall Serpong",
    coordinates: { latitude: -6.231, longitude: 106.651 },
  },
  {
    id: "5",
    title: "Mentari Books Serpong",
    coordinates: { latitude: -6.235, longitude: 106.655 },
  },
];

const MapViewComponent = ({ current_location }) => {
  const defaultRegion = {
    latitude: -6.2253615,
    longitude: 106.6549385,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const mapRegion = current_location
    ? {
        latitude: current_location.latitude,
        longitude: current_location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    : defaultRegion;

  if (Platform.OS === "web") {
    return (
      <View style={[style_explore.map, style_explore.mapFallback]}>
        <Ionicons name="map-outline" size={80} color="green" />
        <Text style={style_explore.mapFallbackText}>Map View Unavailable</Text>
        <Text style={style_explore.mapFallbackSubtext}>
          Maps are only available on Android and iOS devices
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={style_explore.map}
      region={mapRegion}
      showsUserLocation={!!current_location}
      showsMyLocationButton={true}
      zoomControlEnabled={true}
    >
      {markersAddress.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinates}
          title={marker.title}
        />
      ))}
    </MapView>
  );
};

const ListStores = ({ stores }) => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {stores.map((store, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={{ marginRight: 12 }}>
            <AntDesign name="shopping" size={24} color="green" />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {store?.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="star"
                size={12}
                color="orange"
                style={{ marginRight: 4 }}
              />
              <Text style={{ fontSize: 12, color: "#666" }}>4</Text>
            </View>
            <Text style={{ fontSize: 12, color: "#666" }}>
              Open · Closes 10.00 pm · (021) 1234-5678
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function ExploreTugas6() {
  const bottomSheetRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

  const handleSheetChange = (index) => {
    if (index === -1) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      try {
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);

        let addressData = await Location.reverseGeocodeAsync({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });

        if (addressData.length > 0) {
          setAddress(addressData[0]);
        }
      } catch (err) {
        // Handle silencer
      }
    })();
  }, []);

  return (
    <View style={style_explore.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapViewComponent current_location={location} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          enablePanDownToClose
          onChange={handleSheetChange}
          snapPoints={snapPoints}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.5}
              appearsOnIndex={1}
              disappearsOnIndex={0}
            />
          )}
          backgroundStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "white",
          }}
        >
          <BottomSheetScrollView>
            <Text style={style_explore.title}>Explore Bookstore Store</Text>

            {address && (
              <Text style={style_explore.subtitle}>
                Location:{" "}
                {(address?.city || address?.name || "-") +
                  ", " +
                  (address?.subregion || address?.region || "-")}
              </Text>
            )}

            <View style={{ marginTop: 20 }}>
              <ListStores stores={markersAddress} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const style_explore = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  mapFallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  mapFallbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  mapFallbackSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginHorizontal: 16,
    marginBottom: 4,
  },
});
