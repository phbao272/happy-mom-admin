export const playSoundSuccess = () => {
  const audio = new Audio("/audios/success.mp3");
  audio.play();
};

export const playSoundError = () => {
  const audio = new Audio("/audios/error.mp3");
  audio.play();
};
