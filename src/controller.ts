import Player from "./player";

export default class Controller {
  player: Player;
  keys: any;

  constructor(player: Player) {
    this.player = player;
    this.keys = {};
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.keys[e.code] = true;
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keys[e.code] = false;
  }

  private keyIsPressed(code: string): boolean {
    return this.keys[code] || false;
  }

  update(dt: number) {
    if (this.keyIsPressed('KeyW')) {
      this.player.moveForward(dt);
    }
    if (this.keyIsPressed('KeyS')) {
      this.player.moveBackward(dt);
    }
    if (this.keyIsPressed('KeyA')) {
      this.player.turnLeft(dt);
    }
    if (this.keyIsPressed('KeyD')) {
      this.player.turnRight(dt);
    }
  }
}
