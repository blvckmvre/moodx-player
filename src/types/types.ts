export interface IPlaylist {
  id: number;
  title: string;
}

export interface ISong extends IPlaylist {
  playlist: string;
  path: string;
  duration: number;
}