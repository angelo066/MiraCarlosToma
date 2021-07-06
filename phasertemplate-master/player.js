import Gancho from "./Gancho.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, vidas) {
    super(scene, x, y, 'player_idle');
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    //this.scoretext = this.scene.add.text(10, 10);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.lifesText = this.scene.add.text(10, 10);
    this.lives = vidas;
    this.updateLives();


    this.shoot = this.scene.input.keyboard.addKey('s');

    
    this.label = "El yugador";
    
    
    this.anims.play("idolo", true);

    this.canShoot = true;
  }

  point() {
    this.score++;
    this.updateScore();
  }
  
  meGolpiaron(){
    this.lives--;
    this.scene.quitarVidas();
    this.updateLives();

    let d = this.scene.getDificultad();
    let v = this.scene.getLives();

    //Por que aqui es scne.scne
    if(v > 0)this.scene.scene.start("main",{dificultad:d,vidas:v});
    else this.scene.scene.start("end",{won:false});
  }
  
  vidasDeAhoraMismo(){
    return this.lives;
  }
  
  updateLives() {
    this.lifesText.text = "Lifes:" + this.lives;
  }

  setCanShoot(){
    this.canShoot = true;
  }
  
  preUpdate(time, delta) {
    super.preUpdate(time,delta);

    if (this.cursors.up.isDown && this.body.onFloor()) {
     // this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);

    }
    else if(Phaser.Input.Keyboard.JustDown(this.shoot) && this.canShoot){
      this.canShoot = false;
      new Gancho(this.scene, this.x,this.y);
      
      var timer = this.scene.time.addEvent({                                       
        delay: 2000,                // ms
        callback: () => {
            this.canShoot = true;
            timer.destroy();
          },
        loop: false
      });
    }
    else {
      this.body.setVelocityX(0);

    }
  }
}
