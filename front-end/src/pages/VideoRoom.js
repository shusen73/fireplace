import React, { useEffect } from "react";
import { Flex, Grid } from "theme-ui";
import interact from "interactjs";

import Video from "../components/Video";
const VideoRoom = ({ localStream, remoteStream }) => {
  useEffect(() => {
    const position = { x: 0, y: 0 };
    interact("#remoteVideo").draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        start(event) {
          console.log(event.type, event.target);
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;
          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      },
    });
  });

  return (
    <>
      <Grid
        sx={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3,1fr)",
          minHeight: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            gridColumn: "1/4",
            gridRow: "1/4",
          }}
          bg="muted"
        >
          <Video srcObject={remoteStream} autoPlay sx={{ width: "100%" }} />
        </Flex>
        <Flex
          id="remoteVideo"
          sx={{
            alignItems: "center",
            gridColumn: "1/2",
            gridRow: "3/4",
            margin: "auto",
          }}
          bg="muted"
        >
          <Video srcObject={localStream} autoPlay sx={{ width: "100%" }} />
        </Flex>
      </Grid>
    </>
  );
};

export default VideoRoom;
