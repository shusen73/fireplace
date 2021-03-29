import React, { useState, useEffect } from "react";
import Peer from "peerjs";
import Video from "./Video";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";

import Videos from "./Videos";
import PeerForm from "./PeerForm";
import { getLocalStream } from "./streamServices";
import { StyledApp } from "./App.styled";
import GlobalStyle from "./globalStyles";

interface Props {
  localPeerId: string;
  callRemotePeer: (id: string) => void;
}

function App() {
  const [showVideos, setShowVideos] = useState(false);
  const [peer, setPeer] = useState(new Peer(uuidv4()));
  const [localStream, setLocalStream] = useState(new MediaStream());
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  useEffect(() => {
    peer.on("call", async (call) => {
      setShowVideos(true);
      const stream = await getLocalStream();
      setLocalStream(stream);
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
    });
  }, [peer]);

  const callRemotePeer = async (id: string) => {
    console.log("call remote");
    const localStream = await getLocalStream();
    setLocalStream(localStream);
    const call = peer.call(id, localStream);
    setShowVideos(true);
    call.on("stream", function (stream) {
      setRemoteStream(stream);
    });
  };

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {showVideos ? (
          <Videos localStream={localStream} remoteStream={remoteStream} />
        ) : (
          <PeerForm localPeerId={peer.id} onSubmit={callRemotePeer} />
        )}
      </StyledApp>
    </>
  );
}

export default App;
