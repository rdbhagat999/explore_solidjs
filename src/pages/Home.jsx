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
import { fetchPets, fetchPetById } from "../api/fetch-pets";
import { petStore, setPetStore } from "../stores/pet-store";

const Home = () => {
  let input;
  const [petId, setPetId] = createSignal();

  // runs immediately
  const [petResource, { refetch }] = createResource(fetchPets);

  // won't run immediately, depends upon petId. It won't run if petId = null, undefined or false
  const [petByIdResource] = createResource(petId, fetchPetById);

  let refetchInterval = 0;

  const handlePetIdChange = (id) => {
    if (id && Number(id)) {
      setPetId(Number(id));
    }
  };

  createEffect(() => {
    if (!petResource.loading && !petResource.error && petResource()) {
      setPetStore(petResource());
    }
  });

  createEffect(() => {
    if (
      !petByIdResource.loading &&
      !petByIdResource.error &&
      petByIdResource()
    ) {
      setPetStore(petByIdResource());
    }
  });

  // createEffect(() => {
  //   if (refetchInterval <= 0) {
  //     refetchInterval = setInterval(() => refetch(), 20000);
  //     console.log("refetchInterval", refetchInterval);
  //   }
  // });

  onCleanup(() => {
    console.log("onCleanup");
    // return clearInterval(refetchInterval);
    return;
  });

  return (
    <div>
      <h2 class="text-4xl">List of Awesome Pets</h2>

      <div class="flex justify-start items-center space-x-4 mt-2">
        <button
          class="px-6 py-2 bg-green-700 text-white rounded-md"
          onclick={() => {
            input.value = null;
            setPetId(null);
            refetch();
          }}>
          Refetch Pets
        </button>

        <input
          class="border border-gray-200 rounded-lg px-4 py-2"
          ref={input}
          type="number"
          name="search"
          placeholder="search pet by id"
          onBlur={[handlePetIdChange, input.value]}
        />
      </div>

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
