import { Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      direction="column"
      userSelect="none"
      h="100vh"
      justify="space-between"
    >
      {children}
    </Flex>
  );
};

export default PageWrapper;
