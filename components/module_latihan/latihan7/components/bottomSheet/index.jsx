import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import Backdrop from "./Backdrop";
import ScrollContent from "./ScrollContent";

const BottomSheetExplore = ({ bottomSheetRef, address, stores }) => {
  const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

  const handleSheetChange = (index) => {
    if (index === -1) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose
      onChange={handleSheetChange}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
      backgroundStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
      }}
    >
      <ScrollContent address={address} stores={stores} />
    </BottomSheet>
  );
};

export default BottomSheetExplore;