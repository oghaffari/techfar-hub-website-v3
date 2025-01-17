import { withPrefix } from "gatsby";
import _ from "lodash";
import * as React from "react";
import { Hyperlink } from "./hyperlink";

export const TagList = ({ tags }: { tags: readonly (string | null)[] }): JSX.Element | null => {
  if (tags && tags.length) {
    const tagList = tags.map((tag) => {
      if (tag) {
        const urlTag = withPrefix(`/tags/${_.kebabCase(tag)}`);
        return (
          <Hyperlink href={urlTag} key={`tag-${tag}`}>
            {tag}
          </Hyperlink>
        );
      }
    });
    return (
      <div className="tfh-tagBox">
        <h4>Tags</h4>
        {tagList}
      </div>
    );
  }
  return null;
};
