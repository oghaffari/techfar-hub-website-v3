import { HeadFC, Script } from "gatsby";
import * as React from "react";
import SiteLayout from "../components/site-layout";

const ContactPage: React.FC = () => {
  return (
    <SiteLayout pagePath="/contact">
      <h1>Contact the TechFAR Hub Team at USDS</h1>
      <div id="touchpoints-contact"></div>
      <Script src="https://touchpoints.app.cloud.gov/touchpoints/fbdc7110.js" strategy="post-hydrate"></Script>
    </SiteLayout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => {
  return (
    <>
      <title>Contact | TechFAR Hub</title>
    </>
  );
};
