const BASE_URL = (path = "") => `http://localhost:1337/api/actors/${path}`;
//functions for getting actors by id
export const getById = id => {
  return fetch(BASE_URL(id))
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for getting all actors
export const getAll = () => {
  return fetch(BASE_URL())
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for creating actors
export const create = data => {
  return fetch(BASE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for updating actors
export const update = (id, data) => {
  return fetch(BASE_URL(id), {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for removing actors
export const remove = id => {
  return fetch(BASE_URL(id), {
    method: "DELETE"
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
