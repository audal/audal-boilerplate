import {CSSProperties} from "react";
import {css} from "@emotion/react";

interface GenerateRootStyles {
    smallScreenSize: number
    largeScreenSize: number
    backgroundColor: string
    textColor: string
}

const generateRootStyles = ({
    smallScreenSize,
    largeScreenSize,
    backgroundColor,
    textColor,
}: GenerateRootStyles) => {


    const styles =
    css`:root {
            background-color: ${backgroundColor};
            color: ${textColor};
            --min-body-width: ${smallScreenSize}px;
            --max-body-width: ${largeScreenSize}px;
            font-size: 16px;
        }
`
    return styles

}

export default generateRootStyles
