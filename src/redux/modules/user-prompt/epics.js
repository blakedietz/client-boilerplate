// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
  console.log("Prompted");
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
  // Stash the event so it can be triggered later.
  // deferredPrompt = e;
// });

// const windoeOnPwaPromptEpic = (action$) => action$.ofType("@@INIT")
  // Observable.fromEvent(window, 'keyup')
  //   .map(event => ({
  //     type: 'KEY_UP',
  //     key: event.key,
  //     event
  //   }));

// const playAlarmEpic = (action$) => action$.ofType(completeCountdown)
//   .map(() => {
//     // eslint-disable-next-line no-undef
//     const audio = new Audio("https://freesound.org/data/previews/250/250629_4486188-lq.mp3");
//     audio.play();
//
//     return playAlarm();
//   });
