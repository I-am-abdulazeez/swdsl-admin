import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import ShayoLogo from "../../assets/images/logo.png";

const Brand = (): JSX.Element => {
  return (
    <Box>
      <Link to="/">
        <Image
          src={ShayoLogo}
          width={{ base: "100px", md: "125px" }}
          alt="shayo-logo"
        />
      </Link>
    </Box>
  );
};

export default Brand;
