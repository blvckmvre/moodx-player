import { useToast } from "@chakra-ui/react";

export default function useAnnounce () {
  const toast = useToast();
  return (description: string) =>
    toast({
      status: "error",
      title: "Error!",
      description,
      isClosable: true,
      duration: 3000,
    });
}
