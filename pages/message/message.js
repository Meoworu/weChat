
// 手指按下时的坐标
var startX = 0;
var startY = 0;

// 手指移动的坐标
var moveX = 0;
var moveY = 0;

// 手指在两个坐标轴上的移动距离
var spaceX = 0;
var spaceY = 0;

// 手指移动方向
var direction = "right";

// 蛇头方向
var snakeDirection = "right";

// 蛇的身体色块的数组
var snakeBodys = [];

// 屏幕宽高
var windowWidth = 0;
var windowHeight = 0;

// 食物数组
var foods = [];

// 是否移除多余的身体
var isDelete = true;

// 记录分数
var score = 0;

// 蛇头坐标
var snakeHeader = {
  x : 0,
  y : 0,
  color : "#f00",
  w : 20,
  h : 20
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.beginGame();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onHide: function () {
    this.allReset();
  },

  /**
   * 复位所有参数
   */
  allReset : function(){
    snakeBodys = [];
    snakeDirection = "right";
    foods = [];
    score = 0;
    snakeHeader = {
      x: 0,
      y: 0,
      color: "#f00",
      w: 20,
      h: 20
    };
    isDelete = true;
  },

  /**
     * game over
     */
  gameOver : function (){
    var that = this;
    wx.showModal({
      title: 'Game Over!!!',
      content: '最后得分: ' + score,
      confirmText: '再来一局',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.allReset();
          that.beginGame();
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.allReset();
        }
      }
    })
  },

  /**
   * 游戏开始代码
   */
  beginGame : function(){
    // 获取画图板上下文
    var context = wx.createCanvasContext("snakeCanvas");
    var that = this;
    /**
     * 绘制图形的代码
     */
    function drawBody(obj) {
      // 绘制蛇头
      context.beginPath();
      context.setFillStyle(obj.color);
      context.rect(obj.x, obj.y, obj.w, obj.h);
      context.closePath();
      context.fill();
      // context.draw();
    }

    /**
     * 碰撞函数
     */
    function boundTest(obj1, obj2) {

      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var t1 = obj1.y;
      var b1 = t1 + obj1.h;

      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var t2 = obj2.y;
      var b2 = t2 + obj2.h;

      if (r1 > l2 && b1 > t2 && l1 < r2 && t1 < b2) {
        return true;
      } else {
        return false;
      }
    }

    var frame = 0;
    function animate() {
      frame++;
      if (frame % 8 == 0) {
        var title = "分数: " + score;
        wx.setNavigationBarTitle({
          title: title,
        })
        snakeBodys.push({
          x: snakeHeader.x,
          y: snakeHeader.y,
          color: '#0f0',
          w: snakeHeader.w,
          h: snakeHeader.h
        });

        // 判断是否结束
        if (snakeHeader.x < 0 || snakeHeader.y < 0 || snakeHeader.x + snakeHeader.w > windowWidth || snakeHeader.y + snakeHeader.h > windowHeight) {
          console.log("游戏结束");
          that.gameOver();
          return;
        }

        if (snakeBodys.length > 4) {
          if (isDelete) {
            snakeBodys.shift();
          } else {
            isDelete = true;
            score += 5;
            console.log(score);
          }

        }

        switch (snakeDirection) {
          case "right":
            snakeHeader.x += snakeHeader.w;
            break;
          case "left":
            snakeHeader.x -= snakeHeader.w;
            break;
          case "bottom":
            snakeHeader.y += snakeHeader.h;
            break;
          case "top":
            snakeHeader.y -= snakeHeader.h;
            break;
        }
      }
      if (frame > 1000) {
        frame = 0;
      }

      drawBody(snakeHeader);

      // 绘制蛇的身体
      for (var i = 0; i < snakeBodys.length; i++) {
        var snakeBody = snakeBodys[i];
        drawBody(snakeBody);
        if (boundTest(snakeHeader, snakeBody)) {
          console.log("game over");
          that.gameOver();
          return;
        }
      }

      //绘制食物
      for (var i = 0; i < foods.length; i++) {
        drawBody(foods[i]);
        if (boundTest(snakeHeader, foods[i])) {
          console.log('撞上了');
          isDelete = false;
          foods[i].reset();
        }

      }
      context.draw();
      requestAnimationFrame(animate);
    }

    /**
     * 生成随机数
     */
    function rand(min, max) {
      return parseInt(Math.random() * (max - min)) + min;
    }

    /**
     * 创建食物
     */
    function createFood() {
      this.x = rand(0, windowWidth);
      this.y = rand(0, windowHeight);
      var w = rand(10, 20);
      this.w = w;
      this.h = w;
      this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      this.reset = function () {
        this.x = rand(0, windowWidth);
        this.y = rand(0, windowHeight);
        var w = rand(10, 20);
        this.w = w;
        this.h = w;
        this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      }
    }

    for (var i = 0; i < 20; i++) {
      var foodObj = new createFood();
      foods.push(foodObj);
      if(foods.length > 20){
        break;
      }
    }

    animate();
  },
  
  /**
   * 生命周期函数-监听页面初次渲染
   */
  onReady: function () {
    
    // this.beginGame();
  },

  /**
   * 手指按下时
   */
  canvasStart : function(e){
    console.log("手指按下");
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },

  /**
   * 手指滑动结束
   */
  canvasEnd : function(e){
    console.log("手指滑动结束");
    // console.log(direction);
    snakeDirection = direction;
  },

  /**
   * 手指移动时
   */
  canvasMove : function(e){
    console.log("移动");
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;

    spaceX = moveX - startX;
    spaceY = moveY - startY;
    if(Math.abs(spaceX) > Math.abs(spaceY) && spaceX > 0){
      if(snakeDirection == 'left'){
        return;
      }
      direction = "right";

    }else if(Math.abs(spaceX) > Math.abs(spaceY) && spaceX < 0){
      if (snakeDirection == 'right') {
        return;
      }
      direction = "left";

    }else if(Math.abs(spaceX) < Math.abs(spaceY) && spaceY > 0){
      if (snakeDirection == 'top') {
        return;
      }
      direction = "bottom";

    }else{
      if (snakeDirection == 'bottom') {
        return;
      }
      direction = "top";
    }
  },
})