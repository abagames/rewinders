import { audioContext, getQuantizedTime, tempo } from "./audio";

let audioBuffer: AudioBuffer;
let gainNode: GainNode;
let bufferSourceNode: AudioBufferSourceNode;
let loopDuration: number;
let nextLoopTime: number;
let isPlaying = false;
let prevFileName: string;

export function init() {
  gainNode = audioContext.createGain();
  setAudioFileVolume();
  gainNode.connect(audioContext.destination);
}

export async function playAudioFile(fileName: string) {
  if (isPlaying) {
    stopAudioFile();
  }
  if (fileName === prevFileName) {
    playAudioBuffer();
    return;
  }
  prevFileName = fileName;
  const response = await fetch(fileName);
  const arrayBuffer = await response.arrayBuffer();
  audioContext.decodeAudioData(
    arrayBuffer,
    function (buffer) {
      audioBuffer = buffer;
      const bi = (60 / tempo) * 4;
      loopDuration = Math.floor(audioBuffer.duration / bi) * bi;
      playAudioBuffer();
    },
    function (e) {
      throw e;
    }
  );
}

export function setAudioFileVolume(volume = 1) {
  gainNode.gain.value = volume;
}

function playAudioBuffer() {
  nextLoopTime = getQuantizedTime(audioContext.currentTime);
  isPlaying = true;
  update();
}

export function stopAudioFile() {
  if (!isPlaying) {
    return;
  }
  isPlaying = false;
  bufferSourceNode.stop();
}

export function update() {
  if (!isPlaying) {
    return;
  }
  const time = audioContext.currentTime;
  if (time < nextLoopTime - 1) {
    return;
  }
  if (bufferSourceNode != null) {
    bufferSourceNode.stop(nextLoopTime);
  }
  bufferSourceNode = audioContext.createBufferSource();
  bufferSourceNode.buffer = audioBuffer;
  bufferSourceNode.connect(gainNode);
  bufferSourceNode.start =
    bufferSourceNode.start || (bufferSourceNode as any).noteOn;
  bufferSourceNode.start(nextLoopTime);
  nextLoopTime += loopDuration;
}
