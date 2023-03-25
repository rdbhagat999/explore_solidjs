import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

export const [petStore, setPetStore] = createStore({
  pets: [],
  endIndex: 0,
  hasNext: false,
  numberOfResults: 0,
});

export const [cutePets, setCutePets] = createSignal([]);

export const likePet = (pet) => {
  setCutePets([pet, ...cutePets()]);
};

export const unLikePet = (petId) => {
  const filteredPets = cutePets()?.filter((item) => item.id !== petId);
  setCutePets(filteredPets);
};

export const petIsCute = (petId) => {
  const petList = cutePets()?.filter((item) => item.id === petId);
  return petList?.length > 0;
};
