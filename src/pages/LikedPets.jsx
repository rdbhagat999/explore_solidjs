import { ErrorBoundary, lazy, Suspense } from "solid-js";
import { cutePets } from "../stores/pet-store";
const PetCardComponent = lazy(() => import("../components/PetCardComponent"));

const LikedPets = () => {
  return (
    <section>
      <h2 class="text-4xl">Liked Pets</h2>
      <ErrorBoundary fallback={(err) => <p>{err?.message}</p>}>
        <Suspense fallback={<p>Loading liked pets...</p>}>
          <div class="flex flex-col justify-start items-stretch my-4 space-y-4">
            <For each={cutePets()}>
              {(pet) => (
                <ErrorBoundary fallback={(err) => <p>{err?.message}</p>}>
                  <PetCardComponent pet={pet} />
                </ErrorBoundary>
              )}
            </For>
          </div>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default LikedPets;
