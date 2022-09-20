import "./Style.css";
import CardsCompiler from "../RecipeCards/CardsCompiler";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Home() {
  const [recipe, setRecipe] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  function handleChange(e) {
    // setRecipe(
    //   posts.filter((o) =>
    //     o.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   )
    // );
    setRecipe(e.target.value);
  }

  useEffect(() => {
    if (recipe === "") {
      const fetchPost = async () => {
        const res = await axios.get("http://localhost:3001/recipes/get");
        setPosts(res.data);
      };
      fetchPost();
    } else {
      const fetchPost = async () => {
        const res = await axios.get(
          `http://localhost:3001/recipes/?name=${recipe}`
        );
        setPosts(res.data);
      };
      fetchPost();
    }
  }, [recipe]);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await axios.get("http://localhost:3001/recipes/get");
  //     setPosts(res.data);
  //   };
  //   fetchPost();
  // }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        on
        onChange={handleChange}
      />
      <CardsCompiler recipe={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={recipe.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Home;
