import axios from "axios";


const get = async (url) => {
  const request = await axios.get(url);
  return request.data
}



export default { get };