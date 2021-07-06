import Player from "./player.js";
import Pompa from "./pompa.js";
import Gancho from "./Gancho.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });  
  }
  preload() {
    this.load.image("background", "./assets/bg/bg.png");
    this.load.image("ball", "./assets/sprites/unamuno/bola.png");
    this.load.image("feather", "./assets/sprites/unamuno/feather.png");
    
    this.load.spritesheet({
      key: 'player_idle',
      url: './assets/sprites/unamuno/idle.png',
      frameConfig: {
        frameWidth: 120,
        frameHeight: 200
      }
    });
  }

  create(data) {
    
    
    this.misBolas = this.physics.add.group({allowGravity:false, velocityX:0, velocityY:0, collideWorldBounds:true, bounceX:1, bounceY:1});
    
    this.numbolas = data.dificultad * 3;
    this.dificultad = data.dificultad;
    this.lives = data.vidas;
    
    this.add.image(this.game.config.width/2, this.game.config.height/2, "background");
    
    this.anims.create({
      key: 'idolo',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1
    });
    
    this.player = new Player(this,this.game.config.width/2, this.game.config.height - 100, this.lives);
    
    let ganchardoDeLosGancheros = new Gancho(this,this.player.x, this.player.y);
    this.ganhoContenido = this.add.container(this.player.x, this.player.y, ganchardoDeLosGancheros);

    let laImagenDelGancho = this.add.image(this.ganhoContenido.x, this.ganhoContenido.y,"ball");
    this.ganhoContenido.add(laImagenDelGancho);

    this.add.existing(this.ganhoContenido);

    console.log(this.ganhoContenido);
    for(var i = 0; i<this.numbolas; i++){
      let posX = Phaser.Math.Between(0,this.game.config.width);
      let posY = Phaser.Math.Between(0,this.game.config.height/2);
      let size = Phaser.Math.Between(1,3);
      let pomp = new Pompa(this, posX, posY, size);
      
      this.misBolas.add(pomp);

      pomp.setVelocidadQueFlipas();

      this.pompa = pomp;
      this.physics.add.collider(this.player, pomp, function(o1,o2){
        if(o1.label == "El yugador"){
          o1.meGolpiaron();
        }
        else{
          o2.meGolpiaron();
          
        } 
        
      });
    }
    
    //this.cameras.main.startFollow(this.player);
  }
  
  getLives(){
    return this.lives;
  }

  getDificultad(){
    return this.dificultad;
  }

  quitarVidas(){
    this.lives--;
  }

  update(time, delta) {

  }
}
