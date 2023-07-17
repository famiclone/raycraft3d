import config from "./config";
import Map from "./map";
import Player from "./player";

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private map: Map;

  constructor(canvas: HTMLCanvasElement, width: number, height: number, map: Map) {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = 'gray';
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.map = map;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawRect(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  public castRay(x: number, y: number, angle: number) {
    let rayX = x;
    let rayY = y;
    let rayAngle = angle;
    let rayDistance = 0;
    let mapCell = null;
    const maxDistance = config.VIEW_DISTANCE;

    while (rayDistance < maxDistance) {
      rayX = x + rayDistance * Math.cos(rayAngle);
      rayY = y + rayDistance * Math.sin(rayAngle);

      mapCell = this.map.getCell(Math.floor(rayX), Math.floor(rayY));

      if (mapCell === 1) {
        break;
      }

      rayDistance += 0.01;
    }

    return {
      distance: rayDistance,
      object: mapCell
    }
  }

  public render(player: Player) {
    const screenWidth = this.canvas.width;
    const screenHeight = this.canvas.height;

    const halfScreenWidth = screenWidth / 2;
    const halfScreenHeight = screenHeight / 2;

    const playerX = player.position.x;
    const playerY = player.position.y;
    const playerAngle = player.angle;

    this.clear();

    for (let column = 0; column < screenWidth; column++) {
      const rayAngle = (playerAngle - config.FOV / 2) + (column / screenWidth) * config.FOV;
      const ray = this.castRay(playerX, playerY, rayAngle);

      this.renderColumn(column, ray);
    }
  }

  private renderColumn(column: number, ray: any) {
    const screenHeight = this.canvas.height;

    const rayDistance = ray.distance;
    const rayObject = ray.object;

    const wallHeight = (config.TILE_SIZE / rayDistance) * config.VIEW_DISTANCE;

    const wallTop = (screenHeight / 2) - (wallHeight / 2);
    const wallBottom = (screenHeight / 2) + (wallHeight / 2);

    const wallColor = (rayObject === 2) ? 'blue' : 'white';

    this.drawRect(column, 0, 1, wallTop, 'black');
    this.drawRect(column, wallTop, 1, wallHeight, wallColor);
    this.drawRect(column, wallBottom, 1, screenHeight - wallBottom, 'black');
  }

}
