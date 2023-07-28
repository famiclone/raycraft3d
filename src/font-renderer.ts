const FONT_ZOOM = 2;

export default class FontRenderer {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  charWidth: number;
  charHeight: number;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, charWidth: number, charHeight: number) {
    this.ctx = ctx;
    this.image = image;
    this.charWidth = charWidth;
    this.charHeight = charHeight;
  }

  drawText(text: string, x: number, y: number) {
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i) - 32;
      const charX = (char % 16 - 1) * this.charWidth;
      const charY = Math.floor(char / 16)* this.charHeight;
      this.ctx.drawImage(this.image, charX, charY, this.charWidth, this.charHeight, x + i * this.charWidth * FONT_ZOOM, y, this.charWidth * FONT_ZOOM, this.charHeight * FONT_ZOOM);
    }
  }
}
