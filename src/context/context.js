import { createContext, useEffect, useState } from "react";
import { modules } from "./constants";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { uuid4 as v4 } from "uuid4";

export const BizBanterContext = createContext();

export const BizBanterProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [screenWidth, setScreenWidth] = useState(null);
  const [currentChain, setCurrentChain] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  let hasWindow = typeof window !== "undefined";
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (hasWindow) {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow]);

  const uploadFile = async (
    fileDetails,
    endProcess,
    directory = "storage",
    setProgress = (val) => {}
  ) => {
    const storageRef = ref(storage, `${directory}/${v4() + fileDetails.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileDetails);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          endProcess(downloadURL);
        });
      }
    );
  };

  return (
    <BizBanterContext.Provider
      value={{
        selectedModule,
        setSelectedModule,
        screenWidth,
        uploadFile,
        currentChain,
        setCurrentChain,
        snackbarState,
        setSnackbarState,
      }}
    >
      {children}
    </BizBanterContext.Provider>
  );
};
