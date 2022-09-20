import axios from "axios";

export const recipe = axios
  .get("http://localhost:3001/recipes/get")
  .then((response) => {
    return response.data;
  });

export const details = axios
  .get(
    `http://localhost:3001/recipes/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`
  )
  .then((response) => {
    return response.data;
  });
