import Renderer from "./renderer";
import Timer from "./timer";

export default class Game {
  private timer: Timer;
  private renderer: Renderer;

  constructor() {
    this.timer = new Timer();
    this.renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement);
  }

  update(dt: number) {
  }

  render() {
    this.renderer.clear();
  }

  loop() {
    const dt = this.timer.getDeltaTime();

    this.update(dt);
    this.render();
  }

  public start() {
    this.timer.start(this.loop);
  }
}
