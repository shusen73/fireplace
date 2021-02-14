import React from "react";
import { useHistory } from "react-router-dom";

import { Text, Box, Flex, Button, Input } from "theme-ui";

const LandingPage = ({
  peer,
  localStream,
  setLocalStream,
  setRemoteStream,
  remotePeerId,
  setRemotePeerId,
}) => {
  let history = useHistory();

  const mediaCallRemote = async (peer, remotePeerId, setRemoteStream) => {
    const displayMedia = await getDisplayMedia();
    setLocalStream(displayMedia);

    var call = await peer.call(remotePeerId, displayMedia);
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
            sx={{ textAlign: "center", fontSize: 4 }}
          ></Input>
          <Button
            onClick={() => mediaCallRemote(peer, remotePeerId, setRemoteStream)}
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

const getDisplayMedia = async () => {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
  } catch (err) {
    /* handle the error */
    console.log(err);
  }
  return stream;
};
