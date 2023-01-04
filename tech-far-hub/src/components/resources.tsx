import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CardGroup, Card, CardHeader, CardBody, CardFooter } from "@trussworks/react-uswds";
import ResourceCard from "./resouces-card";
const Resources = () => {
  const data: Queries.ResourcePromosQuery = useStaticQuery(graphql`
    query ResourcePromos {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/.*/components/resources/.*/" }, frontmatter: { visible: { eq: true } } }
        sort: { frontmatter: { nav_weight: ASC } }
      ) {
        edges {
          node {
            id
            html
            parent {
              id
              ... on File {
                id
                name
                base
                relativeDirectory
                relativePath
              }
            }
            frontmatter {
              heading
              href
            }
          }
        }
      }
    }
  `);
  return (
    <CardGroup>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return <ResourceCard node={node} key={node.id}></ResourceCard>;
      })}
    </CardGroup>
  );
};

export default Resources;
