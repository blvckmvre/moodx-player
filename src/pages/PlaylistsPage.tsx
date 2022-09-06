import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { FC, MouseEvent, useEffect, useState } from "react";
import AddPlaylist from "../comps/AddPlaylist";
import AppHeader from "../comps/ui/AppHeader";
import List from "../comps/List";
import PlaylistItem from "../comps/PlaylistItem";
import ScrollableDiv from "../comps/ui/ScrollableDiv";
import PageHeader from "../comps/ui/PageHeader";
import PageWrapper from "../comps/ui/PageWrapper";
import useErrorHandle from "../hooks/useErrorHandle";
import { IPlaylist } from "../types/types";
import getElectronAPI from "../utils/electron-api";

const PlaylistsPage: FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  const { getPlaylists, rmPlaylist } = getElectronAPI();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const getListsRaw = async () => {
    const res = await getPlaylists();
    setPlaylists(res);
  };
  const removePlaylistRaw = async (e: MouseEvent, playlist: string) => {
    e.stopPropagation();
    const res = await rmPlaylist(playlist);
    setPlaylists(res);
  };

  const [getLists, removePlaylist] = useErrorHandle(
    getListsRaw,
    removePlaylistRaw
  );

  useEffect(() => {
    getLists();
  }, []);

  return (
    <PageWrapper>
      <Button colorScheme="blackAlpha" onClick={onOpen} rounded="0">
        New Playlist
      </Button>
      <AppHeader />
      <AddPlaylist
        isOpen={isOpen}
        onClose={onClose}
        setPlaylists={setPlaylists}
      />
      <PageHeader>All playlists</PageHeader>
      <ScrollableDiv>
        {playlists.length ? (
          <List
            itemsArr={playlists}
            component={(item) => (
              <PlaylistItem
                key={item.id}
                playlist={item}
                removePlaylist={removePlaylist}
              />
            )}
          />
        ) : (
          <Text fontSize="2xl" color="gray.500" textAlign="center" mt="10">
            No playlists yet
          </Text>
        )}
      </ScrollableDiv>
    </PageWrapper>
  );
};

export default PlaylistsPage;
