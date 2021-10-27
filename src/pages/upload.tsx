import {
  Box,
  Text,
  useToast,
  SimpleGrid,
  chakra,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { useState } from "react";
import { FileInput, InputField, SelectField } from "../components/FormFields";
import { fileTypes } from "../data";
import { FormState } from "../interfaces";
import { firebaseFirstore, firebaseStorage, timestamp } from "../lib/firebase";
import { numberWithCommas } from "../utils";

const Upload = (): JSX.Element => {
  const toast = useToast();
  const [formState, setFormState] = useState<FormState>({
    drinkName: "",
    description: "",
    category: "",
    price: "",
  });
  const { drinkName, description, category, price } = formState;
  const [file, setFile] = useState<any>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<any>("");
  const [progress, setProgress] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<any>();
  const collectionRef = collection(firebaseFirstore, "products");
  const mutationCollection = useFirestoreCollectionMutation(collectionRef, {
    onError(err) {
      console.log(err);
      toast({
        status: "error",
        title: `${err.message}`,
        isClosable: true,
        duration: 3000,
      });
    },
    onSuccess() {
      toast({
        status: "success",
        title: `Data saved successfully`,
        isClosable: true,
        duration: 3000,
      });
      setFormState({
        category: "",
        description: "",
        drinkName: "",
        price: "",
      });
      setFile(null);
      setUrl("");
      setProgress(0);
      setCreatedAt("");
      // history.push("/dashboard");
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const uploadImage = () => {
    const storageRef = ref(firebaseStorage, `upload/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        setUploadLoading(true);
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
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setUploadLoading(false);
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
            title: `File uploaded to storage successfully`,
            isClosable: true,
            duration: 3000,
          });
          setUploadLoading(false);
        });
      }
    );
  };

  const handleFileChange = (e: any) => {
    let selected = e.target.files[0];
    if (selected && fileTypes.includes(selected.type)) {
      setFile(selected);
      setProgress(0);
    } else if (file?.size > 2048) {
      toast({
        duration: 3000,
        isClosable: true,
        status: "error",
        title: "File too large, Minimum of 2MB",
      });
    } else {
      setFile(null);
      toast({
        duration: 3000,
        isClosable: true,
        status: "error",
        title: "Please select an image file",
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newFormState = {
      drinkName,
      description,
      category,
      price: numberWithCommas(price),
      url,
      createdAt,
    };
    console.log(newFormState);
    mutationCollection.mutate(newFormState);
  };

  return (
    <>
      <Text fontSize="xl" mb={5} fontWeight="semibold">
        Upload Drinks
      </Text>
      <chakra.form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} textAlign="left">
          <InputField
            isRequired={true}
            handleChange={handleChange}
            label="Drink Name"
            name="drinkName"
            placeHolder="Meridian"
            value={drinkName}
          />
          <InputField
            isRequired={true}
            handleChange={handleChange}
            label="Drink Description"
            name="description"
            placeHolder="Meridian wine @the best"
            value={description}
          />
          <SelectField
            isRequired={true}
            handleChange={handleChange}
            label="Drink Category"
            name="category"
            placeHolder="Select category"
            value={category}
          />
          <InputField
            isRequired={true}
            handleChange={handleChange}
            label="Drink Price"
            name="price"
            placeHolder="50,000 (in Naira)"
            value={price}
          />
        </SimpleGrid>

        <Box my={3}>
          <Text fontSize="sm" fontWeight="normal">
            Click on the circle below to select a drink image
          </Text>
        </Box>
        <Box
          display="flex"
          p={3}
          borderRadius="10px"
          flexDir="column"
          border="1px solid #EDF2F7"
        >
          <FileInput
            progress={progress}
            file={file}
            handleFileChange={handleFileChange}
          />
        </Box>

        <ButtonGroup mt={4} spacing={2}>
          <Button
            isLoading={uploadLoading}
            onClick={uploadImage}
            isDisabled={!file || progress === 100}
            size="sm"
          >
            Upload Image First
          </Button>
          <Button
            size="sm"
            type="submit"
            variant="solid"
            isDisabled={!file || progress === 0}
            colorScheme="success"
            isLoading={mutationCollection.isLoading}
          >
            Save All
          </Button>
        </ButtonGroup>
      </chakra.form>
    </>
  );
};

export default Upload;
