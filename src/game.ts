import Controller from "./controller";
import Map from "./map";
import { Vector2 } from "./math";
import Player from "./player";
import Renderer from "./renderer";
import Timer from "./timer";
import { Assets, loadAssets } from "./utils";

export default class Game {
  protected assets: Assets;
  private timer: Timer;
  private renderer: Renderer;
  private map = new Map([
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,0,7,2,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,0,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,7,7,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,7,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,7,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,7,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,0,7,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,7,7,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,7,2,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,7,2,2,7,2,7,0,7],
    [7,0,0,0,0,0,0,0,0,0,7,2,2,7,2,7,0,7],
    [7,7,7,7,7,7,7,7,7,7,7,2,2,7,2,7,0,7],
    [7,2,2,2,2,2,2,2,2,2,7,2,2,7,2,7,0,7],
    [7,2,2,2,2,2,2,2,2,2,7,2,2,7,2,7,0,7],
    [7,2,2,2,2,2,2,2,2,2,7,2,2,7,2,7,0,7],
    [7,2,2,2,2,2,2,2,2,2,7,2,2,7,2,7,0,7],
  ]);
  private player: Player;
  private controller: Controller;

  constructor(config: any) {
    this.assets = loadAssets(['assets/textures.png']);
    this.timer = new Timer();
    this.renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, config.WINDOW_WIDTH, config.WINDOW_HEIGHT, this.map, this.assets);
    this.player = new Player(new Vector2(2, 2), 0, 0.005, config.FOV);
    this.controller = new Controller(this.player);
  }

  update(dt: number) {
    this.controller.update(dt);
    this.player.update(dt);
  }

  render() {
    this.renderer.clear();
    this.renderer.render(this.player);
    this.map.render(this.renderer);
    this.player.render(this.renderer);
  }

  loop(dt: number) {
    this.update(dt);
    this.render();
  }

  public start() {
    this.timer.start((dt) => this.loop(dt));
  }
}
