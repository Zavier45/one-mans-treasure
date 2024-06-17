const _apiURL = "/api/sale";

export const getItemTypes = () => {
  return fetch(_apiURL).then((res) => res.json());
};

export const getItemTypesById = (id) => {
  return fetch(`${_apiURL}/${id}`).then((res) => res.json());
};
