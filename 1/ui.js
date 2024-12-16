let sadText = null; // Initialize as null
let sadText2 = null; // Initialize as null


function setup() {
  createCanvas(1920, 1080); // Create canvas


}

function draw() {
  // Call `loadUI` in `draw` to dynamically handle updates
  loadUI();
}

function loadUI() {
  // Create or reuse topBar
  let topBar = select('#topBar'); 
  if (!topBar) {
    topBar = createDiv().id('topBar');
    topBar.position(0, 820);
    topBar.size(width, 80);
    topBar.style('text-align', 'center');
  }

  if (inRange3) {
    // Remove sadText2 and CheckOther if they exist
    if (sadText2) {
      sadText2.remove();
      sadText2 = null;
    }

    // Create sadText if it doesn't already exist
    if (!sadText) {
      sadText = createP('WHO IS SAD')
        .style('font-size', '120px')
        .style('color', '#FFFFFF')
        .style('font-family', 'Courier New');
      topBar.child(sadText);
    }

    removeOther();
    removeRestart();
  } else {
    // Remove sadText if it exists
    if (sadText) {
      sadText.remove();
      sadText = null;
    }

    // Create sadText2 if it doesn't already exist
    if (!sadText2) {
      sadText2 = createP('EVERYONE IS HAPPY NOW')
        .style('font-size', '120px')
        .style('color', '#FFFFFF')
        .style('font-family', 'Courier New');
      topBar.child(sadText2);
    }

    // Add CheckOther link
    Other();
    Restart();
  }

  // Create "BACK" button
  createBackButton();
}

function Other() {
  let otherButton = select('#otherButton');
  if (!otherButton) {
    otherButton = createDiv('Check on Others').id('otherButton');
    otherButton.position(500, 880); // Position in the top-left corner
    otherButton.style('color', '#FFFFFF');
    otherButton.style('font-family', 'Courier New');
    otherButton.style('font-size', '30px');
    otherButton.style('cursor', 'pointer'); // Show hand cursor on hover
    otherButton.style('text-decoration', 'underline');

    otherButton.mouseOver(() => { 
      otherButton.style('font-size', '35px');
    });
    otherButton.mouseOut(() => { 
      otherButton.style('font-size', '30px');
    });
    otherButton.mousePressed(() => {
      window.location.href = "../index.html";
    });
  }
}
function removeOther() {
  let otherButton = select('#otherButton');
  if (otherButton) {
    otherButton.remove(); // Remove the Other button if it exists
  }
}

function Restart() {
  let restartButton = select('#restartButton');
  if (!restartButton) {
    restartButton = createDiv('Restart').id('restartButton');
    restartButton.position(1200, 880); // Position of the restart button
    restartButton.style('color', '#FFFFFF');
    restartButton.style('font-family', 'Courier New');
    restartButton.style('font-size', '30px');
    restartButton.style('cursor', 'pointer'); // Show hand cursor on hover
    restartButton.style('text-decoration', 'underline');

    restartButton.mouseOver(() => { 
      restartButton.style('font-size', '35px');
    });
    restartButton.mouseOut(() => { 
      restartButton.style('font-size', '30px');
    });
    restartButton.mousePressed(() => {
      window.location.reload(); // Reload the current page to restart
    });
  }
}

function removeRestart() {
  let restartButton = select('#restartButton');
  if (restartButton) {
    restartButton.remove(); // Remove the Restart button if it exists
  }
}


function createBackButton() {
  let backButton = select('#backButton');
  if (!backButton) {
    backButton = createDiv('< BACK').id('backButton');
    backButton.position(40, 40); // Position in the top-left corner
    backButton.style('color', '#FFFFFF');
    backButton.style('font-family', 'Courier New');
    backButton.style('font-size', '30px');
    backButton.style('cursor', 'pointer'); // Show hand cursor on hover
    backButton.mouseOver(() => { 
      backButton.style('font-size', '35px');
    });
    backButton.mouseOut(() => { 
      backButton.style('font-size', '30px');
    });
    backButton.mousePressed(() => {
      window.location.href = "../index.html";
    });
  }
}
