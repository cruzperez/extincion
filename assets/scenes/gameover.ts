export class Gameover extends Phaser.Scene {
    meteors : any;
    meteor : any;

    constructor() {
      super({
        key: 'gameover',
        physics: {
          default: 'arcade',
          arcade: { 
            gravity: { y: 0 }
          }
        }
      });
    }
  
    preload() {
      this.load.image('background-gameover', 'assets/images/gameover.png');
      this.load.image('btnretry','assets/images/btnretry.png');
      this.load.image('btnmenu','assets/images/btnmenu.png');
    }
  
    create() {
      this.add.image(400, 250, 'background-gameover');

      var retryButton = this.add.sprite(290, 400, 'btnretry').setInteractive();
      var menuButton = this.add.sprite(520, 400, 'btnmenu').setInteractive();
  
      retryButton.on('pointerdown', () => {
        this.goGame();
      });

      menuButton.on('pointerdown', () => {
        this.goMenu();
      });
    }
  
    goGame() {
      this.scene.start('game');
    }

    goMenu(){
        this.scene.switch('loader');
    }
  }