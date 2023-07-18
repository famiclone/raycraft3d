import config from "./config";

export default class Map {
  private grid: number[][];

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  render(renderer: any) {
    const tileSize = config.TILE_SIZE / 4

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const tile = this.grid[y][x];
        if (tile === 7) {
          renderer.drawRect(x * tileSize, y * tileSize, tileSize, tileSize, 'white');
        } else if (tile === 2) {
          renderer.drawRect(x * tileSize, y * tileSize, tileSize, tileSize, 'blue');
        }
      }
    }
  }

  public getCell(x: number, y: number) {
    x = Math.floor(x);
    y = Math.floor(y);

    if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
      return false;
    }
    return this.grid[y][x];
  }
}
