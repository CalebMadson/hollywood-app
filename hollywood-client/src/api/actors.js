const BASE_URL = (path = "") => `http://localhost:1337/api/actors/${path}`;

export const getById = id => {
  return fetch(BASE_URL(id))
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getAll = () => {
  return fetch(BASE_URL())
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const create = data => {
  return fetch(BASE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const update = (id, data) => {
  return fetch(BASE_URL(id), {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const remove = id => {
  return fetch(BASE_URL(id), {
    method: "DELETE"
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
