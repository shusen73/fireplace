import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import { Text, Box, Flex, Button, Input } from "theme-ui";

const LandingPage = ({ localStream, setLocalStream, setRemoteStream }) => {
  const [peer, setPeer] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState("");
  let history = useHistory();
  useEffect(() => {
    setPeer(new Peer(uuidv4()));
  }, []);

  useEffect(() => {
    if (peer == null) return;
    peer.on("call", async (call) => {
      // get user media
      const stream = await getUserMedia();
      setLocalStream(stream);
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        history.push("./video-room");
      });
    });
  }, [peer]);
  const getUserMedia = async () => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch (err) {
      /* handle the error */
      console.log(err);
    }
    return stream;
  };

  const mediaCallRemote = async () => {
    let stream = await getUserMedia();
    setLocalStream(stream);
    var call = peer.call(remotePeerId, stream);
    call.on("stream", function (remoteStream) {
      // Show stream in some video/canvas element.
      setRemoteStream(remoteStream);
      history.push("/video-room");
    });
  };
  return (
    <>
      <Flex sx={{ minHeight: "100vh", alignItems: "center" }} p={3} bg="muted">
        <Box
          onSubmit={(e) => e.preventDefault()}
          m={"auto"}
          sx={{ width: ["100%", "50%"] }}
        >
          <Text sx={{}} my={3}>
            Your ID is:
          </Text>
          <Text m={3}>{peer?.id}</Text>
          <Text sx={{}} my={3}>
            Connect to:
          </Text>
          <Input
            value={remotePeerId}
            onChange={(e) => {
              setRemotePeerId(e.target.value);
            }}
            my={3}
          ></Input>
          <Flex sx={{ alignItems: "center" }}>
            <Button
              onClick={() => mediaCallRemote(peer, remotePeerId, localStream)}
              my={3}
              sx={{ width: ["100%"] }}
            >
              Go
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
export default LandingPage;
