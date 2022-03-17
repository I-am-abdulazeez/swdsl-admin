import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { FileInput, InputField, SelectField } from "@components/FormFields";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { doc } from "@firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useParams } from "react-router";

import { fileTypes } from "@data/index";

import { FormState, NewFormState } from "@interfaces/index";

import { useAuth } from "@hooks/useAuth";

import { firebaseFirstore, firebaseStorage } from "@lib/firebase";

type ProductEditParams = {
  id: string;
};

const ProductEdit = forwardRef(({ snapshot }: any, StuffRef): JSX.Element => {
  const { userId } = useAuth();
  const { id } = useParams<ProductEditParams>();
  const toast = useToast();
  const [formState, setFormState] = useState<FormState>({
    drinkName: "",
    description: "",
    category: "",
    price: 0,
  });
  const { drinkName, description, category, price } = formState;
  const [file, setFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const docsRef = doc(firebaseFirstore, "products", String(id));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const docsEditMutation = useFirestoreDocumentMutation(
    docsRef,
    {
      merge: true,
    },
    {
      onError(err) {
        toast({
          duration: 5000,
          status: "error",
          isClosable: true,
          variant: "subtle",
          title: `Error editing Product: ${err.message}`,
        });
      },
      onSuccess() {
        toast({
          status: "success",
          title: `Data updated successfully`,
          variant: "subtle",
          isClosable: true,
          duration: 5000,
        });
        setFormState({
          category: "",
          description: "",
          drinkName: "",
          price: 0,
        });
        setFile(null);
        setUrl("");
        setProgress(0);
        onClose();
      },
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files![0];
    if (selected && fileTypes.includes(selected.type)) {
      setFile(selected);
      setProgress(0);
    } else if (file?.size! > 2048) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        variant: "subtle",
        title: "File too large, Maximum of 2MB",
      });
    } else {
      setFile(null);
      toast({
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        status: "error",
        title: "Please select an image file",
      });
    }
  };

  const uploadImage = () => {
    const storageRef = ref(firebaseStorage, `upload/${userId}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
          variant: "subtle",
          isClosable: true,
          duration: 3000,
        });
      },
      async () => {
        // On Success
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at ", downloadURL);
          const url = downloadURL;
          setUrl(url);
          toast({
            status: "success",
            title: `File updated to storage successfully`,
            variant: "subtle",
            isClosable: true,
            duration: 3000,
          });
          setUploadLoading(false);
        });
      }
    );
  };

  const handleFileEdit = (e: FormEvent) => {
    e.preventDefault();
    const newUpdate: NewFormState = {
      drinkName: drinkName || snapshot?.drinkName,
      description: description || snapshot?.description,
      category: category || snapshot?.category,
      url: url || snapshot?.url,
      price: Number(price),
    };
    console.log(newUpdate);
    docsEditMutation.mutate(newUpdate);
  };

  return (
    <Box>
      <IconButton
        aria-label="edit-button"
        size="sm"
        colorScheme="secondary"
        variant="ghost"
        onClick={onOpen}
        icon={<RiPencilLine size="18px" />}
      />
      <Modal
        isCentered
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Product{" "}
            <chakra.span color="success.700">{snapshot?.drinkName}</chakra.span>
            ?
          </ModalHeader>
          <ModalCloseButton size="sm" />
          <chakra.form onSubmit={handleFileEdit}>
            <ModalBody>
              <SimpleGrid
                columns={{ base: 1, sm: 2 }}
                spacing={6}
                textAlign="left"
              >
                <InputField
                  isRequired={false}
                  handleChange={handleChange}
                  label="Drink Name"
                  name="drinkName"
                  type={"text"}
                  placeHolder="Meridian"
                  value={drinkName || snapshot?.drinkName}
                />
                <InputField
                  isRequired={false}
                  handleChange={handleChange}
                  label="Drink Description"
                  name="description"
                  type={"text"}
                  placeHolder="Meridian wine @the best"
                  value={description || snapshot?.description}
                />
                <SelectField
                  isRequired={false}
                  handleChange={handleChange}
                  label="Drink Category"
                  name="category"
                  placeHolder="Select category"
                  value={category || snapshot?.category}
                />
                <InputField
                  isRequired={false}
                  handleChange={handleChange}
                  label="Drink Price"
                  name="price"
                  type="number"
                  placeHolder="500 (in Dollars)"
                  value={price || Number(snapshot?.price)}
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
            </ModalBody>
            <ModalFooter>
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
                  isLoading={docsEditMutation.isLoading}
                  colorScheme="success"
                >
                  Update All
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default ProductEdit;
