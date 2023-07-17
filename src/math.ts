export class Vector2 {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  set x(x: number) {
    this._x = x
  }

  set y(y: number) {
    this._y = y
  }
}
