import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import useErrorHandle from "../hooks/useErrorHandle";
import getElectronAPI from "../utils/electron-api";

const AddPlaylist: FC<{
  isOpen: boolean;
  onClose: () => void;
  setPlaylists: Dispatch<SetStateAction<any>>;
}> = (p) => {
  const [title, setTitle] = useState("");

  const { addPlaylist } = getElectronAPI();

  const createPlaylistRaw = async () => {
    const res = await addPlaylist(title.trim());
    if (res) p.setPlaylists(res);
    setTitle("");
    p.onClose();
  };

  const [createPlaylist] = useErrorHandle(createPlaylistRaw);

  return (
    <Modal onClose={p.onClose} isOpen={p.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Playlist</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!title.trim()}>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <FormErrorMessage>Playlist title cannot be empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button disabled={!title.trim()} mr="2" onClick={createPlaylist}>
            Create
          </Button>
          <Button onClick={p.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPlaylist;
