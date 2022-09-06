import { DeleteIcon } from "@chakra-ui/icons";
import { Container, Flex, IconButton } from "@chakra-ui/react";
import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IPlaylist } from "../types/types";

interface PlaylistItemProps {
  playlist: IPlaylist;
  removePlaylist: (e: MouseEvent, playlist: string) => void;
}

const PlaylistItem: FC<PlaylistItemProps> = ({ playlist, removePlaylist }) => {
  const router = useNavigate();
  return (
    <Flex
      key={playlist.id}
      align="center"
      bg="gray.300"
      _hover={{ bg: "orange.200" }}
      fontWeight="bold"
      transition="0.25s"
      cursor="pointer"
      onClick={() => router("/" + playlist.title)}
    >
      <Container>{playlist.title}</Container>
      <IconButton
        aria-label="Delete Playlist"
        icon={<DeleteIcon />}
        rounded="0"
        size="lg"
        colorScheme="red"
        onClick={(e) => removePlaylist(e, playlist.title)}
      />
    </Flex>
  );
};

export default PlaylistItem;
