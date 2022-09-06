import { Button } from "@chakra-ui/react";
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../comps/ui/AppHeader";
import AudioPlayer from "../comps/AudioPlayer";
import List from "../comps/List";
import ScrollableDiv from "../comps/ui/ScrollableDiv";
import SongItem from "../comps/SongItem";
import PageHeader from "../comps/ui/PageHeader";
import PageWrapper from "../comps/ui/PageWrapper";
import useErrorHandle from "../hooks/useErrorHandle";
import { ISong } from "../types/types";
import getElectronAPI from "../utils/electron-api";
import { orderById, shuffle } from "../utils/list-order";
import FunctionalBar from "../comps/FunctionalBar";

const SongsPage: FC<{ setShowLoad: Dispatch<SetStateAction<boolean>> }> = ({
  setShowLoad,
}) => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);

  const router = useNavigate();
  const { playlist } = useParams();

  const { getSongs, addSongs, rmSong } = getElectronAPI();

  const getAllSongsRaw = async () => {
    const res = await getSongs(playlist!);
    setSongs(res);
  };
  const uploadSongsRaw = async () => {
    setShowLoad(true);
    const res = await addSongs(playlist!);
    if (res) setSongs(res)
    setShowLoad(false);
  };
  const removeSongRaw = async (e: MouseEvent, id: number) => {
    e.stopPropagation();
    await rmSong(id);
    if (id === currentSong?.id) setCurrentSong(null);
    setSongs((p) => p.filter((song) => song.id !== id));
  };

  const toNext = useCallback(() => {
    setCurrentSong(
      (p) => songs[Math.min(songs.indexOf(p!) + 1, songs.length - 1)]
    );
  }, [songs]);

  const toPrev = useCallback(() => {
    setCurrentSong((p) => songs[Math.max(songs.indexOf(p!) - 1, 0)]);
  }, [songs]);

  const [getAllSongs, uploadSongs, removeSong] = useErrorHandle(
    getAllSongsRaw,
    uploadSongsRaw,
    removeSongRaw
  );

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <PageWrapper>
      <Button colorScheme="blackAlpha" rounded="0" onClick={() => router("/")}>
        Back to playlists
      </Button>
      <AppHeader />
      <PageHeader>Playlist: "{playlist}"</PageHeader>
      <FunctionalBar
        shuffle={() => setSongs((p) => shuffle([...p]))}
        order={() => setSongs((p) => orderById([...p]))}
        songs={songs}
      />
      <ScrollableDiv>
        {!!songs.length && (
          <List
            itemsArr={songs}
            component={(item) => (
              <SongItem
                key={item.id}
                song={item}
                setCurrentSong={setCurrentSong}
                removeSong={removeSong}
                currentSong={currentSong}
              />
            )}
          />
        )}
      </ScrollableDiv>
      <Button
        bg="gray.200"
        _hover={{ bg: "gray.300" }}
        rounded="0"
        onClick={uploadSongs}
      >
        Upload
      </Button>
      <AudioPlayer song={currentSong} toNext={toNext} toPrev={toPrev} />
    </PageWrapper>
  );
};

export default SongsPage;
