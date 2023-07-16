export default class Timer {
  private lastTime: number;
  private deltaTime: number;
  private callback: (dt: number) => void;

  constructor() {
    this.lastTime = performance.now();
    this.deltaTime = 0;
    this.callback = () => {};
  }

  public start(callback: (dt: number) => void) {
    this.callback = callback;
    this.lastTime = performance.now();
    this.requestNextFrame();
  }

  private requestNextFrame() {
    requestAnimationFrame(() => this.loop());
  }

  private loop() {
    this.update();
    this.callback(this.deltaTime);
    this.requestNextFrame();
  }

  private update() {
    const now = performance.now();
    this.deltaTime = (now - this.lastTime);
    this.lastTime = now;
  }

  public getDeltaTime() {
    return this.deltaTime;
  }
}
