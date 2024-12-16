function setup() {
  createCanvas(1920, 1080); // 创建画布
  loadUI();                 // 调用顶部横幅加载函数
  info();
 
}
function draw() {

}


function loadUI() {
  let topBar = createDiv();
  topBar.position(0, -110);
  topBar.size(width, 70);
  //topBar.style('background-color', '#4A5E70');
  topBar.style('text-align', 'center');
  topBar.child(createP('WHO IS SAD').style('font-size', '140px').style('color', '#FFFFFF').style('font-family', 'Courier New'));
}
function info() {
  const boxSize = 45; // 每个框的大小
  const padding = 25; // 框之间的间隔
  const boxBorder = '2px solid white'; // 框的边框
  const boxColor = 'white'; // 默认框的颜色
  const textStyle = {
    'font-size': '24px',
    'color': boxColor, // 默认文字颜色为白色
    'margin': '0',
    'text-align': 'center',
  };

  // 创建问号框
  let questionBox = createDiv();
  questionBox.size(boxSize, boxSize);
  questionBox.position(width - boxSize * 2 - padding * 1.5, 25); // 调整位置
  questionBox.style('border', boxBorder); // 默认边框为白色
  questionBox.style('display', 'flex');
  questionBox.style('align-items', 'center');
  questionBox.style('justify-content', 'center');

  let questionMark = createP('?');
  for (let style in textStyle) questionMark.style(style, textStyle[style]).style('font-family', 'Courier New');
  questionBox.child(questionMark);
  questionBox.mousePressed(showInfoBox); // 点击触发信息框显示

  
  // 创建 "M" 框
  let mBox = createDiv();
  mBox.size(boxSize, boxSize);
  mBox.position(width - boxSize - padding, 25); // 调整位置
  mBox.style('border', boxBorder); // 默认边框为白色
  mBox.style('display', 'flex');
  mBox.style('align-items', 'center');
  mBox.style('justify-content', 'center');

  let mLetter = createP('M');
  for (let style in textStyle) mLetter.style(style, textStyle[style]).style('font-family', 'Courier New');
  mBox.child(mLetter);
  mBox.mousePressed(showAuthorBox);

// hover
let customGray = '#D0D0D0'; // 自定义灰色

questionBox.mouseOver(() => {
  questionBox.style('border', `2px solid ${customGray}`); // 使用模板字符串插入灰色
  questionMark.style('color', customGray); // 使用模板字符串插入灰色
});

questionBox.mouseOut(() => {
  questionBox.style('border', '2px solid white'); // 恢复边框为白色
  questionMark.style('color', 'white'); // 恢复文字为白色
});

// 鼠标悬停效果
mBox.mouseOver(() => {
  mBox.style('border', `2px solid ${customGray}`); // 使用模板字符串插入灰色
  mLetter.style('color', customGray); // 使用模板字符串插入灰色
});

mBox.mouseOut(() => {
  mBox.style('border', '2px solid white'); // 恢复边框为白色
  mLetter.style('color', 'white'); // 恢复文字为白色
});
}


// 显示信息框
function showInfoBox() {
  // 创建半透明背景
  overlay = createDiv();
  overlay.position(0, 0);
  overlay.size(width, height);
  overlay.style('background-color', 'rgba(0, 0, 0, 0.5)');
  overlay.style('z-index', '1000');
  overlay.mousePressed(hideInfoBox); // 点击背景关闭信息框

  // 创建白色信息框
  infoBox = createDiv();
  infoBox.position(width / 2 - 300, height / 2 - 300); // 居中
  infoBox.size(600, 600);
  infoBox.style('background-color', '#FFFFFF');
  infoBox.style('z-index', '1001');
  infoBox.style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.3)');
  infoBox.style('position', 'absolute');
  infoBox.mousePressed((e) => e.stopPropagation()); // 阻止事件冒泡到 overlay


 // 创建信息框中的内容
// 设置“Who’s Sad?”的内容并应用样式
let title = createP("Who is Sad?");
title.parent(infoBox);
title.style('text-align', 'left');
title.style('font-size', '32px'); // 设置字体大小为 32px
title.style('font-weight', 'bold'); // 设置字体为加粗
title.style('margin', '30px'); // 设置四周的距离为 25px
title.style('font-family', 'Courier New');
title.style('color', '#000');

