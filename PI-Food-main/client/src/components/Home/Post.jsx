import React from "react";
import CardsCompiler from "../RecipeCards/CardsCompiler";

const Post = ({ posts, loading }) => {
  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (posts.length === 0)
    return (
      <div className="cardDetails">
        <span className="noId">
          <strong>There is no recipe that match your search options</strong>
        </span>
      </div>
    );
  else return <CardsCompiler recipe={posts} />;
};

export default Post;
