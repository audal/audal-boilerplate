declare module "*.jpg";
declare module "*.png";

type IWPImage = import("./components/gatsby-image-svg-fallback").IWPImageProps;
type ISharpImage = import("./components/gatsby-image-svg-fallback").ISharpImage;

declare namespace NodeJS {
	interface Global {
		baseUrl?: string;
	}
}

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}
