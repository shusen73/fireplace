import React from "react";

import Videos from "../components/Videos";
const VideoRoom = ({ localStream, remoteStream }) => {
  return (
    <>
      <Videos localStream={localStream} remoteStream={remoteStream} />
    </>
  );
};

export default VideoRoom;

// const getUserMedia = async () => {
// let stream = null;
// try {
// stream = await window.navigator.mediaDevices.getUserMedia({
// video: true,
// audio: true,
// });
// } catch (err) {
// [> handle the error <]
// console.log(err);
// }
// return stream;
// };

// const getDisplayMedia = async () => {
//   let stream = null;
//   try {
//     stream = await navigator.mediaDevices.getDisplayMedia({
//       video: true,
//     });
//     console.log(stream);
//   } catch (err) {
//     /* handle the error */
//     console.log(err);
//   }
//   return stream;
// };

/* function replaceStream(peerConnections, mediaStream) {
  Object.keys(peerConnections).forEach((key) => {
    let connection = peerConnections[key];
    connection.forEach((c) => {
      for (var sender of c.peerConnection.getSenders()) {
        // if (sender.track.kind == "audio") {
        // if (mediaStream.getAudioTracks().length > 0) {
        // sender.replaceTrack(mediaStream.getAudioTracks()[0]);
        // }
        // }
        if (sender.track.kind === "video") {
          if (mediaStream.getVideoTracks().length > 0) {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        }
      }
    });
  });
} */
