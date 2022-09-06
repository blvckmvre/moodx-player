import { RepeatIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ISong } from "../types/types";
import hhmmss from "../utils/hhmmss";

interface FunctionalBarProps {
  shuffle: () => void;
  order: () => void;
  songs: ISong[];
}

const FunctionalBar: FC<FunctionalBarProps> = ({ shuffle, order, songs }) => {
  return (
    <Flex justify="center" gap="2" align="center">
      <Text textAlign="center">
        {songs.length} Tracks,{" "}
        {hhmmss(songs.reduce((a, b) => a + b.duration, 0))}
      </Text>
      <IconButton
        my="1"
        aria-label="Shuffle List"
        icon={<RepeatIcon />}
        onClick={shuffle}
        disabled={songs.length < 2}
      />
      <IconButton
        my="1"
        aria-label="Restore Default List"
        icon={<TriangleDownIcon />}
        onClick={order}
        disabled={songs.length < 2}
      />
    </Flex>
  );
};

export default FunctionalBar;
