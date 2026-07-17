import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const Backdrop = (props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5}
      appearsOnIndex={1}
      disappearsOnIndex={0}
    />
  );
};

export default Backdrop;