import { IconButton } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface FuncButtonProps {
  "aria-label": string;
  onClick: () => void;
  icon: ReactElement;
  disabled: boolean;
}

const FuncButton: FC<FuncButtonProps> = (p) => {
  return <IconButton mx="2" size="lg" variant="ghost" {...p} />;
};

export default FuncButton;
