import React from "react";
import CardsCompiler from "../RecipeCards/CardsCompiler";

const Post = ({ posts, loading }) => {
  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return <CardsCompiler recipe={posts} />;
};

export default Post;
