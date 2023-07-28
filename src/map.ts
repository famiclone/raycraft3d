import config from "./config";
import Player from "./player";

export default class Map {
  private grid: number[][];

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  renderMiniMap(renderer: any, _x: number, _y: number, player: Player) {
    const tileSize = config.TILE_SIZE;
    const mapWidth = this.grid[0].length;
    const mapHeight = this.grid.length;


    for (let y = 0; y < mapHeight; y += 1) {
      for (let x = 0; x < mapWidth; x += 1) {
        if (this.grid[y][x] === 7) {
          renderer.drawRect(_x + x * tileSize, _y + y * tileSize, tileSize, tileSize, 'black');
        }
      }
    } 

    renderer.drawRect(_x + player.position.x, _y + player.position.y, tileSize, tileSize, 'white');
    renderer.ctx.strokeStyle = 'red';
    renderer.ctx.lineWidth = 2;
    renderer.ctx.beginPath();
    renderer.ctx.moveTo(_x + player.position.x + tileSize / 2, _y + player.position.y + tileSize / 2);
    renderer.ctx.lineTo(_x + player.position.x + tileSize / 2 + Math.cos(player.angle) * tileSize, _y + player.position.y + tileSize / 2 + Math.sin(player.angle) * tileSize);
    renderer.ctx.stroke();
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
