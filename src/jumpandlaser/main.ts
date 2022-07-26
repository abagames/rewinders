import {
  addScore,
  color,
  frameState,
  init,
  input,
  particle,
  PI,
  play,
  rect,
  remove,
  rewind,
  rnd,
  rndi,
  sqrt,
  ticks,
  times,
  vec,
  Vector,
} from "../lib/crisp-game-lib/main";
import * as sss from "../lib/sounds-some-sounds/main";

const title = "JUMP AND LASER";

const description = `
[Tap]
 Jump / Double jump / Descent
[Hold]
 Rewind
`;

const characters = [];

const floorHeight = 90;
const maxJumpCount = 2;

type Player = {
  pos: Vector;
  vy: number;
  jumpCount: number;
  isOnFloor: boolean;
  multiplier: number;
  shots: Vector[];
  nextShotTicks: number;
};

let player: Player;

type Enemy = {
  pos: Vector;
  vx: number;
};

let enemies: Enemy[];
let nextEnemyTicks: number;
let nextWallTicks: number;
let nextCloudTicks: number;
let floorX: number;
let diff: number;

function update() {
  ({
    player,
    enemies,
    nextEnemyTicks,
    nextWallTicks,
    nextCloudTicks,
    floorX,
    diff,
  } = frameState({
    player,
    enemies,
    nextEnemyTicks,
    nextWallTicks,
    nextCloudTicks,
    floorX,
    diff,
  }));
  if (!ticks) {
    sss.setTempo(140);
    sss.setDelay();
    sss.playAudioFile("bgm.mp3");
    player = {
      pos: vec(30, 50),
      vy: 0,
      jumpCount: 9,
      isOnFloor: false,
      multiplier: 1,
      shots: [],
      nextShotTicks: 0,
    };
    enemies = [];
    nextEnemyTicks = 0;
    nextWallTicks = rnd(300, 400);
    nextCloudTicks = rnd(400, 500);
    floorX = 0;
    diff = 1;
  }
  diff += 1 / (60 * 60);
  const df = sqrt(sqrt(diff));
  color("light_black");
  rect(floorX, floorHeight, 210, 9);
  rect(floorX + 212, floorHeight, 210, 9);
  floorX -= df;
  if (floorX < -209) {
    floorX += 212;
  }
  if (!player.isOnFloor) {
    player.vy += (input.isPressed ? 0.2 : 0.4) * df;
    player.pos.y += player.vy;
    if (player.pos.y > floorHeight) {
      play("hit");
      player.pos.y = floorHeight;
      player.isOnFloor = true;
      player.jumpCount = 0;
      player.multiplier = 1;
    }
    player.nextShotTicks--;
    if (player.nextShotTicks < 0) {
      player.shots.push(vec(player.pos.x + 2, player.pos.y + 9));
      player.nextShotTicks += rnd(4, 9);
    }
  }
  if (input.isJustPressed) {
    if (player.jumpCount === maxJumpCount) {
      play("laser");
      player.vy += 9 * sqrt(df);
    } else if (player.jumpCount < maxJumpCount) {
      play("jump");
      player.vy = -4 * sqrt(df);
      player.isOnFloor = false;
    }
    player.jumpCount++;
  }
  color("cyan");
  rect(player.pos, 6, -6);
  if (!player.isOnFloor) {
    color("light_blue");
    rect(player.pos.x + 2, player.pos.y, 2, floorHeight - player.pos.y);
  }
  color("purple");
  remove(player.shots, (s) => {
    if (s.y > floorHeight) {
      particle(player.pos.x + 3, floorHeight, 3, 3, -PI / 2, PI / 7);
      return true;
    }
    rect(s, 2, -9);
    s.y += 6;
  });
  nextEnemyTicks--;
  nextWallTicks--;
  nextCloudTicks--;
  if (nextEnemyTicks < 0) {
    const vx = -rnd(1, 2) * df;
    enemies.push({ pos: vec(200, floorHeight), vx });
    nextEnemyTicks = rnd(30, 60) / sqrt(df);
  }
  if (nextWallTicks < 0) {
    const vx = -rnd(1, 2) * df;
    const c = rndi(3, 6);
    times(c, (i) => {
      enemies.push({ pos: vec(200, floorHeight - i * 6), vx });
    });
    nextWallTicks = rnd(100, 600) / sqrt(df);
  }
  if (nextCloudTicks < 0) {
    const vx = -rnd(1, 2) * df;
    const c = rndi(3, 6);
    const p = vec(206, rnd(40, 80));
    let a = rnd(PI * 2);
    times(c, () => {
      enemies.push({ pos: vec(p).addWithAngle(a, c), vx });
      a += (PI * 2) / c;
    });
    nextCloudTicks = rnd(100, 600) / sqrt(df);
  }
  color("red");
  remove(enemies, (e) => {
    e.pos.x += e.vx;
    const c = rect(e.pos, 6, -6).isColliding.rect;
    if (c.light_blue) {
      play("coin");
      addScore(player.multiplier, e.pos.x + player.multiplier * 2, e.pos.y);
      particle(e.pos.x + 2, e.pos.y, 3, 2, -PI / 2, PI);
      player.multiplier++;
      return true;
    } else if (c.cyan) {
      play("explosion");
      rewind();
    }
    return e.pos.x < -6;
  });
}

init({
  update,
  title,
  description,
  characters,
  options: {
    theme: "shapeDark",
    viewSize: { x: 200, y: 100 },
    isDrawingScoreFront: true,
    seed: 10,
  },
});
