class Cat {
  constructor() {
    this.r = 100;
    this.x = 50;
    this.y = height - this.r;
    this.vx = 6;
    this.vy = 0;
    this.vy = 0;
    this.gravity = 1;
  }

  jump() {
    if(this.y >= height - this.r -5){
      this.vy = -25;
    }
  }
  
//   Hits collision check 
  hits(train){
//     Cat
    let x1 = this.x + this.r *0.5;
    let y1 = this.y + this.r *0.5;
//     train
    let x2 = train.x + train.r *0.5;
    let y2 = train.y + train.r *0.5;
    return    collideCircleCircle(x1,y1,this.r,x2,y2,train.r);
}

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  
  moveLeft(){
    this.x -= this.vx;
    this.x = constrain(this.x,0,width-this.r);
  }
  
  moveRight(){
    this.x += this.vx;
    this.x = constrain(this.x,0,width-this.r);
  }
  
  show() {
    image(cImg,this.x, this.y, this.r, this.r);
    fill(255,50);
    //ellipseMode(CORNER);
   // ellipse(this.x,this.y,this.r,this.r)
  }
}
