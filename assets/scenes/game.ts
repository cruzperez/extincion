export class Game extends Phaser.Scene {

  meteors : any;
  meteor : any;
  player : any;
  platforms : any;
  cursors : any;
  flag_left = true;
  gameOver = false;
  gameEnd = false;
  btnLeft : any;
  btnRight : any;
  move_left = false;
  move_right = false;
  timedEvent : any;
  txtTimer : any;
  timer : integer = 60;
  meteor_pos : integer = 600;
  
  constructor() {
    super({ key: 'game' });
  }

  init(){
    this.flag_left = true;
    this.gameOver = false;
    this.gameEnd = false;
    this.move_left = false;
    this.move_right = false;
    this.timer = 60;
    this.meteor_pos = 600;
  }

  preload(){
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.spritesheet('dinosaur', 'assets/images/dinosaur.png', { frameWidth: 96, frameHeight: 96 });
    this.load.image('control-left', 'assets/images/control-left.png');
    this.load.image('control-right', 'assets/images/control-right.png');
  }

  create(){
    this.add.image(400, 250, 'background');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400,480,'ground');

    this.player = this.physics
      .add.sprite(400,350,'dinosaur')
      .setSize(60,60)
      .setOffset(18,36)
    this.player.setCollideWorldBounds(true);

    this.meteors = this.physics.add.group();
    this.meteor = this.meteors
    .create(Phaser.Math.Between(24,776),-24,'meteor')
    .setSize(24,24)
    .setOffset(12, 12)
    this.meteor.setVelocityY(350);
    this.meteor.anims.play('anim-meteor');

    this.anims.create({
      key : 'left',
      frames : this.anims.generateFrameNumbers('dinosaur',{ start : 0, end : 1 }),
      frameRate : 10,
      repeat : -1
    });

    this.anims.create({
      key : 'right',
      frames : this.anims.generateFrameNumbers('dinosaur',{ start : 2, end : 3 }),
      frameRate : 10,
      repeat : -1
    });

    this.anims.create({
      key : 'idle_left',
      frames : [{ key : 'dinosaur', frame : 0 }],
      frameRate : 20
    });

    this.anims.create({
      key : 'idle_right',
      frames : [{ key : 'dinosaur', frame : 2 }],
      frameRate : 20
    });

    this.btnLeft = this.add.sprite(50, 250, 'control-left').setInteractive();
    this.btnRight = this.add.sprite(750, 250, 'control-right').setInteractive();

    this.btnLeft.on('pointerdown', () => {
      this.move_right = false;
      this.move_left = true;
    });

    this.btnLeft.on('pointerup', () => {
      this.move_left = false;
    });

    this.btnRight.on('pointerdown',() => {
      this.move_left = false;
      this.move_right = true;
    });

    this.btnRight.on('pointerup',() => {
      this.move_right = false;
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.meteors, this.hitMeteor,undefined,this);
    this.cursors = this.input.keyboard?.createCursorKeys();

    this.timedEvent = this.time.delayedCall(61000, this.endTimer, [], this);
    this.txtTimer = this.add.text(380, 32, '60', { fontFamily: 'Minecraft', fontSize : 44 });
  }

  endTimer (){
    this.gameEnd = true;
    return;
  }

  override update(){
    if(this.gameOver){
      this.physics.pause();
      this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          this.scene.switch('gameover');
        }
      });
    }else if(this.gameEnd){
      this.time.addEvent({
        delay: 4000,
        callback: ()=>{
          this.scene.switch('gameend');
        }
      });
    }else{
      if(this.meteor.y > this.meteor_pos){
        //this.meteor.disableBody(true,true);
        //this.meteor = this.meteors.create(Phaser.Math.Between(24,776),-24,'meteor');
        this.meteor = this.meteors
          .create(Phaser.Math.Between(24,776),-24,'meteor')
          .setSize(24,24)
          .setOffset(12, 12)
        this.meteor.setVelocityY(350);
        this.meteor.anims.play('anim-meteor');
        if(this.meteor_pos > 40){
          this.meteor_pos = this.meteor_pos - 10;
        }
      }

      this.timer = 60 - parseInt(this.timedEvent.getElapsedSeconds());
      this.txtTimer.setText(this.timer);
    }

    if(this.cursors.left.isDown || this.move_left){
      this.moveLeft();
    }else if(this.cursors.right.isDown || this.move_right){
      this.moveRight();
    }else{
      this.player.setVelocityX(0);
      if(this.flag_left){
        this.player.anims.play('idle_left',true);
      }else{
        this.player.anims.play('idle_right',true);
      }
    }
  }

  moveLeft(){
    this.player.setVelocityX(-400);
    this.player.anims.play('left',true);
    this.flag_left = true;
  }

  moveRight(){
    this.player.setVelocityX(400);
    this.player.anims.play('right',true);
    this.flag_left = false;
  }

  hitMeteor(player:any, meteor:any){
    if(this.flag_left){
      this.player.anims.play('idle_left',true);
    }else{
      this.player.anims.play('idle_right',true);
    }

    player.setTint(0xff0000);
    this.gameOver = true;
  }

}