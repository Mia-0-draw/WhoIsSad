let video1, video2;
let videoState = 0; // 0: Initial state, 1: spin.mp4, 2: spin2.mp4
let video1Finished = false;
let video2Finished = false;
let imgStart;
let squareSize = 200; // Size of each checkbox
let squareX1, squareX2, squareX3; // X positions for the three checkboxes
let squareY1, squareY2, squareY3; // Y position for all checkboxes
let tooltipText = ''; // Variable to store tooltip text

function setup() {
  createCanvas(1920, 1080);
  textFont('Courier New');
  extraCanvas = createGraphics(1920, 1080);
  extraCanvas.clear();
  
  // Load videos
  video1 = createVideo(['spin.mp4']);
  video1.size(width, height);
  video1.hide();
  
  video2 = createVideo(['spin2.mp4']);
  video2.size(width, height);
  video2.hide();
  
  // Set video end callbacks
  video1.onended(() => {
    video1Finished = true;
  });
  
  video2.onended(() => {
    video2Finished = true;
  });
  
  // Load start image
  imgStart = loadImage('0001.png');
  
  // Ensure video loads before playing
  video1.onloadedmetadata = () => {
    video1.play();
    video1.pause();  // Pause immediately to prevent starting from the beginning
  };
  
  loadUI(); // Assuming this is in ui.js
  info();
  createMessage();
}

function draw() {
  // Display start image if videoState is 0
  if (videoState === 0) {
    image(imgStart, 0, 0, width, height);
  }
  
  // Update positions based on videoState for all checkboxes
  if (videoState === 1) {
    image(video1, 0, 0);
    squareX1 = 620; 
    squareX2 = 1400;  
    squareX3 = 570;  
    squareY1 = 380; 
    squareY2 = 520;  
    squareY3 = 680;  
  } else if (videoState === 0 || videoState === 2) {
    image(video2, 0, 0);
    squareX1 = 700; 
    squareX2 = 1280; 
    squareX3 = 690;  
    squareY1 = 420; 
    squareY2 = 480;  
    squareY3 = 770;  
  }

  // Draw the checkboxes
  noFill();
  stroke(255,90);
  strokeWeight(3);
  rect(squareX1 - squareSize / 2, squareY1 - squareSize / 2, squareSize, squareSize);
  rect(squareX2 - squareSize / 2, squareY2 - squareSize / 2, squareSize, squareSize);
  rect(squareX3 - squareSize / 2, squareY3 - squareSize / 2, squareSize, squareSize);

  // Change cursor if hovering over any checkbox
  if (isMouseOnRect(squareX1, squareY1)) {
     cursor(HAND);
     tooltipText = "Check?";  // Set tooltip text for square 1
  } else if (isMouseOnRect(squareX2, squareY2)) {
     cursor(HAND);
     tooltipText = "Check?";  // Set tooltip text for square 2
  } else if (isMouseOnRect(squareX3, squareY3)) {
     cursor(HAND);
     tooltipText = "Check?";  // Set tooltip text for square 3
  } else {
    cursor(ARROW); // Default arrow cursor
    tooltipText = '';  // Clear tooltip text if mouse is not on any square
  }

  // Display the tooltip if the mouse is hovering over a square
  if (tooltipText !== '') {
    displayTooltip();
  }

  // Control message visibility (flashing)
  if (messageDiv != null) {
    if (frameCount % 70 < 50) {
      messageDiv.style('visibility', 'visible');
    } else {
      messageDiv.style('visibility', 'hidden');
    }
    messageTimer += deltaTime;
  } 
}

// Check if mouse is over a rectangle (checkbox)
function isMouseOnRect(x, y) {
  return mouseX > x - squareSize / 2 && mouseX < x + squareSize / 2 &&
         mouseY > y - squareSize / 2 && mouseY < y + squareSize / 2;
}

// Display the tooltip with the "Check?" text
function displayTooltip() {
  let tooltipWidth = textWidth(tooltipText) + 20; // Calculate the width of the tooltip
  let tooltipHeight = 40; // Fixed height for the tooltip
  let tooltipX = mouseX + 15; // Position it to the right of the mouse
  let tooltipY = mouseY + 15; // Position it slightly below the mouse
  
  // Draw the tooltip with rounded corners and semi-transparent white background
  fill(255, 255, 255, 200); // White background with 80% transparency
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 10); // Draw rounded rectangle

  // Draw the tooltip text in black
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(tooltipText, tooltipX + tooltipWidth / 2, tooltipY + tooltipHeight / 2);
}

function mouseDragged() {
  let xDelta = pmouseX - mouseX;
  
  // Change videoState when dragging and update video
  if (videoState === 0) {
    if (xDelta > 0) {
      videoState = 1;
    }
  }

  if (videoState === 1) {
    if (xDelta > 1) {
      if (video1.elt.paused && !video1Finished) {
        video1.play();
      }
    } else if (video1Finished) {
      video1.stop();
      videoState = 2;
      video1Finished = false;
    }
  }

  if (videoState === 2) {
    if (xDelta < -1) {
      if (video2.elt.paused && !video2Finished) {
        video2.play();
      }
    } else if (video2Finished) {
      video2.stop();
      videoState = 1;
      video2Finished = false;
    }
  }
}

function mouseClicked() {
  if (messageDiv) {
    messageDiv.remove();
    messageDiv = null;
  }

  // 检查是否点击了 rect1
  if (isMouseOnRect(squareX1, squareY1)) {
    window.location.href = "3/index.html"; // 跳转到另一个 p5.js 文件
  } else if (isMouseOnRect(squareX2, squareY2)) {
    window.location.href = "2/index.html"; // 跳转到另一个 p5.js 文件
  } else if (isMouseOnRect(squareX3, squareY3)) {
    window.location.href = "1/index.html"; // 跳转到另一个 p5.js 文件
  } else {
    tooltipText = ''; // 清空tooltip
  }
}


// Create flashing message
function createMessage() {
  messageTimer = millis();
  
  messageDiv = createDiv('Check The Scene');
  messageDiv.position(width / 2 - 100, height - 100);
  messageDiv.style('font-size', '24px');
  messageDiv.style('color', '#FFFFFF');
  messageDiv.style('text-align', 'center');
  messageDiv.style('visibility', 'visible');
  messageDiv.style('font-family', 'Courier New');
}

