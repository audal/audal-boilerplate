import { css, SerializedStyles } from '@emotion/react';

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
}: GenerateRootStyles): SerializedStyles => css`:root {
            background-color: ${backgroundColor};
            color: ${textColor};
            --min-body-width: ${smallScreenSize};
            --max-body-width: ${largeScreenSize}px;
            font-size: 16px;
        }
`;

export default generateRootStyles;
