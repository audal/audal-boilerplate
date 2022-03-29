import React, {ImgHTMLAttributes} from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface ISharpGatsbyData {
  gatsbyImageData: IGatsbyImageData;
}

export interface ISharpImage {
  childImageSharp?: ISharpGatsbyData;
  svgData?: string;
  publicURL?: string;
}

interface ISharpImageLocalFile {
  localFile: ISharpImage;
}

interface UseImageProps {
  src?: string | ISharpImageLocalFile;
  srcSet?: string;
  sizes?: string;
  ignoreFallback?: boolean;
}

export interface IWPImage extends ImgHTMLAttributes<any> {
  localFile?: ISharpImage;
  altText?: string;
}

export interface IWPImageProps extends ImgHTMLAttributes<any> {
  localFile?: ISharpImage;
  altText?: string;
}

export interface GatsbyImageSVGFallbackProps
  extends UseImageProps,
    Omit<ImgHTMLAttributes<any>, keyof UseImageProps>{}

export const WPImage = ({
  altText,
  localFile,
  ...props
}: IWPImageProps): React.ReactElement => {
  return (
    <GatsbyImageSVGFallback src={{ localFile }} alt={altText} {...props} />
  );
};

export function GatsbyImageSVGFallback({
  src,
  alt,
  ...props
}: GatsbyImageSVGFallbackProps): React.ReactElement {
  if (typeof src === "string") {
    return <img alt={alt ? alt : ""} src={src} {...props} />;
  } else if (src?.localFile?.childImageSharp) {
    return (
      <GatsbyImage
        placeholder="tracedSVG"
        alt={alt ? alt : ""}
        image={src.localFile.childImageSharp.gatsbyImageData}
        {...props}
      />
    );
  } else if (src?.localFile?.publicURL) {
    return (
      <img
        src={src.localFile.publicURL}
        alt={alt ? alt : ""}
        {...props}
      />
    );
  } else if (src?.localFile === undefined) {
    // add an optional fallback image here
    return <img alt={alt ? alt : ""} {...props} />;
  } else {
    return <img {...props} />;
  }
}
