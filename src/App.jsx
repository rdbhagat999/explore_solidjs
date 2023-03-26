import { ErrorBoundary, lazy, Suspense } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Home from "./pages/Home";
import LikedPets from "./pages/LikedPets";
const HeaderComponent = lazy(() => import("./components/HeaderComponent"));

function App() {
  return (
    <main class="container mx-auto">
      <ErrorBoundary fallback={(err) => <p>{err?.message}</p>}>
        <Suspense fallback={<p>Loading app...</p>}>
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
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default App;
