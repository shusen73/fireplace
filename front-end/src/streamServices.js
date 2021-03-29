export const getLocalStream = async () => {
  console.log("get local stream");
  let stream = await window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  return stream;
};
