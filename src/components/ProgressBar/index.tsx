import { lazy, useEffect } from 'react';

import { useStorage } from '@hooks/useStorage';
import { ProgressBarProps } from '@interfaces/index';

const MotionBox = lazy(() => import('../MotionBox'));

const ProgressBar = ({ file, setFile }: ProgressBarProps) => {
  const { progress, url } = useStorage(file);

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
      animate={{ width: progress + '%' }}
    />
  );
};

export default ProgressBar;
