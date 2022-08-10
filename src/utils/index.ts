import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

import customTheme from '@assets/theme';
import { createBrowserHistory } from 'history';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage, timestamp } from '@lib/firebase';
import { UploadImageParams } from 'src/types';

export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const customToast = (options?: UseToastOptions | undefined) => {
  const { toast } = createStandaloneToast({ theme: customTheme });
  return toast({
    duration: 4000,
    isClosable: true,
    containerStyle: {
      fontSize: '12px',
      fontWeight: 600,
    },
    ...options,
  });
};

export const Router = createBrowserHistory({ window });

export const uploadImage = ({
  file,
  progress,
  setCreatedAt,
  setProgress,
  setUploadLoading,
  setUrl,
}: UploadImageParams) => {
  const storageRef = ref(firebaseStorage, `upload/${file?.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file!);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      setUploadLoading(true);
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error);
      setUploadLoading(false);
      customToast({
        status: 'error',
        title: `${error.message}`,
      });
    },
    async () => {
      // On Success
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at ', downloadURL);
        const url = downloadURL;
        const createdAt = timestamp;
        setUrl(url);
        setCreatedAt && setCreatedAt(createdAt);
        customToast({
          status: 'success',
          title: `Product image uploaded to storage successfully`,
        });
        setUploadLoading(false);
      });
    }
  );
};
