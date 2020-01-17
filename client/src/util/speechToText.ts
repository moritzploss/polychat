// interface Args {
//   language: string;
//   onTranscript: Function;
//   onQuiet: Function;
//   onStart: Function;
//   onError: Function;
//   autoRestart: boolean;
// }

// const speechToText = ({ language, onTranscript, onQuiet, onStart, onError, autoRestart = true }: Args): void => {
//   try {
//     const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = language;

//     recognition.onstart = (): void => {
//       onStart('### started speech reecognition ###');
//     };

//     recognition.onspeechend = (): void => {
//       onQuiet('### You were quiet for a while. Restarting speech recognition ###');
//       if (autoRestart) {
//         speechToText({ language, onTranscript, onQuiet, onStart, onError, autoRestart });
//       }
//     };

//     recognition.onerror = (event): void => {
//       if (event.error === 'no-speech') {
//         speechToText({ language, onTranscript, onQuiet, onStart, onError, autoRestart });
//       }
//     };

//     recognition.onresult = (event): void => {
//       const current = event.resultIndex;
//       const { transcript } = event.results[current][0];
//       onTranscript(transcript);
//     };

//     recognition.start();
//   } catch (e) {
//     onError(e);
//   }
// };

// export { speechToText };

export { };
