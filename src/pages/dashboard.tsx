import { Box, Text } from "@chakra-ui/layout";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Box textAlign="center">
      <Text fontSize="xl" fontWeight="semibold">
        Dashboard Page
      </Text>
      {/* <Text>The user is {JSON.stringify(user, null, 2)}</Text> */}
    </Box>
  );
};

export default Dashboard;
