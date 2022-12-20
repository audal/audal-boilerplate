import React from 'react';
import Plyr from './plyr';
import PlayIcon from '../../../images/play-circle-icon.svg';

const Video = ({ videoSrc }: { videoSrc: string }) => (
    <Plyr
        provider="html5"
        videoId={videoSrc}
        autoPlay={false}
        src={videoSrc}
    />
);

export default Video;
