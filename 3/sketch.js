let imgL1, imgL2, imgL3, imgL4; 
//框框們
let box = { x: 1400, y: 300, w: 260, h: 260 }; // 可移動框框
let originalBox = { x: 1400, y: 300, w: 260, h: 260 }; // 固定框框位置
let box2 = { x: 630, y: 150, w: 260, h: 260 }; // 可移動框框
let originalBox2 = { x: 630, y: 150, w: 260, h: 260 }; // 固定框框位置
let box3 = { x: 950, y: 450, w: 260, h: 260 }; // 可移動框框
let originalBox3 = { x: 950, y: 450, w: 260, h: 260 }; // 固定框框位置
//拖移yesORno
let dragging = false; 
let dragging2 = false; 
let dragging3 = false; 

let offsetX, offsetY; // 鼠标与框框左上角的偏移
let offsetX2, offsetY2;
let offsetX3, offsetY3;

let inRange = true; // 框框是否在原范围
let inRange2 = true;
let inRange3 = true;

let stage = 1;//三層故事

let message = ""; // 提示信息
let otherMessage = ""; // 用于drawOtherBox的提示信息

let otherBoxes = [ // 定义其他框框的位置和大小
  { x: 510, y: 120, w: 260, h: 260 },
  { x: 200, y: 10, w: 260, h: 260 },
];
let otherBoxes2 = [ // 定义其他框框的位置和大小
  { x: 1400, y: 300, w: 260, h: 260 },
  { x: 1100, y: 100, w: 260, h: 260 },
];
let otherBoxes3 = [ // 定义其他框框的位置和大小
  { x: 1400, y: 300, w: 260, h: 260 },
  { x: 630, y: 150, w: 260, h: 260 },
];

let scaleFactor = 1.1; // 放大倍数
let yesSound= new Audio('../music/yes.mp3');
yesSound.setVolume(1);


function preload() {
  // 预加载图片
  let L1 = loadImage("32.png");
  let L2 = loadImage("31.png");
  let L3 = loadImage("33.png");
  let L4 = loadImage("34.png");
  imgL1 = L1;
  imgL2 = L2;
  imgL3 = L3;
  imgL4 = L4;
}

function setup() {
  createCanvas(1920, 1080); // 画布大小
  textFont('Courier New');
  
}

function draw() {
  loadUI();
  background(255);
  
  //stages123
  if (stage==1){
  image(inRange ? imgL2 : imgL1, 0, 0, width, height);
   // 绘制固定框框的 L1 内容
   drawFixedBox(imgL1, originalBox);

   // 绘制可移动框框的内容（L2）
   drawDraggableBox(imgL2,box,originalBox) 
 
   // 绘制其他框框
   otherBoxes.forEach((box) => drawOtherBox(box.x, box.y, box.w, box.h));
   playSound()
 }
 if (stage==2){
  image(inRange2 ? imgL1: imgL3, 0, 0, width, height);
  // 绘制固定框框的 L1 内容
  drawFixedBox(imgL3, originalBox2);

  // 绘制可移动框框的内容（L2）
  drawDraggableBox(imgL2, box, originalBox);
  drawDraggableBox(imgL1,box2,originalBox2);

  // 绘制其他框框
  otherBoxes2.forEach((box) => drawOtherBox2(box.x, box.y, box.w, box.h));
  playSound()
 }

 if (stage==3){
  image(inRange3 ? imgL3: imgL4, 0, 0, width, height);
  // 绘制固定框框的 L1 内容
  drawFixedBox(imgL4, originalBox3);

  // 绘制可移动框框的内容（L2）
  drawDraggableBox(imgL1,box2,originalBox2) ;
  drawDraggableBox(imgL2, box, originalBox);
  drawDraggableBox(imgL3,box3,originalBox3) ;

  // 绘制其他框框
  otherBoxes3.forEach((box) => drawOtherBox3(box.x, box.y, box.w, box.h));
  playSound()

 }


  // 显示提示信息
  if (message) {
    let posX=130, posY=330;
    //rect
    fill(255, 150); // 设置背景颜色为黑色，带有一定透明度
  noStroke();
    rectMode(CENTER)
  let rectWidth = textWidth(message) + 20; // 根据文字内容动态设置矩形宽度，左右各留10px间距
  let rectHeight = 40; // 设置矩形高度
  rect(mouseX + 150, mouseY + 50, rectWidth, rectHeight, 10); // 绘制圆角矩形，圆角半径为10
    rectMode(CORNER)
    //word
    fill(0); // 设置文字为白色
    noStroke();
    textSize(28);
    textAlign(CENTER, CENTER); // 文本居中对齐
    text(message, mouseX + 150, mouseY + 50); // 显示在画布中央下方
  }

  // 显示drawOtherBox的提示信息
  if (otherMessage) {
    //rect
    fill(255, 150);
  noStroke();
  rectMode(CENTER);
  let rectWidth = textWidth(otherMessage) + 20; // 动态调整宽度
  let rectHeight = 40; 
  rect(mouseX + 100, mouseY + 50, rectWidth, rectHeight, 10);
  rectMode(CORNER)
    //word
    fill(0);
    noStroke();
    textSize(28);
    textAlign(CENTER, CENTER);
    text(otherMessage, mouseX + 100, mouseY + 50); // 显示在画布中央稍上方
  }

  //最後讓所有人都happy
  if (inRange3==false){
    otherBoxes3 = [ // 定义其他框框的位置和大小
      { x: 1430, y: 360, w: 260, h: 260 },
      { x: 780, y: 40, w: 260, h: 260 },
      { x: 1050, y: 300, w: 260, h: 260 }
    ];
    originalBox3 = { x: 1050, y: 300, w: 260, h: 260 };
  }else{
    otherBoxes3 = [ // 定义其他框框的位置和大小
      { x: 1400, y: 300, w: 260, h: 260 },
      { x: 530, y: 100, w: 260, h: 260 },
    ];
    originalBox3 = { x: 950, y: 450, w: 260, h: 260 };
  }
}

