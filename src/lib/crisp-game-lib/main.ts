import * as loop from "./loop";
import * as view from "./view";
import { Terminal } from "./terminal";
import * as input from "./input";
import * as keyboard from "./keyboard";
import * as pointer from "./pointer";
import { Vector, VectorLike } from "./vector";
import { Random } from "./random";
import * as collision from "./collision";
import { Color } from "./color";
import { defineCharacters, print, letterSize } from "./letter";
import * as _particle from "./particle";
import { times, remove } from "./util";
import { get as getButton, update as updateButton } from "./button";
import * as replay from "./replay";
import { Theme, ThemeName } from "./loop";
import * as sss from "../sounds-some-sounds/main";
declare const Terser;
declare const cloneDeep;

export type { Vector, VectorLike, Theme, ThemeName };
/**
 * Color name: *"transparent" | "white" | "red" | "green" | "blue" |
 *  "yellow" | "purple" | "cyan" | "black" | "light_red" | "light_green" |
 *  "light_blue" | "light_yellow" | "light_purple" | "light_cyan" | "light_black"*
 */
export type { Color };
export type { Options };
export type { Collision } from "./collision";
export type { LetterOptions } from "./letter";
export { clamp, wrap, range, times, remove, addWithCharCode } from "./util";
export { rect, box, bar, line, arc } from "./rect";
export { text, char } from "./letter";
/** Input state from the mouse, touch screen, or keyboard. */
export { input };
/** @ignore */
export { keyboard, pointer };
/** @ignore */
export { getButton, updateButton };
export const PI = Math.PI;
export const abs = Math.abs;
export const sin = Math.sin;
export const cos = Math.cos;
export const atan2 = Math.atan2;
export const sqrt = Math.sqrt;
export const pow = Math.pow;
export const floor = Math.floor;
export const round = Math.round;
export const ceil = Math.ceil;
/** A variable incremented by one every 1/60 of a second. */
export let ticks = 0;
/** A variable that is one at the beginning of the game, two after 1 minute, and increasing by one every minute. */
export let difficulty: number;
/** Game score. */
export let score = 0;
/** Game time. */
/** @ignore */
export let time: number;
/** A variable that becomes `true` if the game is replaying. */
/** @ignore */
export let isReplaying = false;
/** Type of sound effects. */
export type SoundEffectType =
  | "coin"
  | "laser"
  | "explosion"
  | "powerUp"
  | "hit"
  | "jump"
  | "select"
  | "lucky"
  | "random";

/**
 * Get a random float value.
 * If **high** parameter isn't specified, return a value from 0 to **lowOrHigh**.
 * @param lowOrHigh
 * @param high
 * @returns
 */
export function rnd(lowOrHigh: number = 1, high?: number) {
  return random.get(lowOrHigh, high);
}

/**
 * Get a random int value.
 * If **high** parameter isn't specified, return a value from 0 to **lowOrHigh**-1.
 * @param lowOrHigh
 * @param high
 * @returns
 */
export function rndi(lowOrHigh: number = 2, high?: number) {
  return random.getInt(lowOrHigh, high);
}

/**
 * Get a random float value that becomes negative with a one-half probability.
 * If **high** parameter isn't specified, return a value from -**lowOrHigh** to **lowOrHigh**.
 * @param lowOrHigh
 * @param high
 * @returns
 */
export function rnds(lowOrHigh: number = 1, high?: number) {
  return random.get(lowOrHigh, high) * random.getPlusOrMinus();
}

/**
 * Transition to the game-over state.
 * @param _gameOverText
 */
export function end(_gameOverText = "GAME OVER") {
  gameOverText = _gameOverText;
  initGameOver();
}

/**
 * Transition to the game complete state.
 * @param _gameOverText
 */
/** @ignore */
export function complete(completeText = "COMPLETE") {
  gameOverText = completeText;
  initGameOver();
}

/**
 * Add a score point.
 * @param value Point to add.
 * @param x An x-coordinate or `Vector` position where added point is displayed.
 * @param y A y-coordinate where added point is displayed.
 */
