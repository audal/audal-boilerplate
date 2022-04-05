declare module "*.jpg";
declare module "*.png";

type IWPImage = import("./components/gatsby-image-svg-fallback").IWPImageProps;
type ISharpImage = import("./components/gatsby-image-svg-fallback").ISharpImage;
type AnyKeyCssProps = import("@compiled/react/dist/browser/types").AnyKeyCssProps<any>

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

/*
* Use this when creating a Ref-able component, like a default
* React Intrinsic <button/>, <div/>, etc.
* */
interface CompiledJSXProps<T> extends React.HTMLProps<T> {
	css?: AnyKeyCssProps
}

/*
* Use this when creating a non-Ref-able component - maybe an Intrinsic
* element that has its own internal Ref.
* */
interface CompiledJSXPropsOmitRef<T> extends Omit<React.HTMLProps<T>, "ref"> {
	css?: AnyKeyCssProps
}

/*
* Use this when needing to type custom elements, but also add a CSS prop to them.
* I.e. a pre-made UI component from a package. Remember the CSS will actually output
* a className, so make sure the component accepts className as a parameter
* */
type CompiledJSXCustomProps<T> = T & {
	css?: AnyKeyCssProps
}
