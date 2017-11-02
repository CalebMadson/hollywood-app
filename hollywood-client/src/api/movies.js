const BASE_URL = (path = "") => `http://localhost:1337/api/movies/${path}`;
//function for getting movie by id
export const getById = id => {
  return fetch(BASE_URL(id))
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for getting all movies
export const getAll = () => {
  return fetch(BASE_URL())
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for creating movies
export const create = data => {
  return fetch(BASE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for updating movies
export const update = (id, data) => {
  return fetch(BASE_URL(id), {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for removing movies
export const remove = id => {
  return fetch(BASE_URL(id), {
    method: "DELETE"
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for adding an actor to a movie
export const addActor = (id, data) => {
  return fetch(BASE_URL(`${id}/actor`), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
//function for removing an actor from a movie
export const removeActor = (id, data) => {
  return fetch(BASE_URL(`${id}/actor`), {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
