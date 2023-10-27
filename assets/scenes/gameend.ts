export class Gameend extends Phaser.Scene {
    meteors : any;
    meteor : any;

    constructor() {
      super({
        key: 'gameend',
        physics: {
          default: 'arcade',
          arcade: { 
            gravity: { y: 0 }
          }
        }
      });
    }
  
    preload() {
      this.load.image('background-gameend', 'assets/images/gameend.png');
      this.load.image('btnmenu','assets/images/btnmenu.png');
    }
  
    create() {
      this.add.image(400, 250, 'background-gameend');

      var menuButton = this.add.sprite(400, 400, 'btnmenu').setInteractive();
  
      menuButton.on('pointerdown', () => {
        this.doClick();
      });
    }
  
    doClick() {
      this.scene.start('loader');
    }
  }