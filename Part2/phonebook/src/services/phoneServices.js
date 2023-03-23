import axios from "axios";

const baseURL = "http://localhost:3005/persons";

const getAll = async () => {
  const request = axios.get(baseURL);
  return (await request).data
}

const add = async (object) => {
  const request = axios.post(baseURL, object);
  return (await request).data;
}

const update = async (id, object) => {
  const request = axios.put(`${baseURL}/${id}`, object);
  return (await request).data;
}

const clear = async (id) => {
  axios.delete(`${baseURL}/${id}`);
}

export default { getAll, add, update, clear };