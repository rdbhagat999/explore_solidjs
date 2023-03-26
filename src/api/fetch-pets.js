export const fetchPets = async () =>
  (await fetch(`http://pets-v2.dev-apis.com/pets`)).json();

export const fetchPetById = async (id) =>
  (await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`)).json();
