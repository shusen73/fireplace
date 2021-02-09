import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Text, Box, Flex, Button, Input, Heading, Divider } from "theme-ui";

const LandingPage = ({
  peer,
  localStream,
  remoteStream,
  setRemoteStream,
  remotePeerId,
  setRemotePeerId,
}) => {
  let history = useHistory();

  const mediaCallRemote = async (
    peer,
    remotePeerId,
    localStream,
    setRemoteStream
  ) => {
    var call = await peer.call(remotePeerId, localStream);
    call.on("stream", function (stream) {
      // Show stream in some video/canvas element.
      setRemoteStream(stream);
      history.push("/video-room");
    });
  };
  return (
    <>
      <Flex sx={{ minHeight: "100vh", alignItems: "center" }} p={3}>
        <Box
          onSubmit={(e) => e.preventDefault()}
          m={"auto"}
          sx={{ width: ["100%", "50%"] }}
        >
          <Text sx={{ fontSize: 5 }} my={3}>
            Your ID is:
          </Text>

          <Text
            sx={{
              fontSize: 4,
              textAlign: "center",
            }}
            m={3}
          >
            {peer?.id}
          </Text>
          <Text sx={{ fontSize: 5 }} my={3}>
            Connect to:
          </Text>
          <Input
            value={remotePeerId}
            onChange={(e) => {
              setRemotePeerId(e.target.value);
            }}
            my={3}
            sx={{ textAlign: "center", fontSize: 5 }}
          ></Input>
          <Button
            onClick={() =>
              mediaCallRemote(peer, remotePeerId, localStream, setRemoteStream)
            }
            my={3}
            sx={{ fontSize: 5, width: ["100%"] }}
          >
            Go
          </Button>
        </Box>
      </Flex>
    </>
  );
};
export default LandingPage;
