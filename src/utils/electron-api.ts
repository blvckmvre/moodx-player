import { IPlaylist, ISong } from "../types/types";

export default function getElectronAPI () {
  const API = (window as any).electronAPI;
  return API as {
    getPlaylists: () => Promise<IPlaylist[]>,
    addPlaylist: (title: string) => Promise<IPlaylist[]>,
    rmPlaylist: (playlist: string) => Promise<IPlaylist[]>,

    getSongs: (playlist: string) => Promise<ISong[]>,
    addSongs: (playlist: string) => Promise<ISong[]>,
    rmSong: (id: number) => Promise<ISong[]>
  }
}