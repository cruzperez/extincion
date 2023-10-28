export class Loader extends Phaser.Scene {
    meteors : any;
    meteor : any;

    constructor() {
      super({
        key: 'loader',
        physics: {
          default: 'arcade',
          arcade: { 
            gravity: { y: 0 }
          }
        }
      });
    }
  
    preload() {
      this.load.image('background-preload', 'assets/images/background-preload.png');
      this.load.spritesheet('title','assets/images/title.png', { frameWidth : 750, frameHeight : 160 });
      this.load.spritesheet('meteor', 'assets/images/meteor.png', { frameWidth: 48, frameHeight: 48 });
      this.load.image('btnplay','assets/images/btnplay.png');
    }
  
    create() {
      this.add.image(400, 250, 'background-preload');

      this.anims.create({
        key: 'anim-title',
        frames: this.anims.generateFrameNumbers('title', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 1,
        repeat: -1,
        //repeatDelay: 2000
      });

      this.anims.create({
        key : 'anim-meteor',
        frames : this.anims.generateFrameNumbers('meteor',{ start : 0, end : 1 }),
        frameRate : 10,
        repeat : -1
      });

      this.add.sprite(400, 160,'title').play('anim-title');

      this.meteors = this.physics.add.group();
      this.meteor = this.meteors.create(Phaser.Math.Between(24,776),-24,'meteor');
      this.meteor.setVelocityY(500);
      this.meteor.setVelocityX(500);
      this.meteor.anims.play('anim-meteor');

      var startButton = this.add.sprite(400, 400, 'btnplay').setInteractive();
  
      startButton.on('pointerdown', () => {
        this.doClick();
      });

      this.physics.add.collider(this.meteors, this.meteors);
    }

    override update(){
      if(this.meteor.y > 250){
        //this.meteor.disableBody(true,true);
        this.meteor = this.meteors.create(Phaser.Math.Between(24,776), -24, 'meteor');
        this.meteor.setVelocity( Phaser.Math.Between(-200,200), Phaser.Math.Between(100,500));
        this.meteor.anims.play('anim-meteor');
      }
    }
  
    doClick() {
      this.scene.start('game');
    }
  }