
export default class Pompa extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, s) {
    super(scene, x, y, 'ball');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();

    this.setScale(s, s);

    var verlX = Phaser.Math.Between(-100,100);
    var velY = Phaser.Math.Between(-100,100);

    this.body.setBounce(1,1);

    this.body.setVelocity(verlX, velY);

    this.label = "Pompa";
  }

  setVelocidadQueFlipas(){
    var verlX = Phaser.Math.Between(-100,100);
    var velY = Phaser.Math.Between(-100,100);


    this.body.setVelocity(verlX, velY);
  }
  preUpdate(time, delta) {
    super.preUpdate(time,delta);


  }
}
