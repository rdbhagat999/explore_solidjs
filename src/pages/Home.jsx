import { ErrorBoundary, lazy } from "solid-js";
import { petStore } from "../stores/pet-store";
const PetCardComponent = lazy(() => import("../components/PetCardComponent"));

const Home = (props) => {
  return (
    <div>
      <h2 class="text-4xl">List of Awesome Pets</h2>
      <button
        class="px-6 py-2 mt-2 bg-green-700 text-white rounded-md"
        onclick={() => props?.refetchPets()}>
        Refetch Pets
      </button>

      <Show
        when={petStore.pets}
        fallback={"Loading..."}>
        <div class="flex flex-col justify-start items-stretch my-4 space-y-4">
          <ErrorBoundary>
            <For each={petStore.pets}>
              {(pet) => (
                <PetCardComponent
                  class="inline-block"
                  pet={pet}
                />
              )}
            </For>
          </ErrorBoundary>
        </div>
      </Show>
    </div>
  );
};

export default Home;
