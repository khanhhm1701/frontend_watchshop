import React from "react";

const CommentComponent = ({ dataHref, width }) => {
  return (
    <div>
      <div class="fb-comments" data-href= {dataHref} data-width= {width} data-numposts="5"></div>
    </div>
  );
};

export default CommentComponent;
