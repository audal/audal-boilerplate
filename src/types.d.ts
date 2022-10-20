declare module '*.jpg';
declare module '*.png';

type IWPImage = import('./components/gatsby-image-svg-fallback').IWPImageProps;
type ISharpImage = import('./components/gatsby-image-svg-fallback').ISharpImage;

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

/*
* Use this when creating a Ref-able component, like a default
* React Intrinsic <button/>, <div/>, etc.
* */
type HTMLProps<T> = React.HTMLProps<T>;

/*
* Use this when creating a non-Ref-able component - maybe an Intrinsic
* element that has its own internal Ref.
* */
type HTMLPropsNoRef<T> = Omit<React.HTMLProps<T>, 'ref'>;

/*
* Use this when needing to type custom elements, but also add a CSS prop to them.
* I.e. a pre-made UI component from a package. Remember the CSS will actually output
* a className, so make sure the component accepts className as a parameter
* */
type CustomProps<T> = T & {};
