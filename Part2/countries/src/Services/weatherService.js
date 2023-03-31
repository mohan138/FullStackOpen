import axios from "axios";

const get = async (url) => {
  const request = await axios.get(url);
  return request.data;
}

const getCoordinates = async (url) => {
  const request = await axios.get(url);
  return request.data;
}

export default { get, getCoordinates }