import {
  createResource,
  createEffect,
  onCleanup,
  createSignal,
  ErrorBoundary,
  lazy,
  Suspense,
} from "solid-js";
const PetCardComponent = lazy(() => import("../components/PetCardComponent"));
import { fetchPets } from "../api/fetch-pets";
import { petStore, setPetStore } from "../stores/pet-store";

const Home = () => {
  const [petId, setPetId] = createSignal();

  // runs immediately
  const [petResource, { refetch }] = createResource(fetchPets);

  // won't run immediately, depends upon petId. It won't run if petId = null, undefined or false
  const [dependentResource] = createResource(petId, fetchPets);

  let refetchInterval = 0;

  createEffect(() => {
    if (!petResource.loading && petResource()) {
      setPetStore(petResource());
    }
  });

  createEffect(() => {
    if (refetchInterval <= 0) {
      refetchInterval = setInterval(() => refetch(), 20000);
      console.log("refetchInterval", refetchInterval);
    }
  });

  onCleanup(() => {
    console.log("onCleanup");
    return clearInterval(refetchInterval);
  });

  return (
    <div>
      <h2 class="text-4xl">List of Awesome Pets</h2>
      <button
        class="px-6 py-2 mt-2 bg-green-700 text-white rounded-md"
        onclick={() => refetch()}>
        Refetch Pets
      </button>

      <Show
        when={petStore.pets}
        fallback={"Loading..."}>
        <div class="flex flex-col justify-start items-stretch my-4 space-y-4">
          <Suspense>
            <ErrorBoundary fallback={(err) => <p>{err?.message}</p>}>
              <For each={petStore.pets}>
                {(pet) => (
                  <PetCardComponent
                    class="inline-block"
                    pet={pet}
                  />
                )}
              </For>
            </ErrorBoundary>
          </Suspense>
        </div>
      </Show>
    </div>
  );
};

export default Home;