export function addScore(value: number, x?: number | VectorLike, y?: number) {
  if (isReplaying) {
    return;
  }
  score += value;
  if (x == null) {
    return;
  }
  const str = `${value >= 1 ? "+" : ""}${Math.floor(value)}`;
  let pos = new Vector();
  if (typeof x === "number") {
    pos.set(x, y);
  } else {
    pos.set(x);
  }
  pos.x -= (str.length * letterSize) / 2;
  pos.y -= letterSize / 2;
  scoreBoards.push({
    str,
    pos,
    vy: -2,
    ticks: 30,
  });
}

/**
 * Set the color for drawing rectangles, particles, texts, and characters.
 * Setting the color prior to `char()` will recolor the pixel art.
 * Use color("black") to restore and use the original colors.
 * @param colorName
 */
export function color(colorName: Color) {
  view.setColor(colorName);
}

/**
 * Add particles.
 * @param x
 * @param y
 * @param count Count of particles.
 * @param speed Speed of particles.
 * @param angle Angle of particles spreading.
 * @param angleWidth The range of angles over which particles diffuse. If omitted, it spreads in a circular shape.
 */
export function particle(
  x: number | VectorLike,
  y?: number,
  count?: number,
  speed?: number,
  angle?: number,
  angleWidth?: number
) {
  let pos = new Vector();
  if (typeof x === "number") {
    pos.set(x, y);
    _particle.add(pos, count, speed, angle, angleWidth);
  } else {
    pos.set(x);
    _particle.add(pos, y, count, speed, angle);
  }
}

/**
 * Return a `Vector` instance.
 * @param x
 * @param y
 * @returns
 */
export function vec(x?: number | VectorLike, y?: number) {
  return new Vector(x, y);
}

/**
 * Play a sound effect.
 * @param type
 */
export function play(type: SoundEffectType) {
  if (!isWaitingRewind && !isRewinding && isSoundEnabled) {
    sss.play(soundEffectTypeToString[type]);
  }
}

/**
 * Save and load game frame states. Used for realizing a rewind function.
 * @param frameState
 * @returns
 */
/** @ignore */
export function frameState(frameState: any) {
  if (isWaitingRewind) {
    const rs = replay.getLastFrameState(random);
    const bs = rs.baseState;
    score = bs.score;
    ticks = bs.ticks;
    return cloneDeep(rs.gameState);
  } else if (isRewinding) {
    const rs = replay.rewind(random);
    const bs = rs.baseState;
    score = bs.score;
    ticks = bs.ticks;
    return rs.gameState;
  } else if (isReplaying) {
    const rs = replay.getFrameStateForReplay();
    return rs.gameState;
  } else if (state === "inGame") {
    const baseState = { score, ticks };
    replay.recordFrameState(frameState, baseState, random);
  }
  return frameState;
}

/**
 * Rewind the game.
 */
/** @ignore */
export function rewind() {
  if (isRewinding || isWaitingRewind) {
    return;
  }
  if (!isReplaying && isRewindEnabled) {
    initRewind();
  } else {
    end();
  }
}

const soundEffectTypeToString: { [key in SoundEffectType]: string } = {
  coin: "c",
  laser: "l",
  explosion: "e",
  powerUp: "p",
  hit: "h",
  jump: "j",
  select: "s",
  lucky: "u",
  random: "r",
};
const defaultOptions: Options = {
  isPlayingBgm: false,
  isCapturing: false,
  isCapturingGameCanvasOnly: false,
  captureCanvasScale: 1,
  isShowingScore: true,
  isShowingTime: true,
  isReplayEnabled: false,
  isRewindEnabled: true,
  isDrawingParticleFront: false,
  isDrawingScoreFront: false,
  isMinifying: false,
  isSoundEnabled: true,
  recordingScoreInterval: 100,
  viewSize: { x: 100, y: 100 },
  seed: 0,
  theme: "simple",
};

