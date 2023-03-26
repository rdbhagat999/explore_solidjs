export const fetchPets = async () =>
  (await fetch(`https://pets-v2.dev-apis.com/pets`)).json();

export const fetchPetById = async (id) =>
  (await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`)).json();
