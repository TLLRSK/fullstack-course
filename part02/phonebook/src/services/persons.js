import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((resp) => resp.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((resp) => resp.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((resp) => resp.data);
};

const update = (updatedPerson) => {
  return axios
    .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then((resp) => resp.data);
};

export default {
  getAll,
  create,
  remove,
  update,
};