declare let title: string;
declare let description: string;
declare let characters: string[];
/** Game setting options. */
declare type Options = {
  /** Play BGM. */
  isPlayingBgm?: boolean;
  /** Capture a screen by pressing 'c' key. */
  isCapturing?: boolean;
  /** Additional setting for isCapturing, will omit the margins on two sides when enabled. */
  isCapturingGameCanvasOnly?: boolean;
  /** Additional setting for isCapturingGameCanvasOnly, set the scale of the output file, default: 1. */
  captureCanvasScale?: number;
  /** Show a score and a hi-score, default: true. */
  isShowingScore?: boolean;
  /** Show a time. */
  /** @ignore */
  isShowingTime?: boolean;
  /** Enable replay of the previous game on the title screen. */
  isReplayEnabled?: boolean;
  /** Enable rewind. */
  /** @ignore */
  isRewindEnabled?: boolean;
  /** Display particles on the front of of the screen. */
  isDrawingParticleFront?: boolean;
  /** Display added score points on the front of the screen. */
  isDrawingScoreFront?: boolean;
  /** Show a minified code to the console. */
  /** @ignore */
  isMinifying?: boolean;
  /** Enable BGM and sound effects, default: true. */
  isSoundEnabled?: boolean;
  recordingScoreInterval?: number;
  /** Screen size of the game, default: {x: 100, y: 100}. */
  viewSize?: { x: number; y: number };
  /** Random number seed for BGM and sound effects generation. */
  seed?: number;
  /** Appearance theme of the game. */
  theme?: ThemeName;
};
declare let options: Options;
declare function update();

const seedRandom = new Random();
const random = new Random();
type State = "title" | "inGame" | "gameOver" | "rewind";
let state: State;
let updateFunc = {
  title: updateTitle,
  inGame: updateInGame,
  gameOver: updateGameOver,
  rewind: updateRewind,
};
let terminal: Terminal;
let hiScore = 0;
let fastestTime: number;
let isNoTitle = true;
let seed = 0;
let loopOptions;
let isPlayingBgm: boolean;
let isShowingScore: boolean;
let isShowingTime: boolean;
let isReplayEnabled: boolean;
let isRewindEnabled: boolean;
let isDrawingParticleFront: boolean;
let isDrawingScoreFront: boolean;
let isSoundEnabled: boolean;
let recordingScoreInterval: number;
let terminalSize: VectorLike;
let scoreBoards: { str: string; pos: Vector; vy: number; ticks: number }[];
let isWaitingRewind = false;
let isRewinding = false;
let rewindWaitingTicks: number;
let gameOverText: string;
let gameScriptFile: string;
let nextRecordingScore: number;

const rewindingToGameOverTicks = 300;

/** @ignore */
export function init(settings: {
  update: () => void;
  title?: string;
  description?: string;
  characters?: string[];
  options?: Options;
}) {
  const win: any = window;
  win.update = settings.update;
  win.title = settings.title;
  win.description = settings.description;
  win.characters = settings.characters;
  win.options = settings.options;
  onLoad();
}

/** @ignore */
export function onLoad() {
  let opts: Options;
  if (typeof options !== "undefined" && options != null) {
    opts = { ...defaultOptions, ...options };
  } else {
    opts = defaultOptions;
  }
  const theme = {
    name: opts.theme,
    isUsingPixi: false,
    isDarkColor: false,
  };
  if (opts.theme !== "simple" && opts.theme !== "dark") {
    theme.isUsingPixi = true;
  }
  if (
    opts.theme === "pixel" ||
    opts.theme === "shapeDark" ||
    opts.theme === "crt" ||
    opts.theme === "dark"
  ) {
    theme.isDarkColor = true;
  }
  loopOptions = {
    viewSize: { x: 100, y: 100 },
    bodyBackground: theme.isDarkColor ? "#101010" : "#e0e0e0",
    viewBackground: theme.isDarkColor ? "blue" : "white",
    theme,
    isSoundEnabled: opts.isSoundEnabled,
  };
  seed = opts.seed;
  loopOptions.isCapturing = opts.isCapturing;
  loopOptions.isCapturingGameCanvasOnly = opts.isCapturingGameCanvasOnly;
  loopOptions.captureCanvasScale = opts.captureCanvasScale;
  loopOptions.viewSize = opts.viewSize;
  isPlayingBgm = opts.isPlayingBgm;
  isShowingScore = opts.isShowingScore;
  isShowingTime = opts.isShowingTime;
  isReplayEnabled = opts.isReplayEnabled;
  isRewindEnabled = opts.isRewindEnabled;
  isDrawingParticleFront = opts.isDrawingParticleFront;
  isDrawingScoreFront = opts.isDrawingScoreFront;
  isSoundEnabled = opts.isSoundEnabled;
  recordingScoreInterval = opts.recordingScoreInterval;
  if (opts.isMinifying) {
    showMinifiedScript();
  }
  loop.init(_init, _update, loopOptions);
}

