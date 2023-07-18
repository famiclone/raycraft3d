import config from "./config";
import Map from "./map";
import Player from "./player";
import { Assets } from "./utils";

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private map: Map;
  private assets: Assets;

  constructor(canvas: HTMLCanvasElement, width: number, height: number, map: Map, assets: Assets) {
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = 'gray';
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.map = map;
    this.assets = assets;
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

    let xOffset = 0;
    let yOffset = 0;

    while (rayDistance < maxDistance) {
      rayX = x + rayDistance * Math.cos(rayAngle);
      rayY = y + rayDistance * Math.sin(rayAngle);

      mapCell = this.map.getCell(Math.floor(rayX), Math.floor(rayY));

      if (mapCell !== 0) {
        xOffset = rayX % 1;
        yOffset = rayY % 1;
        break;
      }

      rayDistance += 0.01;
    }


    const ray = {
      distance: rayDistance,
      object: mapCell,
      xOffset,
      yOffset,
    }

    return ray;
  }



  public render(player: Player) {
    const screenWidth = this.canvas.width;

    const playerX = player.position.x;
    const playerY = player.position.y;
    const playerAngle = player.angle;

    this.clear();

    for (let column = 0; column < screenWidth; column += config.COLUMN_WIDTH) {
      const rayAngle = (playerAngle - config.FOV / 2) + (column / screenWidth) * config.FOV;
      const ray = this.castRay(playerX, playerY, rayAngle);

      this.renderColumn(column, ray);
    }
  }


  private renderColumn(column: number, ray: any) {
    const screenHeight = this.canvas.height;
    const textureSize = 16;

    const rayDistance = ray.distance;
    const xOffset = ray.xOffset;
    const yOffset = ray.yOffset;

    const wallHeight = (config.TILE_SIZE / rayDistance) * config.VIEW_DISTANCE;

    const wallTop = (screenHeight / 2) - (wallHeight / 2);
    const wallBottom = (screenHeight / 2) + (wallHeight / 2);

    const columnWidth = wallHeight * config.COLUMN_WIDTH * 2;
    const texturePosition = [textureSize * ray.object, 0];

    // sky
    this.drawRect(column, 0, columnWidth, wallTop, 'skyblue');
    // this.drawRect(column, wallTop, columnWidth, wallHeight, wallColor);
    // ground
    this.drawRect(column, wallBottom, columnWidth, screenHeight - wallBottom, 'green')
    // texture
    this.ctx.drawImage(
      this.assets['assets/textures.png'],
      texturePosition[0] + Math.floor(xOffset * textureSize),
      texturePosition[1],
      columnWidth,
      textureSize,
      column,
      wallTop,
      columnWidth,
      wallHeight
    );
  }

}
