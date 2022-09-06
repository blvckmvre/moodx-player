import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ISong } from "../types/types";
import FuncButton from "./ui/FuncButton";

interface AudioPlayerProps {
  song: ISong | null;
  toNext: () => void;
  toPrev: () => void;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ song, toNext, toPrev }) => {
  return (
    <Flex direction="column" w="100vw" justify="center" gap="2" h="150">
      <Heading
        textAlign="center"
        color="gray.600"
        whiteSpace="nowrap"
        overflowX="auto"
        p="3"
        w="95%"
        m="auto"
      >
        {song?.title ?? "Nothing is being played"}
      </Heading>
      <Flex align="center">
        <FuncButton
          aria-label="Previous Song"
          icon={<ArrowLeftIcon color="gray.500" w="10" h="10" />}
          disabled={!song}
          onClick={toPrev}
        />
        <audio
          onEnded={toNext}
          style={{ width: "100%" }}
          autoPlay
          controls
          controlsList="noplaybackrate"
          src={song ? `file://${song.path}` : ""}
        ></audio>
        <FuncButton
          aria-label="Next Song"
          icon={<ArrowRightIcon color="gray.500" w="10" h="10" />}
          disabled={!song}
          onClick={toNext}
        />
      </Flex>
    </Flex>
  );
};

export default AudioPlayer;
