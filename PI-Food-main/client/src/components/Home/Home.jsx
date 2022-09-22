import "./Style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Post from "./Post";

function Home() {
  const [recipe, setRecipe] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
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
  const [diets, setDiets] = useState([]);

  function handleChange(e) {
    setRecipe(e.target.value);
  }

  function handleOrderDropdown(id) {
    setOrderValue(id);
  }

  function handleFilterDropdown(id) {
    setFilterValue(id);
  }

  function handleCheckbox(e) {
    if (diets.indexOf(e.target.value) === -1) {
      setDiets([...diets, e.target.value]);
    } else {
      setDiets(diets.filter((item) => item !== e.target.value));
    }
  }

  useEffect(() => {
    let props = "";
    if (filterValue !== "" && orderValue !== "")
      props = "filter=" + filterValue + "&order=" + orderValue;
    else if (filterValue !== "") props = "filter=" + filterValue;
    else if (orderValue !== "") props = "order=" + orderValue;
    let byDiet = "";
    if (diets.length === 0) byDiet = "";
    else byDiet = "diet=" + diets.join("_");

    if (recipe === "") {
      const fetchPost = async () => {
        setLoading(true);
        if (props !== "" && byDiet !== "") {
          props = "?" + props;
          byDiet = "&" + byDiet;
        } else if (props !== "") props = "?" + props;
        else if (byDiet !== "") byDiet = "?" + byDiet;
        const res = await axios.get(
          `http://localhost:3001/recipes/get${props}${byDiet}`
        );
        setPosts(res.data);
        setLoading(false);
      };
      fetchPost();
    } else {
      const fetchPost = async () => {
        setLoading(true);
        if (props !== "" && byDiet !== "") {
          props = "&" + props;
          byDiet = "&" + byDiet;
        } else if (props !== "") props = "&" + props;
        else if (byDiet !== "") byDiet = "&" + byDiet;
        const res = await axios.get(
          `http://localhost:3001/recipes/?name=${recipe}${props}${byDiet}`
        );
        setPosts(res.data);
        setLoading(false);
      };
      fetchPost();
    }
  }, [recipe, filterValue, orderValue, diets]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = [];
  if (posts.length > 0)
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
        <div className="homeCheckbox">
          <div className="checkboxWhite">
            <> Gluten Free</>
            <input
              type="checkbox"
              name="diets"
              value="Gluten Free"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Dairy Free</>
            <input
              type="checkbox"
              name="diets"
              value="Dairy Free"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Ketogenic</>
            <input
              type="checkbox"
              name="diets"
              value="Ketogenic"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Vegetarian</>
            <input
              type="checkbox"
              name="diets"
              value="Vegetarian"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Lacto-Vegetarian</>
            <input
              type="checkbox"
              name="diets"
              value="Lacto-Vegetarian"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Ovo-Vegetarian</>
            <input
              type="checkbox"
              name="diets"
              value="Ovo-Vegetarian"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Vegan</>
            <input
              type="checkbox"
              name="diets"
              value="Vegan"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Pescetarian</>
            <input
              type="checkbox"
              name="diets"
              value="Pescetarian"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Paleo</>
            <input
              type="checkbox"
              name="diets"
              value="Paleo"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Primal</>
            <input
              type="checkbox"
              name="diets"
              value="Primal"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> low FODMAP</>
            <input
              type="checkbox"
              name="diets"
              value="low FODMAP"
              onChange={handleCheckbox}
            />
          </div>
          <div className="checkboxWhite">
            <> Whole 30</>
            <input
              type="checkbox"
              name="diets"
              value="Whole30"
              onChange={handleCheckbox}
            />
          </div>
        </div>
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
