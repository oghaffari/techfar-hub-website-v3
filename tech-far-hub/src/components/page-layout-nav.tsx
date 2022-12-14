import { Grid, SideNav } from "@trussworks/react-uswds";
import { graphql, Link } from "gatsby";
import * as React from "react";
import { Alert } from "../components/alert";
import SiteLayout from "../components/site-layout";
import { IPageContext } from "../types";
import Resources from "../components/resources";
import { IMinimalFrontmatter, ITOCItem } from "../types";

interface IPageLayoutNav {
  frontmatter: IMinimalFrontmatter;
  siblings: {
    readonly nodes: readonly {
      readonly frontmatter: IMinimalFrontmatter | null;
      readonly parent:
        | {}
        | {
            readonly name: string;
            readonly relativePath: string;
            readonly relativeDirectory: string;
          }
        | null;
    }[];
  };
  tableOfContents: Record<string, ITOCItem[]>;
  pageContext: IPageContext;
  useNextLink: boolean;
  showSiblings?: boolean;
  children: React.ReactNode;
}

const PageLayoutNav: React.FC<IPageLayoutNav> = ({
  frontmatter,
  siblings,
  tableOfContents,
  pageContext,
  children,
  useNextLink = false,
  showSiblings = true,
}: IPageLayoutNav) => {
  const currentSlug = frontmatter?.slug;
  const pathDepth = pageContext.pathParts.length;
  const isTopLevel = pathDepth === 2;
  const tocLinks = tableOfContents.items
    ? tableOfContents.items.map((item: ITOCItem) => {
        const tocClass = !showSiblings ? "" : "font-ui-3xs";
        return (
          <a href={item.url} key={item.url} className={tocClass}>
            {item.title}
          </a>
        );
      })
    : [];
  let atCurrent = false;
  let nextLink = null;
  let siblingNodes = siblings.nodes;
  const siblingLinks = siblingNodes
    .map((node) => {
      if (
        node &&
        node.frontmatter &&
        node.frontmatter.slug &&
        node.frontmatter.heading &&
        node.parent &&
        "relativeDirectory" in node.parent
      ) {
        const actualSlug = node.frontmatter.slug === "index" ? "" : node.frontmatter.slug;
        if (isTopLevel) {
          // If this is a top-level page, like Get Started, we actually want first-children
          if (
            node.parent.relativeDirectory.startsWith(pageContext.pathParts.join("/").slice(1)) &&
            node.parent.relativePath !== pageContext.filePath
          ) {
            return <Link to={`/${node.parent.relativeDirectory}/${actualSlug}`}>{node.frontmatter.heading}</Link>;
          } else {
            return null;
          }
        }

        if (node.frontmatter.slug === currentSlug && node.parent.relativePath === pageContext.filePath) {
          atCurrent = true;
          return (
            <>
              {showSiblings && (
                <a href="#" className="usa-current" key="current">
                  {node.frontmatter.heading}
                </a>
              )}
              {tocLinks.length > 0 && <SideNav items={tocLinks}></SideNav>}
            </>
          );
        } else if (showSiblings) {
          if (atCurrent) {
            nextLink = node.frontmatter;
            atCurrent = false;
          }
          return <Link to={`/${node.parent.relativeDirectory}/${actualSlug}`}>{node.frontmatter.heading}</Link>;
        }
      }
    })
    .filter((item) => !!item);

  const components = { Alert };
  return (
    <SiteLayout breadCrumbs={pageContext.breadCrumbs}>
      <Grid row gap={2} className="margin-bottom-4">
        <Grid tablet={{ col: 2 }}>
          <div className="position-sticky top-0">
            <SideNav items={siblingLinks}></SideNav>
          </div>
        </Grid>
        <Grid tablet={{ col: 10 }}>
          <h1>{frontmatter?.heading}</h1>
          {children}
          {useNextLink && nextLink !== null && (
            <span className="tfh-next-link">
              <Link to={`${pageContext.parentPath}/${nextLink.slug}`}>
                <strong>Next: {nextLink.heading}</strong>
              </Link>
            </span>
          )}
        </Grid>
      </Grid>
      <Grid row className="tfh-resources-bar">
        <Grid col="fill">
          <hr />
          <h3 className="font-ui-xl">Resources</h3>
          <Resources></Resources>
        </Grid>
      </Grid>
    </SiteLayout>
  );
};

export const query = graphql`
  fragment minimalFrontmatter on Mdx {
    frontmatter {
      slug
      heading
      meta_title
      meta_description
      promo_description
      robots
      canonical
    }
  }
  fragment currentPageWithLocalNav on Mdx {
    ...minimalFrontmatter
    tableOfContents(maxDepth: 2)
    parent {
      ... on File {
        name
        relativePath
        relativeDirectory
      }
    }
  }
`;

export default PageLayoutNav;
