import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const ThreeDots = (
  props: JSX.IntrinsicAttributes & IContentLoaderProps
) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
);

ThreeDots.metadata = {
  name: "Dennoh Peter",
  github: "dennohpeter",
  description: "Image Grid with Pagination",
  filename: "ThreeDots",
};
