var database,balloonpos;
var balloon,balloon2;
var backGround;
var pos;
function preload(){
  backGround = loadImage("Hot Air Ballon-01.png");
  balloon2 = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png","Hot Air Ballon-04.png");
 
}
function setup() {
  createCanvas(500,500);
  database = firebase.database();
  console.log(database);
  balloonpos = database.ref('balloon/height')
  balloonpos.on("value",readPosition,showError)

  balloon = createSprite(250,250,100,100);
  balloon.addAnimation("hotAir",balloon2);
  balloon.scale=0.5;
}

function draw() {
  background(backGround); 

  if(pos !== undefined){
    if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-1)
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,1)
    balloon.scale=balloon.scale+0.01;
  }
}
  drawSprites();
}
function readPosition(hello){
pos = hello.val()
balloon.x = pos.x
balloon.y = pos.y
console.log(pos.x)

}
function showError(){
console.log("error")
}
function changePosition(x,y){
  database.ref('balloon/height').set({
    'x': pos.x + x,
    'y': pos.y + y
  })
}