import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_LECTIFY_API

export default axios