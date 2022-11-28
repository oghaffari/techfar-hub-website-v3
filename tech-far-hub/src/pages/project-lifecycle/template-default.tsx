import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { IPageContext } from "../../types";
import { Grid } from "@trussworks/react-uswds";

type LifecycleInnerPageProps = PageProps<Queries.GetStartedInnerPageQuery, IPageContext>;

const LifecycleInnerPage: React.FC<LifecycleInnerPageProps> = ({
  data,
  children,
  pageContext,
}: LifecycleInnerPageProps) => {
  return (
    <Layout breadCrumbs={pageContext.breadCrumbs}>
      <h2>{data.mdx?.frontmatter?.heading}</h2>
      <hr className="text-accent-warm " />
      <Grid row gap={2}>
        <Grid tablet={{ col: 2 }}>Local nav</Grid>
        <Grid tablet={{ col: 8 }}>{children}</Grid>
        <Grid tablet={{ col: 2 }}>Reference stuff</Grid>
      </Grid>
    </Layout>
  );
};

export default LifecycleInnerPage;

export const Head: HeadFC = () => <title>TechFAR Hub</title>;

export const query = graphql`
  query LifecycleInnerPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        heading
      }
    }
  }
`;
