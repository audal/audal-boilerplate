import React, { ImgHTMLAttributes } from "react";
import * as Chakra from "@chakra-ui/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { HTMLChakraProps, SystemProps } from "@chakra-ui/react";

interface ISharpGatsbyData {
  gatsbyImageData: IGatsbyImageData;
}

interface ISharpImage {
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

export interface GatsbyImageSVGFallbackProps
  extends UseImageProps,
    Omit<HTMLChakraProps<"img">, keyof UseImageProps>,
    ImageOptions {}

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
        alt={alt ? alt : ""}
        image={src.localFile.childImageSharp.gatsbyImageData}
        {...props}
      />
    );
  } else if (src?.localFile?.svgData) {
    //@ts-expect-error Use of box as wrapper when props are inherited from Image type. No easy way to make this validate.
    return (
      <Chakra.Box
        css={{ svg: { width: "100%", height: "100%" } }}
        height="100%"
        dangerouslySetInnerHTML={{ __html: src.localFile.svgData }}
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
  } else {
    return <Chakra.Image {...props} />;
  }
}
