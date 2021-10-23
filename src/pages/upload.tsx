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
import { useHistory } from "react-router";
import { FileInput, InputField, SelectField } from "../components/FormFields";
import { FormState } from "../interfaces";
import { firebaseFirstore, firebaseStorage, timestamp } from "../lib/firebase";

const Upload = (): JSX.Element => {
  const toast = useToast();
  const history = useHistory();
  const [formState, setFormState] = useState<FormState>({
    drinkName: "",
    description: "",
    category: "",
    price: "",
  });
  const { drinkName, description, category, price } = formState;
  const [file, setFile] = useState<any>(null);
  const [url, setUrl] = useState<any>("");
  const [progress, setProgress] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<any>();
  const collectionRef = collection(firebaseFirstore, "drinks");
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

  const types = ["image/png", "image/jpeg", "image/jpg"];

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
  };

  const handleFileChange = (e: any) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newFormState = {
      drinkName,
      description,
      category,
      price,
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
            handleChange={handleChange}
            label="Drink Name"
            name="drinkName"
            placeHolder="Meridian"
            value={drinkName}
          />
          <InputField
            handleChange={handleChange}
            label="Drink Description"
            name="description"
            placeHolder="Meridian wine @the best"
            value={description}
          />
          <SelectField
            handleChange={handleChange}
            label="Drink Category"
            name="category"
            placeHolder="Select category"
            value={category}
          />
          <InputField
            handleChange={handleChange}
            label="Drink Description"
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
          <Button onClick={uploadImage} isDisabled={!file} size="sm">
            Upload Image first
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
