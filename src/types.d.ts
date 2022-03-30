declare module "*.jpg";
declare module "*.png";

type IWPImage = import("./components/gatsby-image-svg-fallback").IWPImageProps;
type ISharpImage = import("./components/gatsby-image-svg-fallback").ISharpImage;
type AnyKeyCssProps = import("@compiled/react/dist/browser/types").AnyKeyCssProps<any>

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

interface CompiledJSXProps<T> extends React.HTMLProps<T> {
	css: AnyKeyCssProps
}
