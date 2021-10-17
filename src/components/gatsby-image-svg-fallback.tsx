import React, { ImgHTMLAttributes } from "react";
import * as Chakra from "@chakra-ui/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { HTMLChakraProps, SystemProps } from "@chakra-ui/react";

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

interface ImageOptions {
  fallbackSrc?: string;
  htmlWidth?: string | number;
  htmlHeight?: string | number;
  fallback?: React.ReactElement;
  loading?: "eager" | "lazy";
  fit?: SystemProps["objectFit"];
  align?: SystemProps["objectPosition"];
  ignoreFallback?: boolean;
}

interface UseImageProps {
  src?: string | ISharpImageLocalFile;
  srcSet?: string;
  sizes?: string;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement, Event>): void;
  onError?(error: string | React.SyntheticEvent<HTMLImageElement, Event>): void;
  ignoreFallback?: boolean;
  crossOrigin?: ImgHTMLAttributes<any>["crossOrigin"];
}

export interface IWPImage extends Chakra.ImageProps {
  localFile?: ISharpImage;
  altText?: string;
}

export interface IWPImageProps extends Chakra.ImageProps {
  localFile?: ISharpImage;
  altText?: string;
}

export interface GatsbyImageSVGFallbackProps
  extends UseImageProps,
    Omit<HTMLChakraProps<"img">, keyof UseImageProps>,
    ImageOptions {}

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
    return <Chakra.Image alt={alt ? alt : ""} src={src} {...props} />;
  } else if (src?.localFile?.childImageSharp) {
    return (
      <Chakra.Image
        as={GatsbyImage}
        placeholder="tracedSVG"
        alt={alt ? alt : ""}
        image={src.localFile.childImageSharp.gatsbyImageData}
        {...props}
      />
    );
  } else if (src?.localFile?.publicURL) {
    return (
      <Chakra.Image
        src={src.localFile.publicURL}
        alt={alt ? alt : ""}
        {...props}
      />
    );
  } else if (src?.localFile === undefined) {
    // add an optional fallback image here
    return <Chakra.Image alt={alt ? alt : ""} {...props} />;
  } else {
    return <Chakra.Image {...props} />;
  }
}
