import React from "react";

import Draggable from "react-draggable";
import Video from "./Video";
import { StyledVideos, Local, Remote } from "./Videos.styled";

interface Props {
  localStream: MediaStream;
  remoteStream: MediaStream;
}

const Videos = ({ localStream, remoteStream }: Props) => {
  return (
    <StyledVideos>
      <Draggable bounds="parent">
        <Local>
          <Video srcObject={localStream} autoPlay />
        </Local>
      </Draggable>
      <Remote>
        <Video srcObject={remoteStream} autoPlay />
      </Remote>
    </StyledVideos>
  );
};

export default Videos;
