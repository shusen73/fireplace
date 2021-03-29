import React, { useEffect, useRef } from "react";
import { StyledVideo } from "./Video.styled";

interface Props {
  srcObject: MediaStream;
  autoPlay: boolean;
}
const Video = ({ srcObject, autoPlay }: Props) => {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (refVideo.current != null) {
      refVideo.current.srcObject = srcObject;
    }
  }, [srcObject]);

  return <StyledVideo ref={refVideo} autoPlay></StyledVideo>;
};

export default Video;
