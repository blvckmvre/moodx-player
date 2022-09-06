import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListProps<T> {
  itemsArr: T[];
  component: (item: T) => ReactNode;
}

function List<T>({ itemsArr, component }: ListProps<T>) {
  return (
    <Flex direction="column" gap="2">
      {itemsArr.map(component)}
    </Flex>
  );
}

export default List;
