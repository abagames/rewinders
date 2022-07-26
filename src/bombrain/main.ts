import {
  addScore,
  bar,
  box,
  color,
  frameState,
  init,
  input,
  line,
  PI,
  play,
  rect,
  remove,
  rewind,
  rnd,
  sqrt,
  ticks,
  vec,
  Vector,
} from "../lib/crisp-game-lib/main";
import * as sss from "../lib/sounds-some-sounds/main";

const title = "BOMB RAIN";

const description = `
[Hold]
 Aim / Rewind
[Release]
 Fire missile
`;

const characters = [];

type Bomb = {
  pos: Vector;
  vel: Vector;
  radius: number;
  radiusVel: number;
};

let bombs: Bomb[];
let nextBombTicks: number;

type Missile = {
  pos: Vector;
  angle: number;
  angleVel: number;
  speed: number;
};

let missile: Missile;
let turretAngle: number;
let multiplier: number;

function initMissile() {
  missile = {
    pos: vec(60, 90),
    angle: -PI / 2,
    angleVel: 1,
    speed: 0,
  };
}

let diff: number;

function update() {
  ({ bombs, nextBombTicks, missile, turretAngle, multiplier, diff } =
    frameState({
      bombs,
      nextBombTicks,
      missile,
      turretAngle,
      multiplier,
      diff,
    }));
  if (!ticks) {
    sss.setTempo(120);
    sss.setDelay();
    sss.playAudioFile("bgm.mp3");
    bombs = [];
    nextBombTicks = 0;
    initMissile();
    turretAngle = -PI / 2;
    multiplier = 1;
    diff = 1;
  }
  diff += 1 / (60 * 60);
  const df = sqrt(diff);
  color("light_black");
  rect(0, 90, 120, 9);
  if (missile.speed === 0) {
    turretAngle = vec(60, 90).angleTo(input.pos);
    if (turretAngle > PI / 2) {
      turretAngle = -PI;
    } else if (turretAngle > 0) {
      turretAngle = 0;
    }
    color("blue");
    line(60, 90, vec(50, 90).addWithAngle(turretAngle, 99), 2);
  }
  nextBombTicks--;
  if (nextBombTicks < 0) {
    const pos = vec(rnd(20, 100), -3);
    const tp = vec(rnd(30, 90), 90);
    bombs.push({
      pos,
      vel: tp
        .sub(pos)
        .normalize()
        .mul(rnd(1, 2) * sqrt(df) * 0.1),
      radius: 0,
      radiusVel: 0,
    });
    nextBombTicks = rnd(10, 30) / df;
  }
  color("red");
  bombs.forEach((b) => {
    if (b.radius !== 0) {
      box(b.pos, b.radius, b.radius);
    }
  });
  color("purple");
  remove(bombs, (b) => {
    b.pos.add(b.vel);
    if (b.radius !== 0) {
      b.vel.mul(1 - 0.02 * sqrt(df));
      b.radius += b.radiusVel;
      if (b.radius < 0) {
        return true;
      }
      if (b.radiusVel > 0 && b.radius > 20) {
        b.radiusVel *= -1;
      }
    } else {
      const c = box(b.pos, 6, 6).isColliding.rect;
      if (c.red) {
        play("explosion");
        b.radius = 1;
        b.radiusVel = sqrt(df);
        addScore(multiplier, b.pos);
        multiplier++;
      }
      if (c.light_black) {
        play("lucky");
        rewind();
      }
    }
  });
  color("cyan");
  if (missile.speed === 0) {
    missile.angle = turretAngle;
    bar(missile.pos, 5, 3, missile.angle, 0);
    if (input.isJustReleased) {
      play("select");
      missile.speed = sqrt(df) * 3;
      multiplier = 1;
    }
  } else {
    missile.pos.addWithAngle(missile.angle, missile.speed);
    const c = bar(missile.pos, 5, 3, missile.angle, 0).isColliding.rect;
    if (c.purple) {
      bombs.push({
        pos: vec(missile.pos),
        vel: vec().addWithAngle(missile.angle, missile.speed * 0.3),
        radius: 9,
        radiusVel: -sqrt(df) * 0.3,
      });
      initMissile();
    } else if (!missile.pos.isInRect(-9, -9, 118, 118)) {
      initMissile();
    }
  }
}

init({
  update,
  title,
  description,
  characters,
  options: {
    theme: "shapeDark",
    viewSize: { x: 120, y: 100 },
    isDrawingScoreFront: true,
    seed: 2,
  },
});
