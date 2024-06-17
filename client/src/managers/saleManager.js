const _apiURL = "/api/sale";

export const getAllSales = () => {
  return fetch(_apiURL).then((res) => res.json());
};

export const getSaleById = (id) => {
  return fetch(`${_apiURL}/${id}`).then((res) => res.json());
};
