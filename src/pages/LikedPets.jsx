import { ErrorBoundary, lazy } from "solid-js";
import { cutePets } from "../stores/pet-store";
const PetCardComponent = lazy(() => import("../components/PetCardComponent"));

const LikedPets = () => {
  return (
    <div>
      <h2 class="text-4xl">Liked Pets</h2>

      <ErrorBoundary>
        <div class="flex flex-col justify-start items-stretch my-4 space-y-4">
          <For each={cutePets()}>{(pet) => <PetCardComponent pet={pet} />}</For>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default LikedPets;
