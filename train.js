class Train {
  
  constructor(img){
    this.r = 90;
    this.x = width;
    this.y = height - this.r;
    this.img = img;
  }
  
  move(){
    this.x -= 5;
  }
  
  show(){
    image(this.img, this.x, this.y, this.r, this.r);
  }
}