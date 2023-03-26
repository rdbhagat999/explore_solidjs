import { Routes, Route } from "@solidjs/router";
import HeaderComponent from "./components/HeaderComponent";
import Home from "./pages/Home";
import LikedPets from "./pages/LikedPets";

function App() {
  return (
    <div class="container mx-auto">
      <HeaderComponent />
      <Routes>
        <Route
          element={<Home />}
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