function drawOtherBox(x, y, w, h) {
  // 判断当前是否显示L2或L1图像
  let currentImage = inRange ? imgL2 : imgL1; // 使用inRange来判断是L2还是L1

  // 检测鼠标是否在框框范围内
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    // 放大框框和内容
    copy(currentImage, x, y, w, h, x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    cursor(MOVE);
  } else {
    // 正常绘制框框和内容
    copy(currentImage, x, y, w, h, x, y, w, h);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x, y, w, h);
    
  }
}


function drawFixedBox(image, originalBox) {
  copy(
    image, 
    originalBox.x, 
    originalBox.y, 
    originalBox.w, 
    originalBox.h, // From the image, cut the specified area
    originalBox.x, 
    originalBox.y, 
    originalBox.w, 
    originalBox.h // Display it in the fixed box position
  );

  // 绘制固定框框的边框
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(originalBox.x, originalBox.y, originalBox.w, originalBox.h);
}

function drawDraggableBox(image,box,originalBox) {
  // 检测鼠标是否在可移动框框范围内
  if (
    mouseX > box.x &&
    mouseX < box.x + box.w &&
    mouseY > box.y &&
    mouseY < box.y + box.h
  ) {
    // 放大框框和内容
    copy(image, originalBox.x, originalBox.y, originalBox.w, originalBox.h, box.x - (scaleFactor - 1) * box.w / 2, box.y - (scaleFactor - 1) * box.h / 2, box.w * scaleFactor, box.h * scaleFactor);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(box.x - (scaleFactor - 1) * box.w / 2, box.y - (scaleFactor - 1) * box.h / 2, box.w * scaleFactor, box.h * scaleFactor);
    cursor(MOVE);
  } else {
    // 正常绘制框框和内容
    copy(image, originalBox.x, originalBox.y, originalBox.w, originalBox.h, box.x, box.y, box.w, box.h);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(box.x, box.y, box.w, box.h);
    cursor(ARROW);
    
  }
}

//stage2
function drawOtherBox2(x, y, w, h) {
  // 判断当前是否显示L2或L1图像
  let currentImage = inRange2 ? imgL1 : imgL3; 

  // 检测鼠标是否在框框范围内
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    // 放大框框和内容
    copy(currentImage, x, y, w, h, x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    cursor(MOVE);
  } else {
    // 正常绘制框框和内容
    copy(currentImage, x, y, w, h, x, y, w, h);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x, y, w, h);
  }
}

//stage3
function drawOtherBox3(x, y, w, h) {
  // 判断当前是否显示L2或L1图像
  let currentImage = inRange3 ? imgL3 : imgL4; 

  // 检测鼠标是否在框框范围内
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    // 放大框框和内容
    copy(currentImage, x, y, w, h, x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x - (scaleFactor - 1) * w / 2, y - (scaleFactor - 1) * h / 2, w * scaleFactor, h * scaleFactor);
    cursor(MOVE);
  } else {
    // 正常绘制框框和内容
    copy(currentImage, x, y, w, h, x, y, w, h);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(x, y, w, h);
  }
}




function mousePressed() {
  let shakeOffset = 15; // 晃动的幅度
  let shakeSpeed = 15 // 晃动的速度，影响视觉效果
  let isShaking = false; // 判断是否正在晃动

  // Check if box1 is clicked
  if (stage == 1) {
    let result = check(box, otherBoxes, dragging, offsetX, offsetY);
    message = result.message;
    otherMessage = result.otherMessage;
    dragging = result.dragging;
    offsetX = result.offsetX;
    offsetY = result.offsetY;
  }

  // Check if box2 is clicked
  if (stage == 2) {
    //stage1
    let result1 = check(box, otherBoxes, dragging, offsetX, offsetY);
    message = result1.message;
    otherMessage = result1.otherMessage;
    dragging = result1.dragging;
    offsetX = result1.offsetX;
    offsetY = result1.offsetY;

    //stage2
    let result = check(box2, otherBoxes2, dragging2, offsetX2, offsetY2);
    message = result.message;
    otherMessage = result.otherMessage;
    dragging2 = result.dragging;
    offsetX2 = result.offsetX;
    offsetY2 = result.offsetY;
  }

  // Check if box3 is clicked
  if (stage == 3) {
    //stage1n2
    let result1 = check(box, otherBoxes, dragging, offsetX, offsetY);
    message = result1.message;
    otherMessage = result1.otherMessage;
    dragging = result1.dragging;
    offsetX = result1.offsetX;
    offsetY = result1.offsetY;
    let result2 = check(box2, otherBoxes2, dragging2, offsetX2, offsetY2);
    message = result2.message;
    otherMessage = result2.otherMessage;
    dragging2 = result2.dragging;
    offsetX2 = result2.offsetX;
    offsetY2 = result2.offsetY;

    //stage3
    let result = check(box3, otherBoxes3, dragging3, offsetX3, offsetY3);
    message = result.message;
    otherMessage = result.otherMessage;
    dragging3 = result.dragging;
    offsetX3 = result.offsetX;
    offsetY3 = result.offsetY;
  }
}

