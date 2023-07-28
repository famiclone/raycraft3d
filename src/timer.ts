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
    this.loop();
  }

  private loop() {
    const now = performance.now();
    this.deltaTime = (now - this.lastTime);
    this.lastTime = now;
    this.callback(this.deltaTime);
    requestAnimationFrame(() => this.loop());
  }

  public getDeltaTime() {
    return this.deltaTime;
  }

  public getFPS(type: string = 'raw') {
    if (type === 'raw') {
      return 1000 / this.deltaTime;
    } else if (type === 'rounded') {
      return Math.round(1000 / this.deltaTime);
    }
  }
}
