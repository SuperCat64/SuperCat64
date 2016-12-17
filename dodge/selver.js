var C = {
  "game": {
    "width": 320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 0,
    "yspeed": 700,
    "file": "assets/snow.png"
  },
  "p": {
    "file": "assets/snowmin.png",
    "width": 21,
    "height": 25,
    "frames":12,
    "startx": 160,
    "start": 500,
    "speed": 5
  },
"d": {
  "file": "assets/bomb-bomb.png",
  "width": 64,
  "height": 64,
  "frames": 2,
  "fps": 10,
  "startx": 160,
  "starty": -32,
  "speed": 15

 }
}

//-----------------------------------------------------

class Boot {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertially = true;
  }
  create(){
    this.state.start("Load")
  }
}

class Load{
  preload(){
    console.log("Loading...");
    this.load.image("bg",C.bg.file)
    this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
    this.load.spritesheet("dodge",C.p.file,C.p.width,C.p.height,C.p.frames);
  }
  create(){
    console.log("Loading");
    this.state.start("Play")
  }
}
class Play {
  create(){
    console.log("Entered Play State");
    this.bg = this.add.tileSprite(0,0, C.bg.width,C.bg.height,"bg");
    this.bg.autoScroll(C.bg.xspeed,C.bg.yspeed);
    
    this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = false;
    this.player.scale.set(1);
    this.player.animations.add("anim");
    this.player.animations.play("anim",C.p.fps,true);

    this.dodge = this.add.sprite(C.d.startx,C.d.starty,"dodge");
    this.dodge.anchor.set(0.5,0.5);
    this.dodge.smooted = false;
    this.dodge.scale.set(1);
    this.dodge.animations.add("anim");
    this.dodge.animations.play("anim",C.d.fps,true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
    if(this.dodge.y > this.game.height) {
    this.dodge.y = C.d.starty
    this.dodge.x = randInt(C.game.width);
    }
    this.dodge.y += C.d.speed;

  }

  render() {
    game.debug.text("x:"+ this.dodge.x +",y:"+ this.dodge.y, 4, 16);
  }

}


//-----------------------------------------------------

function restart() {
  game.state.start("Boot");
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

var game = new Phaser.Game(320,568);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");


