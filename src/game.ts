import Controller from "./controller";
import Map from "./map";
import { Vector2 } from "./math";
import Player from "./player";
import Renderer from "./renderer";
import Timer from "./timer";
import { Assets, loadAssets } from "./utils";

export default class Game {
  protected assets: Assets;
  public timer: Timer;
  public renderer: Renderer;
  private map = new Map([
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 2, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 7, 0, 7],
    [7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 7, 0, 7],
  ]);
  private player: Player;
  private controller: Controller;
  public debug: boolean;

  constructor(config: any) {
    this.assets = loadAssets(['assets/textures.png', 'assets/font.png', 'assets/gui.png']);
    this.timer = new Timer();
    this.renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, config.WINDOW_WIDTH, config.WINDOW_HEIGHT, this.map, this.assets);
    this.player = new Player(this, new Vector2(2, 2), 0, 0.05, config.FOV);
    this.controller = new Controller(this, this.player);
    this.debug = true;
  }

  update(dt: number) {
    this.controller.update(dt);
    this.player.update(dt);
  }

  public getCanvas() {
    return this.renderer.getCanvas();
  }

  render() {
    this.renderer.clear();
    this.renderer.render(this.player);
    if (this.debug) {
      this.renderer.font.drawText('Raycraft3D 0.0.1', 0, 0);
      this.renderer.font.drawText(`${this.timer.getFPS('rounded')} fps `, 0, 16);
      this.renderer.font.drawText(`XY: ${this.player.position.x.toFixed(2)} / ${this.player.position.y.toFixed(2)}`, 0, 32);
      this.renderer.font.drawText(`Angle: ${this.player.angle.toFixed(2)}`, 0, 48);
      this.renderer.font.drawText(`ABCDEFGHJKLMNOPQRSTUVWXYZ: abcdefghjklmnopqrstuvwxyz 1234567890`, 0, 64);
      this.map.renderMiniMap(this.renderer, 128, 128, this.player);
      this.player.render(this.renderer, 0, 128);
    }
  }

  loop(dt: number) {
    this.update(dt);
    this.render();
  }

  public start() {
    this.timer.start((dt) => this.loop(dt));
  }
}
