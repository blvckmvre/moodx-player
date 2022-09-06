import { CircularProgress } from "@chakra-ui/react";
import { FC, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import PlaylistsPage from "./pages/PlaylistsPage";
import SongsPage from "./pages/SongsPage";

const App: FC = () => {
  const [showLoad, setShowLoad] = useState(false);
  return (
    <HashRouter>
      {showLoad && (
        <CircularProgress
          color="gray.400"
          isIndeterminate
          position="absolute"
          top="12"
          right="3"
        />
      )}
      <Routes>
        <Route path="/" element={<PlaylistsPage />} />
        <Route
          path="/:playlist"
          element={<SongsPage setShowLoad={setShowLoad} />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
