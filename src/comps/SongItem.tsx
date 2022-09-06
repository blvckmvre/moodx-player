import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Dispatch, FC, MouseEvent, SetStateAction } from "react";
import { ISong } from "../types/types";
import hhmmss from "../utils/hhmmss";

interface SongItemProps {
  song: ISong;
  setCurrentSong: Dispatch<SetStateAction<ISong | null>>;
  removeSong: (e: MouseEvent, id: number) => void;
  currentSong: ISong | null;
}

const SongItem: FC<SongItemProps> = ({
  song,
  setCurrentSong,
  removeSong,
  currentSong,
}) => {
  return (
    <Flex
      key={song.id}
      onClick={() => setCurrentSong(song)}
      align="center"
      bg={currentSong?.id === song.id ? "azure" : "gray.300"}
      boxShadow={
        currentSong?.id === song.id ? "0 0 5px 2px #204070" : undefined
      }
      _hover={{ bg: "orange.200" }}
    >
      <Flex justify="space-between" align="center" flex="1">
        <Container overflowX="hidden" w="450px" p="0" whiteSpace="nowrap">
          {song.title}
        </Container>
        <Box color="gray.500" fontSize="sm" mr="2">
          {hhmmss(song.duration)}
        </Box>
      </Flex>
      <Button
        color="red.500"
        rounded="10px 0 0 10px"
        onClick={(e) => removeSong(e, song.id)}
      >
        X
      </Button>
    </Flex>
  );
};

export default SongItem;
