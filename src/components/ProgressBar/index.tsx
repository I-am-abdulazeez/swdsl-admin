import { lazy, useEffect } from "react";
import { useStorage } from "@hooks/useStorage";

const MotionBox = lazy(() => import("../MotionBox"));
const ProgressBar = ({ file, setFile }: any) => {
  const { progress, url } = useStorage(file);

  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <MotionBox
      height="5px"
      bg="primary.400"
      mt={2}
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    />
  );
};

export default ProgressBar;