// 设置其余的内容
let content = createP(idea);
content.parent(infoBox);
content.style('text-align', 'left');
content.style('margin', '30px'); // 四周的间距为 25px
content.style('font-size', '20px').style('font-family', 'Courier New');
content.style('color', '#000');


  // 创建关闭按钮
  closeButton = createDiv('X');
  closeButton.parent(infoBox);
  closeButton.size(30, 30);
  closeButton.position(560, 10); // 右上角
  closeButton.style('background-color', 	'	#6C6C6C');
  closeButton.style('color', '#FFFFFF').style('font-family', 'Courier New');
  closeButton.style('font-size', '18px');
  closeButton.style('text-align', 'center');
  closeButton.style('line-height', '30px');
  closeButton.style('cursor', 'pointer');
  closeButton.mousePressed(hideInfoBox); // 点击关闭按钮关闭信息框

  // 创建CN按钮
  LButton = createDiv('CN');
  LButton.parent(infoBox);
  LButton.size(30, 30);
  LButton.position(LanX,LanY); // 右上角
  LButton.style('background-color', 	Lcolor);
  LButton.style('color', '#FFFFFF').style('font-family', 'Courier New');
  LButton.style('font-size', '18px');
  LButton.style('text-align', 'center');
  LButton.style('line-height', '30px');
  LButton.style('cursor', 'pointer');
  LButton.mousePressed(switchLanguage); // 点击关闭按钮关闭信息框

}
//languageBotton
let LanX=300;LanY=560;Lcolor='	#9D9D9D'


// 隐藏信息框
function hideInfoBox() {
  if (overlay) overlay.remove();
  if (infoBox) infoBox.remove();
}
// 隐藏信息框
function hideInfoBox2() {
  if (overlay2) overlay2.remove();
  if (infoBox2) infoBox2.remove();
}

function switchLanguage() {
  showInfoBox2()
  hideInfoBox()
}
function switchLanguage2() {
  showInfoBox()
  hideInfoBox2()
}




// 显示信息框
function showInfoBox2() {
  // 创建半透明背景
  overlay2 = createDiv();
  overlay2.position(0, 0);
  overlay2.size(width, height);
  overlay2.style('background-color', 'rgba(0, 0, 0, 0.5)');
  overlay2.style('z-index', '1000');
  overlay2.mousePressed(hideInfoBox2); // 点击背景关闭信息框

  // 创建白色信息框
  infoBox2 = createDiv();
  infoBox2.position(width / 2 - 300, height / 2 - 300); // 居中
  infoBox2.size(600, 600);
  infoBox2.style('background-color', '#FFFFFF');
  infoBox2.style('z-index', '1001');
  infoBox2.style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.3)');
  infoBox2.style('position', 'absolute');
  infoBox2.mousePressed((e) => e.stopPropagation()); // 阻止事件冒泡到 overlay


 // 创建信息框中的内容
// 设置“Who’s Sad?”的内容并应用样式
let title2 = createP("Who is Sad?");
title2.parent(infoBox2);
title2.style('text-align', 'left');
title2.style('font-size', '32px'); // 设置字体大小为 32px
title2.style('font-weight', 'bold'); // 设置字体为加粗
title2.style('margin', '30px'); // 设置四周的距离为 25px
title2.style('font-family', 'Courier New');
title2.style('color', '#000');

// 设置其余的内容
let content2 = createP(ideaC);
content2.parent(infoBox2);
content2.style('text-align', 'left');
content2.style('margin', '30px'); // 四周的间距为 25px
content2.style('font-size', '20px').style('font-family', 'Courier New');
content2.style('color', '#000');


  // 创建关闭按钮
  closeButton2 = createDiv('X');
  closeButton2.parent(infoBox2);
  closeButton2.size(30, 30);
  closeButton2.position(560, 10); // 右上角
  closeButton2.style('background-color', 	'	#6C6C6C');
  closeButton2.style('color', '#FFFFFF').style('font-family', 'Courier New');
  closeButton2.style('font-size', '18px');
  closeButton2.style('text-align', 'center');
  closeButton2.style('line-height', '30px');
  closeButton2.style('cursor', 'pointer');
  closeButton2.mousePressed(hideInfoBox2); // 点击关闭按钮关闭信息框

  // 创建EN按钮
  LButton2 = createDiv('EN');
  LButton2.parent(infoBox2);
  LButton2.size(30, 30);
  LButton2.position(LanX,LanY); // 右上角
  LButton2.style('background-color', 	Lcolor);
  LButton2.style('color', '#FFFFFF').style('font-family', 'Courier New');
  LButton2.style('font-size', '18px');
  LButton2.style('text-align', 'center');
  LButton2.style('line-height', '30px');
  LButton2.style('cursor', 'pointer');
  LButton2.mousePressed(switchLanguage2); // 点击关闭按钮关闭信息框

}


// 顯示作者內容框
function showAuthorBox() {
  createOverlay();

  infoBox = createDiv();
  infoBox.position(width - 395, 85); // M框正下方，根據M框位置計算
  infoBox.size(370, 150);
  infoBox.style('background-color', '#FFFFFF');
  infoBox.style('z-index', '1001');
  infoBox.style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.3)');
  infoBox.style('position', 'fixed');

  let contact = createP('CONTACT:');