// 检查点击并处理框框的状态
function check(box, otherBoxes,dragging) {
  let shakeOffset = 15; // 晃动的幅度
  let shakeSpeed = 15;  // 晃动的速度，影响视觉效果
  let isShaking = false; // 判断是否正在晃动
  let message = "";
  let otherMessage = "";

  // 检测是否点击在移动框框上
  if (
    mouseX > box.x &&
    mouseX < box.x + box.w &&
    mouseY > box.y &&
    mouseY < box.y + box.h
  ) {
    dragging = true;
    offsetX = mouseX - box.x;
    offsetY = mouseY - box.y;

    if (!message) {
      message = "Solve the situation!";
      // 设置2秒后清空消息
      setTimeout(() => {
        message = "";
      }, 2000);
    }
  }

  // 检测是否点击在其他框框上
  for (let otherBox of otherBoxes) {
    if (
      mouseX > otherBox.x &&
      mouseX < otherBox.x + otherBox.w &&
      mouseY > otherBox.y &&
      mouseY < otherBox.y + otherBox.h
    ) {
      if (!otherMessage) {
        otherMessage = "nah he's happy";
        // 设置2秒后清空消息
        setTimeout(() => {
          otherMessage = "";
        }, 2000);
      }
      if (!isShaking) {
        isShaking = true;
        otherBox.x += shakeOffset;  // 向右移动
        setTimeout(() => {
          otherBox.x -= shakeOffset * 2;  // 向左移动
        }, shakeSpeed);
        setTimeout(() => {
          otherBox.x += shakeOffset;  // 恢复原位置
          isShaking = false; // 结束晃动
        }, shakeSpeed * 2);
      }
    }
  }

  // 返回处理后的消息和状态
  return { message, otherMessage, dragging,offsetX,offsetY };
  
  
}

function mouseDragged() {
  if (dragging) {
    box.x = mouseX - offsetX;
    box.y = mouseY - offsetY;

    // 检测框框是否离开初始范围
    if (
      box.x + box.w < originalBox.x ||
      box.x > originalBox.x + originalBox.w ||
      box.y + box.h < originalBox.y ||
      box.y > originalBox.y + originalBox.h
    ) {
      inRange = false;
      stage=2
    } else {
      inRange = true;
      stage=1
    }
  }

  if (dragging2) {
    box2.x = mouseX - offsetX2;
    box2.y = mouseY - offsetY2;

    // 检测框框是否离开初始范围
    if (
      box2.x + box2.w < originalBox2.x ||
      box2.x > originalBox2.x + originalBox2.w ||
      box2.y + box2.h < originalBox2.y ||
      box2.y > originalBox2.y + originalBox2.h
    ) {
      inRange2 = false;
      stage=3
    } else {
      inRange2 = true;
      stage=2
    }
  }

  if (dragging3) {
    box3.x = mouseX - offsetX3;
    box3.y = mouseY - offsetY3;

    // 检测框框是否离开初始范围
    if (
      box3.x + box3.w < originalBox3.x ||
      box3.x > originalBox3.x + originalBox3.w ||
      box3.y + box3.h < originalBox3.y ||
      box3.y > originalBox3.y + originalBox3.h
    ) {
      inRange3 = false;
      
    } else {
      inRange3 = true;
      
    }
  }
}

function mouseReleased() {
  dragging = false;
  dragging2 = false;
  dragging3 = false;
  //拖動後的位置與原位置的距離小於等於5px，回原位置
  returnPos(box,originalBox)
  returnPos(box2,originalBox2)
  returnPos(box3,originalBox3)

  
}

function returnPos(box,originalBox){
  // 計算可移動框框的位置與原始位置之間的距離
  let deltaX = Math.abs(box.x - originalBox.x);
  let deltaY = Math.abs(box.y - originalBox.y);

  // 拖動後的位置與原位置的距離小於等於5px，回原位置
  if (deltaX <= 70 && deltaY <= 70) {
    box.x = originalBox.x;
    box.y = originalBox.y;
  }
  // 否則，保持新的位置
  
}

function playSound() {
  // 檢查變量 dragging, dragging2, dragging3 是否為 true
  if (dragging || dragging2 || dragging3) {
      yesSound.play();
  }
}
