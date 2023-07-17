(()=>{"use strict";class t{constructor(t){this.player=t,this.keys={},document.addEventListener("keydown",(t=>this.onKeyDown(t))),document.addEventListener("keyup",(t=>this.onKeyUp(t)))}onKeyDown(t){this.keys[t.code]=!0}onKeyUp(t){this.keys[t.code]=!1}keyIsPressed(t){return this.keys[t]||!1}update(t){this.keyIsPressed("KeyW")&&this.player.moveForward(t),this.keyIsPressed("KeyS")&&this.player.moveBackward(t),this.keyIsPressed("KeyA")&&this.player.turnLeft(t),this.keyIsPressed("KeyD")&&this.player.turnRight(t)}}const e={WINDOW_WIDTH:640,WINDOW_HEIGHT:480,TILE_SIZE:16,FOV:1,VIEW_DISTANCE:100,WALL_HEIGHT:32};class s{constructor(t){this.grid=t}render(t){const s=e.TILE_SIZE/4;for(let e=0;e<this.grid.length;e++)for(let i=0;i<this.grid[e].length;i++){const r=this.grid[e][i];1===r?t.drawRect(i*s,e*s,s,s,"white"):2===r&&t.drawRect(i*s,e*s,s,s,"blue")}}getCell(t,e){return t=Math.floor(t),e=Math.floor(e),!(t<0||t>=this.grid[0].length||e<0||e>=this.grid.length)&&this.grid[e][t]}}class i{constructor(t,e){this._x=t,this._y=e}get x(){return this._x}get y(){return this._y}set x(t){this._x=t}set y(t){this._y=t}}class r{constructor(t,e,s,i){this.position=t,this.angle=e,this.speed=s,this.fov=i}update(t){}render(t){const s=e.TILE_SIZE/4;t.drawRect(this.position.x*s,this.position.y*s,s,s,"red")}changeSpeed(t){this.speed=t}moveForward(t){this.position.x+=Math.cos(this.angle)*this.speed*t,this.position.y+=Math.sin(this.angle)*this.speed*t}moveBackward(t){this.position.x-=Math.cos(this.angle)*this.speed*t,this.position.y-=Math.sin(this.angle)*this.speed*t}turnLeft(t){this.angle-=this.speed/5*t}turnRight(t){this.angle+=this.speed/5*t}}class h{constructor(t,e,s,i){this.canvas=t,this.canvas.width=e,this.canvas.height=s,this.canvas.style.backgroundColor="gray",this.ctx=t.getContext("2d"),this.map=i}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}drawRect(t,e,s,i,r){this.ctx.fillStyle=r,this.ctx.fillRect(t,e,s,i)}castRay(t,s,i){let r=t,h=s,a=i,n=0,o=null;const c=e.VIEW_DISTANCE;for(;n<c&&(r=t+n*Math.cos(a),h=s+n*Math.sin(a),o=this.map.getCell(Math.floor(r),Math.floor(h)),1!==o);)n+=.01;return{distance:n,object:o}}render(t){const s=this.canvas.width,i=(this.canvas.height,t.position.x),r=t.position.y,h=t.angle;this.clear();for(let t=0;t<s;t++){const a=h-e.FOV/2+t/s*e.FOV,n=this.castRay(i,r,a);this.renderColumn(t,n)}}renderColumn(t,s){const i=this.canvas.height,r=s.distance,h=s.object,a=e.TILE_SIZE/r*e.VIEW_DISTANCE,n=i/2-a/2,o=i/2+a/2,c=2===h?"blue":"white";this.drawRect(t,0,1,n,"black"),this.drawRect(t,n,1,a,c),this.drawRect(t,o,1,i-o,"black")}}class a{constructor(){this.lastTime=performance.now(),this.deltaTime=0,this.callback=()=>{}}start(t){this.callback=t,this.lastTime=performance.now(),this.loop()}loop(){const t=performance.now();this.deltaTime=t-this.lastTime,this.lastTime=t,this.callback(this.deltaTime),requestAnimationFrame((()=>this.loop()))}getDeltaTime(){return this.deltaTime}}const n=new class{constructor(e){this.map=new s([[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,1,1,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,1,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,2,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,2,2,1,2,1,0,1],[1,0,0,0,0,0,0,0,0,0,1,2,2,1,2,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,2,2,1,2,1,0,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,1,2,1,0,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,1,2,1,0,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,1,2,1,0,1],[1,2,2,2,2,2,2,2,2,2,1,2,2,1,2,1,0,1]]),this.assets=function(t){const e={};return t.forEach((t=>{const s=new Image;s.src=t,e[t]=s})),e}(["assets/texture.png"]),this.timer=new a,this.renderer=new h(document.querySelector("canvas"),e.WINDOW_WIDTH,e.WINDOW_HEIGHT,this.map),this.player=new r(new i(2,2),0,.005,e.FOV),this.controller=new t(this.player)}update(t){this.controller.update(t),this.player.update(t)}render(){this.renderer.clear(),this.renderer.render(this.player),this.map.render(this.renderer),this.player.render(this.renderer)}loop(t){this.update(t),this.render()}start(){this.timer.start((t=>this.loop(t)))}}(e);n.start()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEdBQ3BELENBQUMsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEVBQUcsRUFBRyxFQUFHLEtBRXhEckIsS0FBSzhGLE9DbkNOLFNBQW9CQyxHQUN2QixNQUFNRCxFQUFTLENBQUMsRUFNaEIsT0FMQUMsRUFBSUMsU0FBU0MsSUFDVCxNQUFNQyxFQUFNLElBQUlDLE1BQ2hCRCxFQUFJSCxJQUFNRSxFQUNWSCxFQUFPRyxHQUFRQyxDQUFHLElBRWZKLENBQ1gsQ0QyQnNCTSxDQUFXLENBQUMsdUJBQzFCcEcsS0FBS3FHLE1BQVEsSUFBSW5CLEVBQ2pCbEYsS0FBS3dCLFNBQVcsSUFBSXNCLEVBQVM1QyxTQUFTb0csY0FBYyxVQUFXVCxFQUFPOUUsYUFBYzhFLEVBQU83RSxjQUFlaEIsS0FBS2tELEtBQy9HbEQsS0FBS0QsT0FBUyxJQUFJc0MsRUFBTyxJQUFJSCxFQUFRLEVBQUcsR0FBSSxFQUFHLEtBQU8yRCxFQUFPM0UsS0FDN0RsQixLQUFLdUcsV0FBYSxJQUFJMUcsRUFBV0csS0FBS0QsT0FDMUMsQ0FDQVUsT0FBT0MsR0FDSFYsS0FBS3VHLFdBQVc5RixPQUFPQyxHQUN2QlYsS0FBS0QsT0FBT1UsT0FBT0MsRUFDdkIsQ0FDQWEsU0FDSXZCLEtBQUt3QixTQUFTK0IsUUFDZHZELEtBQUt3QixTQUFTRCxPQUFPdkIsS0FBS0QsUUFDMUJDLEtBQUtrRCxJQUFJM0IsT0FBT3ZCLEtBQUt3QixVQUNyQnhCLEtBQUtELE9BQU93QixPQUFPdkIsS0FBS3dCLFNBQzVCLENBQ0FpRSxLQUFLL0UsR0FDRFYsS0FBS1MsT0FBT0MsR0FDWlYsS0FBS3VCLFFBQ1QsQ0FDQWlFLFFBQ0l4RixLQUFLcUcsTUFBTWIsT0FBTzlFLEdBQU9WLEtBQUt5RixLQUFLL0UsSUFDdkMsR0R2RGtCLEdBQ3RCa0YsRUFBS0osTyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzYnAvLi9zcmMvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly90c2JwLy4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly90c2JwLy4vc3JjL21hcC50cyIsIndlYnBhY2s6Ly90c2JwLy4vc3JjL21hdGgudHMiLCJ3ZWJwYWNrOi8vdHNicC8uL3NyYy9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vdHNicC8uL3NyYy9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly90c2JwLy4vc3JjL3RpbWVyLnRzIiwid2VicGFjazovL3RzYnAvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHNicC8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL3RzYnAvLi9zcmMvdXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLmtleXMgPSB7fTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB0aGlzLm9uS2V5RG93bihlKSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHRoaXMub25LZXlVcChlKSk7XG4gICAgfVxuICAgIG9uS2V5RG93bihlKSB7XG4gICAgICAgIHRoaXMua2V5c1tlLmNvZGVdID0gdHJ1ZTtcbiAgICB9XG4gICAgb25LZXlVcChlKSB7XG4gICAgICAgIHRoaXMua2V5c1tlLmNvZGVdID0gZmFsc2U7XG4gICAgfVxuICAgIGtleUlzUHJlc3NlZChjb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleXNbY29kZV0gfHwgZmFsc2U7XG4gICAgfVxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5rZXlJc1ByZXNzZWQoJ0tleVcnKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUZvcndhcmQoZHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmtleUlzUHJlc3NlZCgnS2V5UycpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5tb3ZlQmFja3dhcmQoZHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmtleUlzUHJlc3NlZCgnS2V5QScpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci50dXJuTGVmdChkdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMua2V5SXNQcmVzc2VkKCdLZXlEJykpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnR1cm5SaWdodChkdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJjb25zdCBjb25maWcgPSB7XG4gICAgV0lORE9XX1dJRFRIOiA2NDAsXG4gICAgV0lORE9XX0hFSUdIVDogNDgwLFxuICAgIFRJTEVfU0laRTogMTYsXG4gICAgRk9WOiAxLFxuICAgIFZJRVdfRElTVEFOQ0U6IDEwMCxcbiAgICBXQUxMX0hFSUdIVDogMzIsXG59O1xuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoZ3JpZCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgIH1cbiAgICByZW5kZXIocmVuZGVyZXIpIHtcbiAgICAgICAgY29uc3QgdGlsZVNpemUgPSBjb25maWcuVElMRV9TSVpFIC8gNDtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5ncmlkW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMuZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5kcmF3UmVjdCh4ICogdGlsZVNpemUsIHkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplLCAnd2hpdGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGlsZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5kcmF3UmVjdCh4ICogdGlsZVNpemUsIHkgKiB0aWxlU2l6ZSwgdGlsZVNpemUsIHRpbGVTaXplLCAnYmx1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDZWxsKHgsIHkpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLmdyaWRbMF0ubGVuZ3RoIHx8IHkgPCAwIHx8IHkgPj0gdGhpcy5ncmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRbeV1beF07XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZlY3RvcjIge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH1cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuICAgIGdldCB5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG4gICAgc2V0IHgoeCkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICB9XG4gICAgc2V0IHkoeSkge1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICB9XG59XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgYW5nbGUsIHNwZWVkLCBmb3YpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5mb3YgPSBmb3Y7XG4gICAgfVxuICAgIHVwZGF0ZShkdCkge1xuICAgIH1cbiAgICByZW5kZXIocmVuZGVyZXIpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGNvbmZpZy5USUxFX1NJWkUgLyA0O1xuICAgICAgICByZW5kZXJlci5kcmF3UmVjdCh0aGlzLnBvc2l0aW9uLnggKiBzaXplLCB0aGlzLnBvc2l0aW9uLnkgKiBzaXplLCBzaXplLCBzaXplLCAncmVkJyk7XG4gICAgfVxuICAgIGNoYW5nZVNwZWVkKHNwZWVkKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG4gICAgbW92ZUZvcndhcmQoZHQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogZHQ7XG4gICAgfVxuICAgIG1vdmVCYWNrd2FyZChkdCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggLT0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSAtPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICB9XG4gICAgdHVybkxlZnQoZHQpIHtcbiAgICAgICAgdGhpcy5hbmdsZSAtPSB0aGlzLnNwZWVkIC8gNSAqIGR0O1xuICAgIH1cbiAgICB0dXJuUmlnaHQoZHQpIHtcbiAgICAgICAgdGhpcy5hbmdsZSArPSB0aGlzLnNwZWVkIC8gNSAqIGR0O1xuICAgIH1cbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCBtYXApIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyYXknO1xuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICBjYXN0UmF5KHgsIHksIGFuZ2xlKSB7XG4gICAgICAgIGxldCByYXlYID0geDtcbiAgICAgICAgbGV0IHJheVkgPSB5O1xuICAgICAgICBsZXQgcmF5QW5nbGUgPSBhbmdsZTtcbiAgICAgICAgbGV0IHJheURpc3RhbmNlID0gMDtcbiAgICAgICAgbGV0IG1hcENlbGwgPSBudWxsO1xuICAgICAgICBjb25zdCBtYXhEaXN0YW5jZSA9IGNvbmZpZy5WSUVXX0RJU1RBTkNFO1xuICAgICAgICB3aGlsZSAocmF5RGlzdGFuY2UgPCBtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgcmF5WCA9IHggKyByYXlEaXN0YW5jZSAqIE1hdGguY29zKHJheUFuZ2xlKTtcbiAgICAgICAgICAgIHJheVkgPSB5ICsgcmF5RGlzdGFuY2UgKiBNYXRoLnNpbihyYXlBbmdsZSk7XG4gICAgICAgICAgICBtYXBDZWxsID0gdGhpcy5tYXAuZ2V0Q2VsbChNYXRoLmZsb29yKHJheVgpLCBNYXRoLmZsb29yKHJheVkpKTtcbiAgICAgICAgICAgIGlmIChtYXBDZWxsID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXlEaXN0YW5jZSArPSAwLjAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXN0YW5jZTogcmF5RGlzdGFuY2UsXG4gICAgICAgICAgICBvYmplY3Q6IG1hcENlbGxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmVuZGVyKHBsYXllcikge1xuICAgICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGhhbGZTY3JlZW5XaWR0aCA9IHNjcmVlbldpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgaGFsZlNjcmVlbkhlaWdodCA9IHNjcmVlbkhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IHBsYXllclggPSBwbGF5ZXIucG9zaXRpb24ueDtcbiAgICAgICAgY29uc3QgcGxheWVyWSA9IHBsYXllci5wb3NpdGlvbi55O1xuICAgICAgICBjb25zdCBwbGF5ZXJBbmdsZSA9IHBsYXllci5hbmdsZTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBzY3JlZW5XaWR0aDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJheUFuZ2xlID0gKHBsYXllckFuZ2xlIC0gY29uZmlnLkZPViAvIDIpICsgKGNvbHVtbiAvIHNjcmVlbldpZHRoKSAqIGNvbmZpZy5GT1Y7XG4gICAgICAgICAgICBjb25zdCByYXkgPSB0aGlzLmNhc3RSYXkocGxheWVyWCwgcGxheWVyWSwgcmF5QW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJDb2x1bW4oY29sdW1uLCByYXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbHVtbihjb2x1bW4sIHJheSkge1xuICAgICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IHJheURpc3RhbmNlID0gcmF5LmRpc3RhbmNlO1xuICAgICAgICBjb25zdCByYXlPYmplY3QgPSByYXkub2JqZWN0O1xuICAgICAgICBjb25zdCB3YWxsSGVpZ2h0ID0gKGNvbmZpZy5USUxFX1NJWkUgLyByYXlEaXN0YW5jZSkgKiBjb25maWcuVklFV19ESVNUQU5DRTtcbiAgICAgICAgY29uc3Qgd2FsbFRvcCA9IChzY3JlZW5IZWlnaHQgLyAyKSAtICh3YWxsSGVpZ2h0IC8gMik7XG4gICAgICAgIGNvbnN0IHdhbGxCb3R0b20gPSAoc2NyZWVuSGVpZ2h0IC8gMikgKyAod2FsbEhlaWdodCAvIDIpO1xuICAgICAgICBjb25zdCB3YWxsQ29sb3IgPSAocmF5T2JqZWN0ID09PSAyKSA/ICdibHVlJyA6ICd3aGl0ZSc7XG4gICAgICAgIHRoaXMuZHJhd1JlY3QoY29sdW1uLCAwLCAxLCB3YWxsVG9wLCAnYmxhY2snKTtcbiAgICAgICAgdGhpcy5kcmF3UmVjdChjb2x1bW4sIHdhbGxUb3AsIDEsIHdhbGxIZWlnaHQsIHdhbGxDb2xvcik7XG4gICAgICAgIHRoaXMuZHJhd1JlY3QoY29sdW1uLCB3YWxsQm90dG9tLCAxLCBzY3JlZW5IZWlnaHQgLSB3YWxsQm90dG9tLCAnYmxhY2snKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4geyB9O1xuICAgIH1cbiAgICBzdGFydChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IChub3cgLSB0aGlzLmxhc3RUaW1lKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLmRlbHRhVGltZSk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmxvb3AoKSk7XG4gICAgfVxuICAgIGdldERlbHRhVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsdGFUaW1lO1xuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5jb25zdCBnYW1lID0gbmV3IEdhbWUoY29uZmlnKTtcbmdhbWUuc3RhcnQoKTtcbiIsImltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBNYXAgZnJvbSBcIi4vbWFwXCI7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4vbWF0aFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXJlclwiO1xuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCI7XG5pbXBvcnQgeyBsb2FkQXNzZXRzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoW1xuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDIsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDEsIDIsIDEsIDAsIDFdLFxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5hc3NldHMgPSBsb2FkQXNzZXRzKFsnYXNzZXRzL3RleHR1cmUucG5nJ10pO1xuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyksIGNvbmZpZy5XSU5ET1dfV0lEVEgsIGNvbmZpZy5XSU5ET1dfSEVJR0hULCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihuZXcgVmVjdG9yMigyLCAyKSwgMCwgMC4wMDUsIGNvbmZpZy5GT1YpO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzLnBsYXllcik7XG4gICAgfVxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudXBkYXRlKGR0KTtcbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5tYXAucmVuZGVyKHRoaXMucmVuZGVyZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIodGhpcy5yZW5kZXJlcik7XG4gICAgfVxuICAgIGxvb3AoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoZHQpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy50aW1lci5zdGFydCgoZHQpID0+IHRoaXMubG9vcChkdCkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBsb2FkQXNzZXRzKHNyYykge1xuICAgIGNvbnN0IGFzc2V0cyA9IHt9O1xuICAgIHNyYy5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gcGF0aDtcbiAgICAgICAgYXNzZXRzW3BhdGhdID0gaW1nO1xuICAgIH0pO1xuICAgIHJldHVybiBhc3NldHM7XG59XG4iXSwibmFtZXMiOlsiQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwicGxheWVyIiwidGhpcyIsImtleXMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwib25LZXlEb3duIiwib25LZXlVcCIsImNvZGUiLCJrZXlJc1ByZXNzZWQiLCJ1cGRhdGUiLCJkdCIsIm1vdmVGb3J3YXJkIiwibW92ZUJhY2t3YXJkIiwidHVybkxlZnQiLCJ0dXJuUmlnaHQiLCJXSU5ET1dfV0lEVEgiLCJXSU5ET1dfSEVJR0hUIiwiVElMRV9TSVpFIiwiRk9WIiwiVklFV19ESVNUQU5DRSIsIldBTExfSEVJR0hUIiwiTWFwIiwiZ3JpZCIsInJlbmRlciIsInJlbmRlcmVyIiwidGlsZVNpemUiLCJ5IiwibGVuZ3RoIiwieCIsInRpbGUiLCJkcmF3UmVjdCIsImdldENlbGwiLCJNYXRoIiwiZmxvb3IiLCJWZWN0b3IyIiwiX3giLCJfeSIsIlBsYXllciIsInBvc2l0aW9uIiwiYW5nbGUiLCJzcGVlZCIsImZvdiIsInNpemUiLCJjaGFuZ2VTcGVlZCIsImNvcyIsInNpbiIsIlJlbmRlcmVyIiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJtYXAiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImN0eCIsImdldENvbnRleHQiLCJjbGVhciIsImNsZWFyUmVjdCIsImNvbG9yIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJjYXN0UmF5IiwicmF5WCIsInJheVkiLCJyYXlBbmdsZSIsInJheURpc3RhbmNlIiwibWFwQ2VsbCIsIm1heERpc3RhbmNlIiwiZGlzdGFuY2UiLCJvYmplY3QiLCJzY3JlZW5XaWR0aCIsInBsYXllclgiLCJwbGF5ZXJZIiwicGxheWVyQW5nbGUiLCJjb2x1bW4iLCJyYXkiLCJyZW5kZXJDb2x1bW4iLCJzY3JlZW5IZWlnaHQiLCJyYXlPYmplY3QiLCJ3YWxsSGVpZ2h0Iiwid2FsbFRvcCIsIndhbGxCb3R0b20iLCJ3YWxsQ29sb3IiLCJUaW1lciIsImxhc3RUaW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJkZWx0YVRpbWUiLCJjYWxsYmFjayIsInN0YXJ0IiwibG9vcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImdldERlbHRhVGltZSIsImdhbWUiLCJjb25maWciLCJhc3NldHMiLCJzcmMiLCJmb3JFYWNoIiwicGF0aCIsImltZyIsIkltYWdlIiwibG9hZEFzc2V0cyIsInRpbWVyIiwicXVlcnlTZWxlY3RvciIsImNvbnRyb2xsZXIiXSwic291cmNlUm9vdCI6IiJ9