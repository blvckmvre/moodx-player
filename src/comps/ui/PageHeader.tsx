import { Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const PageHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Heading
      color="gray.500"
      textAlign="center"
      borderBottom="7px solid rgba(0,70,127,0.2)"
    >
      {children}
    </Heading>
  );
};

export default PageHeader;
