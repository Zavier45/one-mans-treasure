const _apiURL = "/api/sale";

export const getAllSales = () => {
  return fetch(_apiURL).then((res) => res.json());
};

export const getSaleById = (id) => {
  return fetch(`${_apiURL}/${id}`).then((res) => res.json());
};

export const deleteSale = (id) => {
  return fetch(`${_apiURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const newSale = async (saleObj) => {
  return await fetch(`${_apiURL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(saleObj),
  });
};

export const updateSale = (id, updatedSaleObj) => {
  return fetch(`${_apiURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedSaleObj),
  });
};
