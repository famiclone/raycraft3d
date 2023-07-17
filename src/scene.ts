interface Scene {
  enter(): void;
  exit(): void;
  update(dt: number): void;
  render(renderer: any): void;
}

class Scene implements Scene {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  enter() {}
  exit() {}
  update(dt: number) {}
  render(renderer: any) {} 
}

export default Scene;
