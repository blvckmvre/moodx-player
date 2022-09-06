import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const ScrollableDiv: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box flex="1" bg="gray.100" p="1" m="0" overflowY="auto">
      {children}
    </Box>
  );
};

export default ScrollableDiv;