function _init() {
  if (
    typeof description !== "undefined" &&
    description != null &&
    description.trim().length > 0
  ) {
    isNoTitle = false;
    seed += getHash(description);
  }
  if (
    typeof title !== "undefined" &&
    title != null &&
    title.trim().length > 0
  ) {
    isNoTitle = false;
    document.title = title;
    seed += getHash(title);
  }
  if (typeof characters !== "undefined" && characters != null) {
    defineCharacters(characters, "a");
  }
  if (isSoundEnabled) {
    sss.init(seed);
  }
  const sz = loopOptions.viewSize;
  terminalSize = { x: Math.floor(sz.x / 6), y: Math.floor(sz.y / 6) };
  terminal = new Terminal(terminalSize);
  view.setColor("black");
  if (isNoTitle) {
    initInGame();
    ticks = 0;
  } else {
    initTitle();
  }
}

function _update() {
  df = difficulty = ticks / 3600 + 1;
  tc = ticks;
  const prevScore = score;
  const prevTime = time;
  sc = score;
  const prevSc = sc;
  inp = {
    p: input.pos,
    ip: input.isPressed,
    ijp: input.isJustPressed,
    ijr: input.isJustReleased,
  };
  collision.clear();
  updateFunc[state]();
  if (view.theme.isUsingPixi) {
    view.endFill();
    if (view.theme.name === "crt") {
      view.updateCrtFilter();
    }
  }
  ticks++;
  if (isReplaying) {
    score = prevScore;
    time = prevTime;
  } else if (sc !== prevSc) {
    score = sc;
  }
}

function initInGame() {
  state = "inGame";
  ticks = -1;
  _particle.init();
  score = 0;
  time = 0;
  nextRecordingScore = recordingScoreInterval;
  scoreBoards = [];
  if (isPlayingBgm && isSoundEnabled) {
    sss.playBgm();
  }
  sss.setAudioFileVolume(1);
  const randomSeed = seedRandom.getInt(999999999);
  random.setSeed(randomSeed);
  if (isReplayEnabled || isRewindEnabled) {
    replay.initRecord(randomSeed);
    replay.initFrameStates();
    isReplaying = false;
  }
}

function updateInGame() {
  terminal.clear();
  view.clear();
  if (!isDrawingParticleFront) {
    _particle.update();
  }
  if (!isDrawingScoreFront) {
    updateScoreBoards();
  }
  if (isReplayEnabled || isRewindEnabled) {
    replay.recordInput({
      pos: vec(input.pos),
      isPressed: input.isPressed,
      isJustPressed: input.isJustPressed,
      isJustReleased: input.isJustReleased,
    });
  }
  update();
  if (isDrawingParticleFront) {
    _particle.update();
  }
  if (isDrawingScoreFront) {
    updateScoreBoards();
  }
  if (score >= nextRecordingScore) {
    recordTime(time, nextRecordingScore);
    nextRecordingScore += recordingScoreInterval;
  }
  drawScoreOrTime();
  terminal.draw();
  if (isShowingTime && time != null) {
    time++;
  }
}

function initTitle() {
  state = "title";
  ticks = -1;
  _particle.init();
  terminal.clear();
  view.clear();
  if (replay.isRecorded()) {
    replay.initReplay(random);
    isReplaying = true;
  }
}

function updateTitle() {
  if (input.isJustPressed) {
    initInGame();
    return;
  }
  view.clear();
  if (isReplayEnabled && replay.isRecorded()) {
    replay.replayInput();
    inp = {
      p: input.pos,
      ip: input.isPressed,
      ijp: input.isJustPressed,
      ijr: input.isJustReleased,
    };
    if (!isDrawingParticleFront) {
      _particle.update();
    }
    update();
    if (isDrawingParticleFront) {
      _particle.update();
    }
  }
  if (ticks === 0) {
    drawScoreOrTime();
    if (typeof title !== "undefined" && title != null) {
      terminal.print(
        title,
        Math.floor(terminalSize.x - title.length) / 2,
        Math.ceil(terminalSize.y * 0.2)
      );
    }
  }
  if (ticks === 30 || ticks == 40) {
    if (typeof description !== "undefined" && description != null) {
      let maxLineLength = 0;
      description.split("\n").forEach((l) => {
        if (l.length > maxLineLength) {
          maxLineLength = l.length;
        }
      });
      const x = Math.floor((terminalSize.x - maxLineLength) / 2);
      description.split("\n").forEach((l, i) => {
        terminal.print(l, x, Math.floor(terminalSize.y / 2) + i);
      });
    }
  }
  terminal.draw();
}

