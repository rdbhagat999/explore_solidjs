import { createResource, createEffect, onCleanup } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HeaderComponent from "./components/HeaderComponent";
import Home from "./pages/Home";
import LikedPets from "./pages/LikedPets";

import { fetchPets } from "./api/fetch-pets";
import { setPetStore } from "./stores/pet-store";

function App() {
  const [petResource, { refetch }] = createResource(fetchPets);
  let refetchInterval = 0;

  createEffect(() => {
    if (!petResource.loading && petResource()) {
      setPetStore(petResource());
    }
  });

  createEffect(() => {
    if (refetchInterval <= 0) {
      refetchInterval = setInterval(() => refetch(), 20000);
    }
  });

  onCleanup(() => clearInterval(refetchInterval));

  return (
    <div class="container mx-auto">
      <HeaderComponent />
      <Routes>
        <Route
          element={<Home refetchPets={refetch} />}
          end
          path="/"
        />
        <Route
          element={<LikedPets />}
          path="/likedpets"
        />
      </Routes>
    </div>
  );
}

export default App;
