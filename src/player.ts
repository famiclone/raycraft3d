import config from "./config";
import Game from "./game";
import { Vector2 } from "./math";

export default class Player {
  position: Vector2;
  angle: number;
  speed: number;
  rotationSpeed: number;
  fov: number;
  game: Game;

  constructor(game: Game, position: Vector2, angle: number, speed: number, fov: number) {
    this.game = game;
    this.position = position;
    this.angle = angle;
    this.speed = speed;
    this.fov = fov;
    this.rotationSpeed = 0.01;
  }


  update(dt: number) {
  }

  attack() {
    console.log('attack');
  }

  render(renderer: any, offsetX: number, offsetY: number) {
    const size = config.TILE_SIZE / 4;
    renderer.drawRect(this.position.x + offsetX * size, this.position.y + offsetY * size, size, size, 'red');
  }

  changeSpeed(speed: number) {
    this.speed = speed;
  }

  moveForward(dt: number) {
    this.position.x += Math.cos(this.angle) * this.speed * dt;
    this.position.y += Math.sin(this.angle) * this.speed * dt;
  }

  moveBackward(dt: number) {
    this.position.x -= Math.cos(this.angle) * this.speed * dt;
    this.position.y -= Math.sin(this.angle) * this.speed * dt;
  }

  moveLeft(dt: number) {
    this.position.x += Math.cos(this.angle - Math.PI / 2) * this.speed * dt / 2;
    this.position.y += Math.sin(this.angle - Math.PI / 2) * this.speed * dt / 2;
  }

  moveRight(dt: number) {
    this.position.x += Math.cos(this.angle + Math.PI / 2) * this.speed * dt / 2;
    this.position.y += Math.sin(this.angle + Math.PI / 2) * this.speed * dt / 2;
  }

  rotate(angle: number) {
    this.angle = angle
  }

  turnLeft(dt: number) {
    this.angle -= this.speed / 3 * dt;
  }

  turnRight(dt: number) {
    this.angle += this.speed / 3 * dt;
  }
}
