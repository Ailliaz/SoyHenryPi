import "./Style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Post from "./Post";

function Home() {
  const [recipe, setRecipe] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([
    { id: "ASC", name: "Ascending" },
    { id: "DESC", name: "Descending" },
  ]);
  const [filter, setFilter] = useState([
    { id: "name", name: "Name" },
    { id: "healthScore", name: "Health Score" },
  ]);
  const [orderValue, setOrderValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  function handleChange(e) {
    setRecipe(e.target.value);
  }

  function handleOrderDropdown(id) {
    setOrderValue(id);
  }

  function handleFilterDropdown(id) {
    setFilterValue(id);
  }

  useEffect(() => {
    let props = "";
    if (filterValue !== "" && orderValue !== "")
      props = "filter=" + filterValue + "&order=" + orderValue;
    else if (filterValue !== "") props = "filter=" + filterValue;
    else if (orderValue !== "") props = "order=" + orderValue;
    console.log(props);

    if (recipe === "") {
      const fetchPost = async () => {
        setLoading(true);
        if (props !== "") props = "?" + props;
        const res = await axios.get(
          `http://localhost:3001/recipes/get${props}`
        );
        setPosts(res.data);
        setLoading(false);
      };
      fetchPost();
    } else {
      const fetchPost = async () => {
        setLoading(true);
        if (props !== "") props = "&" + props;
        const res = await axios.get(
          `http://localhost:3001/recipes/?name=${recipe}${props}`
        );
        setPosts(res.data);
        setLoading(false);
      };
      fetchPost();
    }
  }, [recipe, filterValue, orderValue]);

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
      <div className="dorpdowns">
        <select
          className="orderDropdown"
          onChange={(e) => handleOrderDropdown(e.target.value)}
        >
          <option value="">Select Order</option>
          {order.map((o, index) => {
            return (
              <option className="orderDropdown" key={index} value={o.id}>
                {o.name}
              </option>
            );
          })}
        </select>
        <select
          className="orderDropdown"
          onChange={(e) => handleFilterDropdown(e.target.value)}
        >
          <option value="">Select Filtered by</option>
          {filter.map((f, index) => {
            return (
              <option className="orderDropdown" key={index} value={f.id}>
                {f.name}
              </option>
            );
          })}
        </select>
      </div>
      <Post posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Home;
