import Game from "./game";
import Player from "./player";

export default class Controller {
  game: Game;
  player: Player;
  keys: any;

  constructor(game: Game, player: Player) {
    this.game = game;
    this.player = player;
    this.keys = {};
    document.addEventListener('keydown', (e) => {
      if (e.code === 'F3') {
        console.log('FPS:', this.game.debug = !this.game.debug);
      } else {
        this.onKeyDown(e)
      }
    });
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
    this.game.getCanvas().addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mousedown', (e) => this.onMouseDown(e));
    //document.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  private onMouseDown(e: MouseEvent): void {
    this.player.attack();
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

  private onMouseMove(e: MouseEvent): void {
    console.log(e.movementX, e.movementY);
    this.player.rotate(this.player.angle + (e.movementX / 100));
  }

  update(dt: number) {
    if (this.keyIsPressed('KeyW')) {
      this.player.moveForward(dt);
    }
    if (this.keyIsPressed('KeyS')) {
      this.player.moveBackward(dt);
    }
    if (this.keyIsPressed('KeyA')) {
      this.player.moveLeft(dt);
    }
    if (this.keyIsPressed('KeyD')) {
      this.player.moveRight(dt);
    }
  }
}
