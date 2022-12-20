/* eslint-disable */
import React, { ImgHTMLAttributes } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

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
}: IWPImageProps): React.ReactElement => (
    <GatsbyImageSVGFallback src={{ localFile }} alt={altText} {...props} />
);

interface IPressLessImage {
    className?: string
    style?: any
    image?: PressLessImage
    objectFit?: any
    objectPosition?: any
    borderRadius?: any
}

export const PressLessImage = ({ image, ...props }: IPressLessImage) => {

    if (image && typeof image === "object") {
        if ("src" in image && image.src) {
            const { style, ...rest } = image
            return <img {...rest} className={`${image?.className || ""} ${props?.className || ""}`} {...props} />
        } else if ("svgData" in image) {
            return (
                <span dangerouslySetInnerHTML={{ __html: image.svgData }} {...props} />
            )
        } else if ("images" in image && image.images) {
            return (
              <GatsbyImage
                imgStyle={{
                  objectFit: props?.objectFit,
                  objectPosition: props?.objectPosition,
                  borderRadius: props?.borderRadius,
                }}
                alt={image?.alt ? image.alt : ""}
                image={image}
                {...props}
              />
            );
        } else if ("localFile" in image) {
            //@ts-ignore
            return <WPImage {...image} {...props} />
        }
    }

    return <img {...props} />
}

export const GatsbyImageSVGFallback = ({
    src,
    alt,
    ...props
}: GatsbyImageSVGFallbackProps): React.ReactElement => {
    if (typeof src === 'string') {
        return <img alt={alt || ''} src={src} {...props} />;
    } if (src?.localFile?.childImageSharp) {
        return (
            <GatsbyImage
                placeholder="tracedSVG"
                alt={alt || ''}
                image={src.localFile.childImageSharp.gatsbyImageData}
                {...props}
            />
        );
    } if (src?.localFile?.publicURL) {
        return (
            <img
                src={src.localFile.publicURL}
                alt={alt || ''}
                {...props}
            />
        );
    } if (src?.localFile === undefined) {
    // add an optional fallback image here
        return <img alt={alt || ''} {...props} />;
    }
    return <img {...props} />;
};
