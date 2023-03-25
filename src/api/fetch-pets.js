export const fetchPets = async () =>
  (await fetch(`http://pets-v2.dev-apis.com/pets`)).json();
