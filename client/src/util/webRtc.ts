// import Peer from 'simple-peer';

// import { speechToText } from './speechToText';

// const newPeer = (): Peer.Instance => (
//   new Peer({
//     initiator: false,
//     trickle: false,
//   })
// );

// const newInitiator = (): Peer.Instance => (
//   new Peer({
//     initiator: true,
//     trickle: false,
//   })
// );

// const constraints = {
//   video: {
//     width: { ideal: 1280 },
//     height: { ideal: 720 },
//   },
//   audio: true,
// };

// const addVideoStreamToHTMLElement = (stream: MediaStream, id = '#video-secondary', muted = true): void => {
//   const videoElement = document.querySelector(id);
//   if (videoElement) {
//     videoElement.srcObject = stream;
//     videoElement.muted = muted;
//     videoElement.play();
//     videoElement.addStream(stream);
//   }
// };

// const webRtcPeer = newInitiator();

// webRtcPeer.on('connect', async () => {
//   const stream = await navigator.mediaDevices.getUserMedia(constraints);
//   addVideoStreamToHTMLElement(stream);
// });

// // webRtcPeer.on('close', endWebRtc);

// webRtcPeer.on('signal', console.log);

// webRtcPeer.on('stream', (stream: MediaStream) => addVideoStreamToHTMLElement(stream, '#video'));

// export { newPeer, newInitiator };

export { };
