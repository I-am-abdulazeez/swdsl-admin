import React, { useEffect, useState } from 'react';

import { IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';

import { IoIosArrowRoundUp } from 'react-icons/io';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Box position="fixed" bottom={20} right={5}>
      {isVisible && (
        <IconButton
          aria-label="go-up"
          onClick={scrollToTop}
          rounded="full"
          icon={<IoIosArrowRoundUp size="28px" />}
          size="sm"
          colorScheme="primary"
        />
      )}
    </Box>
  );
};

export default BackToTop;
