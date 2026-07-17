const MapView = ({ current_location }) => {
  const cameraPosition = {
    coordinates: {
      latitude: current_location?.latitude,
      longitude: current_location?.longitude,
    },
    zoom: 13,
  };

  const [mapError, setMapError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (Platform.OS === "web") {
    return (
      <View style={[style_explore.map, style_explore.mapFallback]}>
        <Ionicons name="map-outline" size={80} color={color_list.green} />
        
        <Text style={style_explore.mapFallbackText}>
          Map View Unavailable
        </Text>

        <Text style={style_explore.mapFallbackSubtext}>
          Maps are only available on Android and iOS devices
        </Text>

        <Text style={style_explore.mapFallbackHint}>
          Please run this app on a mobile device or emulator
        </Text>
      </View>
    );
  }

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={{ flex: 1 }}
        cameraPosition={cameraPosition}
        markers={markersAddress}
        showsUserLocation={true}
        showsCompass={true}
      />
    );
  } else if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={cameraPosition}
        markers={markersAddress}
        showsUserLocation={true}
        showsCompass={true}
      />
    );
  }

  return (
    <View style={[style_explore.map, style_explore.mapFallback]}>
      <Ionicons name="map-outline" size={80} color={color_list.green} />

      <Text style={style_explore.mapFallbackText}>
        Map View Unavailable
      </Text>

      <Text style={style_explore.mapFallbackSubtext}>
        Unsupported platform
      </Text>
    </View>
  );
};