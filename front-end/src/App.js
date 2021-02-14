import React, { useEffect, useState } from "react";
import { ThemeProvider } from "theme-ui";
import { Switch, Route, useHistory } from "react-router-dom";
import { } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import theme from "./theme";
import LandingPage from "./pages/LandingPage";
import VideoRoom from "./pages/VideoRoom";
const App = () => {
  const history = useHistory();
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [peer, setPeer] = useState();
  const [remotePeerId, setRemotePeerId] = useState("");

  useEffect(() => {
    (async () => {
      setPeer(new window.Peer(uuidv4()));
      
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
  }, [localStream, peer, history]);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <LandingPage
            peer={peer}
            localStream={localStream}
            remoteStream={remoteStream}
            setRemoteStream={setRemoteStream}
            setLocalStream={setLocalStream}
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

// const getUserMedia = async () => {
//   let stream = null;
//   try {
//     stream = await window.navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//   } catch (err) {
//     /* handle the error */
//     console.log(err);
//   }
//   return stream;
// };