function initGameOver() {
  state = "gameOver";
  if (!isReplaying) {
    input.clearJustPressed();
  }
  ticks = -1;
  isWaitingRewind = isRewinding = false;
  drawGameOver();
  if (isPlayingBgm && isSoundEnabled) {
    sss.stopBgm();
  }
  sss.stopAudioFile();
}

function updateGameOver() {
  if ((isReplaying || ticks > 20) && input.isJustPressed) {
    initInGame();
  } else if (ticks === (isReplayEnabled ? 120 : 300) && !isNoTitle) {
    initTitle();
  }
}

function drawGameOver() {
  if (isReplaying) {
    return;
  }
  terminal.print(
    gameOverText,
    Math.floor((terminalSize.x - gameOverText.length) / 2),
    Math.floor(terminalSize.y / 2)
  );
  terminal.draw();
}

function initRewind() {
  state = "rewind";
  isWaitingRewind = true;
  rewindWaitingTicks = 0;
  if (isPlayingBgm && isSoundEnabled) {
    sss.stopBgm();
  }
  sss.setAudioFileVolume(0.3);
}

function updateRewind() {
  terminal.clear();
  view.clear();
  update();
  drawScoreOrTime();
  replay.restoreInput();
  if (isRewinding) {
    if (replay.isFrameStateEmpty() || !input.isPressed) {
      stopRewind();
    }
  } else {
    if (input.isJustPressed) {
      isRewinding = true;
      isWaitingRewind = false;
    } else {
      rewindWaitingTicks++;
      if (rewindWaitingTicks > rewindingToGameOverTicks) {
        end();
      }
    }
  }
  terminal.draw();
  if (isShowingTime && time != null) {
    time++;
  }
}

function stopRewind() {
  isRewinding = false;
  state = "inGame";
  _particle.init();
  scoreBoards = [];
  if (isPlayingBgm && isSoundEnabled) {
    sss.playBgm();
  }
  sss.setAudioFileVolume(1);
}

function drawScoreOrTime() {
  if (isShowingScore) {
    if (score > 0) {
      terminal.print(`${Math.floor(score)}`, 0, 0);
    }
    if (hiScore > 0) {
      const hs = `${hiScore}`;
      terminal.print(hs, terminalSize.x - hs.length, 0);
    }
  }
  if (isShowingTime) {
    drawTime(time, 0, 1);
    drawTime(fastestTime, terminalSize.x - 8, 1);
  }
}

function drawTime(time: number, x: number, y: number) {
  if (time == null) {
    return;
  }
  let t = Math.floor((time * 100) / 50);
  if (t >= 100 * 60 * 100) {
    t -= 100 * 60 * 100;
  }
  const ts =
    getPaddedNumber(Math.floor(t / 6000), 2) +
    "'" +
    getPaddedNumber(Math.floor((t % 6000) / 100), 2) +
    '"' +
    getPaddedNumber(Math.floor(t % 100), 2);
  terminal.print(ts, x, y);
}

function getPaddedNumber(v: number, digit: number) {
  return ("0000" + v).slice(-digit);
}

function recordTime(time: number, score: number) {
  sss.play("select_recording_time", 2, 82);
  fastestTime = time;
  hiScore = score;
}

function updateScoreBoards() {
  view.saveCurrentColor();
  view.setColor("black");
  scoreBoards = scoreBoards.filter((sb) => {
    print(sb.str, sb.pos.x, sb.pos.y);
    sb.pos.y += sb.vy;
    sb.vy *= 0.9;
    sb.ticks--;
    return sb.ticks > 0;
  });
  view.loadCurrentColor();
}

