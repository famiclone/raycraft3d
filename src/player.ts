import config from "./config";
import { Vector2 } from "./math";

export default class Player {
  position: Vector2;
  angle: number;
  speed: number;
  fov: number;

  constructor(position: Vector2, angle: number, speed: number, fov: number) {
    this.position = position;
    this.angle = angle;
    this.speed = speed;
    this.fov = fov;
  }


  update(dt: number) {
  }

  render(renderer: any) {
    const size = config.TILE_SIZE / 4;
    renderer.drawRect(this.position.x * size, this.position.y * size, size, size, 'red');
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

  turnLeft(dt: number) {
    this.angle -= this.speed / 5 * dt;
  }

  turnRight(dt: number) {
    this.angle += this.speed / 5 * dt;
  }
}
