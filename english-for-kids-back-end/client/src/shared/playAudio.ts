const playAudio = (src: string): void => {
  const audio = document.createElement('audio');
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

export default playAudio;
