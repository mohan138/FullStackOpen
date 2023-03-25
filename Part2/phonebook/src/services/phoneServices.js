import axios from "axios";

const baseURL = "http://localhost:3007/persons";

const getAll = async () => {
  const request = await axios.get(baseURL);
  return request.data
}

const add = async (object) => {
  const request = await axios.post(baseURL, object);
  return request.data;
}

const update = async (id, object) => {
  const request = await axios.put(`${baseURL}/${id}`, object);
  return request.data;
}

const clear = async (id) => {
  await axios.delete(`${baseURL}/${id}`);
}

export default { getAll, add, update, clear };