import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";
import { Label, Radio } from "theme-ui";

import Videos from "../components/Videos";
const VideoRoom = ({
  localStream,
  remoteStream,
  setLocalStream,
  peer,
  remotePeerId,
}) => {
  const onScreenShare = async () => {
    const stream = await getDisplayMedia();
    localStream.removeTrack(localStream.getVideoTracks()[0]);
    localStream.addTrack(stream.getVideoTracks()[0]);
    //get connection
    console.log(remotePeerId);
    console.log(peer.connections);

    replaceStream(peer.connections, stream);
  };

  useEffect(() => {
    (async () => {})();
  }, []);

  useEffect(() => {});

  return (
    <>
      <Controls onScreenShare={onScreenShare} />
      <Videos localStream={localStream} remoteStream={remoteStream} />
    </>
  );
};

export default VideoRoom;

const Controls = ({ onScreenShare }) => {
  return (
    <>
      <Label>
        <Radio name="videoSource" value="true" defaultChecked={true} />
        Camera
      </Label>
      <Label>
        <Radio name="videoSource" value="false" onChange={onScreenShare} />
        Screen
      </Label>
    </>
  );
};

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

const getDisplayMedia = async () => {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    console.log(stream);
  } catch (err) {
    /* handle the error */
    console.log(err);
  }
  return stream;
};

function replaceStream(peerConnections, mediaStream) {
  Object.keys(peerConnections).forEach((key) => {
    let connection = peerConnections[key];
    connection.forEach((c) => {
      for (var sender of c.peerConnection.getSenders()) {
        // if (sender.track.kind == "audio") {
        // if (mediaStream.getAudioTracks().length > 0) {
        // sender.replaceTrack(mediaStream.getAudioTracks()[0]);
        // }
        // }
        if (sender.track.kind == "video") {
          if (mediaStream.getVideoTracks().length > 0) {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        }
      }
    });
  });
}
