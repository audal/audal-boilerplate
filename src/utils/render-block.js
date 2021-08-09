import React from "react";

const renderBlock = (param, el, i, postType) => {
  if (!param) {
    return;
  }

  param = param.replace(postType, "");
  let block = {
    //'_Acf_ContentBlocks_TwoColumn' : (el, i) => <TwoColumn key={i} {...el} />, // Use this as an example of how to map over ACF blocks in Wordpress, or Strapi Dynamic Zones in Strapi
  }[param];

  if (!block) return null;

  return block(el, i);
};

export default renderBlock;