contact.parent(infoBox);
contact.style('text-align', 'left');
contact.style('font-size', '25px');
contact.style('font-weight', 'bold').style('font-family', 'Courier New');
contact.style('color', '#000');
contact.style('margin', '20px 0px 0 20px'); // 距离左边和右边各10像素

// 创建 "Insta" 部分并添加超链接
let instaMail = createP();
instaMail.parent(infoBox);
instaMail.style('text-align', 'left');
instaMail.style('font-size', '18px');
instaMail.style('font-weight', 'normal').style('font-family', 'Courier New');
instaMail.style('color', '#000');
instaMail.style('margin', '10px 20px 0 20px'); // 距离左边和右边各10像素

let instaLink = createA('https://www.instagram.com/mia_0_draw', 'Insta: @mia_0_draw');
instaLink.parent(instaMail);
instaLink.style('color', '#000'); // 设置链接颜色
instaLink.style('text-decoration', 'none'); // 去掉下划线

// 创建 "Mail" 部分并添加超链接
let instaMail2 = createP();
instaMail2.parent(infoBox);
instaMail2.style('text-align', 'left');
instaMail2.style('font-size', '18px');
instaMail2.style('font-weight', 'normal').style('font-family', 'Courier New');
instaMail2.style('color', '#000');
instaMail2.style('margin', '10px 20px 0 20px'); // 距离左边和右边各10像素

let mailLink = createA('mailto:miamiamiawork@gmail.com', 'Mail: miamiamiawork@gmail.com');
mailLink.parent(instaMail2);
mailLink.style('color', '#000'); // 设置链接颜色
mailLink.style('text-decoration', 'none'); // 去掉下划线

// 创建 "Resources" 部分
let resource = createP();
resource.parent(infoBox);
resource.style('text-align', 'right');
resource.style('font-size', '13px');
resource.style('font-weight', 'normal').style('font-family', 'Courier New');
resource.style('color', '#	9D9D9D');
resource.style('margin', '15px 30px 0 30px'); // 距离左边和右边各10像素

let resourceLink = createA('re/index.html', 'Resources');
resourceLink.parent(resource);
resourceLink.style('color', '	#9D9D9D'); // 设置链接颜色
resourceLink.style('text-decoration', 'none'); // 去掉下划线
resourceLink.style('text-decoration', 'underline');
// hover效果
resourceLink.mouseOver(() => {
  resourceLink.style('color', 'gray'); // 鼠标悬停时变灰
});
resourceLink.mouseOut(() => {
  resourceLink.style('color', '	#9D9D9D'); // 恢复原本颜色
});


//hover
instaLink.mouseOver(() => {
  instaLink.style('color', 'gray'); // 鼠标悬停时变灰
});
instaLink.mouseOut(() => {
  instaLink.style('color', '#000'); // 恢复原本颜色
});
mailLink.mouseOver(() => {
  mailLink.style('color', 'gray'); // 鼠标悬停时变灰
});
mailLink.mouseOut(() => {
  mailLink.style('color', '#000'); // 恢复原本颜色
});

  createCloseButton(infoBox);
}

// 創建半透明背景
function createOverlay() {
  overlay = createDiv();
  overlay.position(0, 0);
  overlay.size(width, height);
  overlay.style('background-color', 'rgba(0, 0, 0, 0)');
  overlay.style('z-index', '1000');
  overlay.style('position', 'fixed');
  overlay.mousePressed(hideInfoBox); // 點擊背景關閉
}


let idea =  `Secondary emotions often arise to cover or replace true feelings.<br>
While masking emotions can be a self-protection mechanism,
it does not truly solve the underlying issue.<br>
The girl who is laughed at may appear to smile,
but her real emotions are sadness and discomfort.<br>
This fake smile may only lead others to ignore her true feelings.<br>
Only by expressing true emotions can we encourage reflection, empathy, and support.<br><br>

Website Purpose:<br>
To help users experience how revealing 
a character's true emotions leads to positive change, <br>
allowing them to understand the importance 
of honestly expressing emotions.`

let ideaC = `次級情緒通常是為了掩蓋或替代真實情緒<br>而表現出來的情感反應。<br><br>
情緒的掩蓋雖然是自我保護機制，<br>然而卻無法真正解決問題。<br>
被笑的女孩表面上笑著，<br>但她真正的情緒是悲傷和不愉快的。<br>
假裝的笑容，<br>反而可能讓其他人繼續忽視她的感受。<br>
只有表達真實情緒才能讓人反思、同理與支持。<br><br>
網站目的:<br>
讓使用者體會在角色揭露自己真實情緒後，<br>事情出現一些正向變化，<br>讓使用者感受到「誠實表達情緒」的重要性。`