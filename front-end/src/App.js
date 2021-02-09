import React, { useEffect, useState } from "react";
import { ThemeProvider } from "theme-ui";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Peer from "peerjs";
import {} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import theme from "./theme";
import LandingPage from "./pages/LandingPage";
import VideoRoom from "./pages/VideoRoom";

const App = () => {
  const history = useHistory();
  const [localUserMedia, setLocalUserMedia] = useState();
  const [localDisplayMedia, setLocalDisplayMedia] = useState();
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [peer, setPeer] = useState(new Peer());
  const [remotePeerId, setRemotePeerId] = useState("");

  useEffect(() => {
    (async () => {
      setPeer(new Peer(uuidv4()));
      const userMedia = await getUserMedia();
      setLocalUserMedia(userMedia);
      setLocalStream(userMedia);
    })();
  }, []);

  useEffect(() => {
    if (peer == null) return;
    peer.on("call", async (call) => {
      // get user media
      call.answer(localStream); // Answer the call with an A/V stream.
      call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
      history.push("/video-room");
    });
  }, [localStream, peer]);

  const getUserMedia = async () => {
    let stream = null;
    try {
      stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch (err) {
      /* handle the error */
      console.log(err);
    }
    return stream;
  };
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <LandingPage
            peer={peer}
            localStream={localStream}
            remoteStream={remoteStream}
            setRemoteStream={setRemoteStream}
            remotePeerId={remotePeerId}
            setRemotePeerId={setRemotePeerId}
          />
        </Route>
        <Route path="/video-room">
          <VideoRoom
            localStream={localStream}
            remoteStream={remoteStream}
            peer={peer}
          />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
