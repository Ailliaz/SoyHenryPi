import axios from "axios";

export const recipe = axios
  .get("http://localhost:3001/recipes/get")
  .then((response) => {
    return response.data;
  });
