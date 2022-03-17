import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { useToast } from "@chakra-ui/toast";

import { firebaseStorage, timestamp } from "@lib/firebase";

export const useStorage = (file: File | null) => {
  const toast = useToast();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [createdAt, setCreatedAt] = useState<Timestamp | string>("");

  useEffect(() => {
    const storageRef = ref(firebaseStorage, `upload/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setError(error.message);
        toast({
          status: "error",
          title: `${error.message}`,
          isClosable: true,
          duration: 3000,
        });
      },
      async () => {
        // On Success
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at ", downloadURL);
          const url = downloadURL;
          const createdAt = timestamp;
          setUrl(url);
          setCreatedAt(createdAt);
          toast({
            status: "success",
            title: `File upploaded to storage successfully`,
            isClosable: true,
            duration: 3000,
          });
        });
      }
    );
  }, [file]);

  return { url, createdAt, error, progress };
};
