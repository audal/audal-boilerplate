declare module "*.jpg";
declare module "*.png";

declare interface AccordionData {
  title: string;
  details: string;
}

declare namespace NodeJS {
  interface Global {
    baseUrl?: string;
  }
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
