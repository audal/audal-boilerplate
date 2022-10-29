import {WPImage} from "./gatsby-image-svg-fallback";
import React from "react";


const VideoImage = ({ imageProps, videoUrl, ...props }) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    return (
        <div css={{ position: 'relative', width: '100%', height: '100%' }} {...props}>
            <WPImage css={{ objectFit: 'cover', width: '100%', height: '100%' }} imgStyle={{ objectFit: "cover" }} src={imageProps} />
            {videoUrl?.localFile?.publicURL && (<video
                muted
                autoPlay
                loop
                ref={(e) => {
                    if (e && e.onload) {
                        e.onload(() => {
                            setIsLoaded(true)
                        })
                    }
                }}
                style={{ opacity: isLoaded ? 0 : 1}}
                css={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    top: '0',
                    left: '0',
                    position: 'absolute',
                    transition: '0.3s'
                }}
                src={videoUrl?.localFile?.publicURL}
            />)}
        </div>
    )
}

export default VideoImage
