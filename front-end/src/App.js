import React, { useState } from "react";
import { ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "./theme";
import LandingPage from "./pages/LandingPage";
import VideoRoom from "./pages/VideoRoom";

const App = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage
              localStream={localStream}
              setLocalStream={setLocalStream}
              setRemoteStream={setRemoteStream}
            />
          </Route>
          <Route path="/video-room">
            <VideoRoom localStream={localStream} remoteStream={remoteStream} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
