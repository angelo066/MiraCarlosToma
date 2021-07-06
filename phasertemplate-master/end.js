
export default class End extends Phaser.Scene {
  constructor() {
    super({ key: "end" });  
  }
  preload() {

  }
  create(data){
    if(data.won){
      this.add.text(this.game.config.width/2,this.game.config.height/2,"Ganaste Carlos Leon");
    }
    else this.add.text(this.game.config.width/2,this.game.config.height/2,"Perdiste Carlos Leon");
  }

  update(time, delta) {

  }
}