function getHash(v: string) {
  let hash = 0;
  for (let i = 0; i < v.length; i++) {
    const chr = v.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

/** @ignore */
export function addGameScript() {
  let gameName = window.location.search.substring(1);
  gameName = gameName.replace(/[^A-Za-z0-9_-]/g, "");
  if (gameName.length === 0) {
    return;
  }
  const script = document.createElement("script");
  gameScriptFile = `${gameName}/main.js`;
  script.setAttribute("src", gameScriptFile);
  document.head.appendChild(script);
}

function showMinifiedScript() {
  fetch(gameScriptFile)
    .then((res) => res.text())
    .then((t) => {
      const minifiedScript: string = Terser.minify(t + "update();", {
        toplevel: true,
      }).code;
      const functionStartString = "function(){";
      const fi = minifiedScript.indexOf(functionStartString);
      const optionsString = "options={";
      const oi = minifiedScript.indexOf(optionsString);
      let minifiedUpdateScript = minifiedScript;
      if (fi >= 0) {
        minifiedUpdateScript = minifiedScript.substring(
          minifiedScript.indexOf(functionStartString) +
            functionStartString.length,
          minifiedScript.length - 4
        );
      } else if (oi >= 0) {
        let bc = 1;
        let ui;
        for (
          let i = oi + optionsString.length;
          i < minifiedScript.length;
          i++
        ) {
          const c = minifiedScript.charAt(i);
          if (c === "{") {
            bc++;
          } else if (c === "}") {
            bc--;
            if (bc === 0) {
              ui = i + 2;
              break;
            }
          }
        }
        if (bc === 0) {
          minifiedUpdateScript = minifiedScript.substring(ui);
        }
      }
      minifyReplaces.forEach(([o, r]) => {
        minifiedUpdateScript = minifiedUpdateScript.split(o).join(r);
      });
      console.log(minifiedUpdateScript);
      console.log(`${minifiedUpdateScript.length} letters`);
    });
}

/** @ignore */
export let inp: { p: Vector; ip: boolean; ijp: boolean; ijr: boolean };
/** @ignore */
export let clr = color;
/** @ignore */
export let ply = play;
/** @ignore */
export let tms = times;
/** @ignore */
export let rmv = remove;
/** @ignore */
export let tc: number;
/** @ignore */
export let df: number;
/** @ignore */
export let sc: number;
/** @ignore */
export const tr = "transparent";
/** @ignore */
export const wh = "white";
/** @ignore */
export const rd = "red";
/** @ignore */
export const gr = "green";
/** @ignore */
export const yl = "yellow";
/** @ignore */
export const bl = "blue";
/** @ignore */
export const pr = "purple";
/** @ignore */
export const cy = "cyan";
/** @ignore */
export const lc = "black";
/** @ignore */
export const cn = "coin";
/** @ignore */
export const ls = "laser";
/** @ignore */
export const ex = "explosion";
/** @ignore */
export const pw = "powerUp";
/** @ignore */
export const ht = "hit";
/** @ignore */
export const jm = "jump";
/** @ignore */
export const sl = "select";
/** @ignore */
export const uc = "lucky";

/** @ignore */
export let minifyReplaces = [
  ["===", "=="],
  ["!==", "!="],
  ["input.pos", "inp.p"],
  ["input.isPressed", "inp.ip"],
  ["input.isJustPressed", "inp.ijp"],
  ["input.isJustReleased", "inp.ijr"],
  ["color(", "clr("],
  ["play(", "ply("],
  ["times(", "tms("],
  ["remove(", "rmv("],
  ["ticks", "tc"],
  ["difficulty", "df"],
  ["score", "sc"],
  [".isColliding.rect.transparent", ".tr"],
  [".isColliding.rect.white", ".wh"],
  [".isColliding.rect.red", ".rd"],
  [".isColliding.rect.green", ".gr"],
  [".isColliding.rect.yellow", ".yl"],
  [".isColliding.rect.blue", ".bl"],
  [".isColliding.rect.purple", ".pr"],
  [".isColliding.rect.cyan", ".cy"],
  [".isColliding.rect.black", ".lc"],
  ['"transparent"', "tr"],
  ['"white"', "wh"],
  ['"red"', "rd"],
  ['"green"', "gr"],
  ['"yellow"', "yl"],
  ['"blue"', "bl"],
  ['"purple"', "pr"],
  ['"cyan"', "cy"],
  ['"black"', "lc"],
  ['"coin"', "cn"],
  ['"laser"', "ls"],
  ['"explosion"', "ex"],
  ['"powerUp"', "pw"],
  ['"hit"', "ht"],
  ['"jump"', "jm"],
  ['"select"', "sl"],
  ['"lucky"', "uc"],
];
