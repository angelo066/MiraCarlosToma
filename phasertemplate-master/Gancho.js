
export default class Gancho extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'feather');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    //this.body.setCollideWorldBounds();

    this.body.setAllowGravity(false);
    
    this.setScale(1,0.05);
    this.setOrigin(0,1);
    //this.body.setVelocity(0,-200);

    this.scene.physics.add.collider(this, this.scene.misBolas,(o1,o2) =>{

      if(o1.label == "Pompa") o1.destroy();
      else o2.destroy();
    });
  }
  
  preUpdate(time, delta) {
    super.preUpdate(time,delta);

    if(this.scaleY < 10)this.scaleY = this.scaleY + 0.1;
    if(this.scaleY >= 10){
      this.body.setVelocity(0,0);
      var timer = this.scene.time.addEvent({                                       
        delay: 2000,                // ms
        callback: () => {
            this.destroy();
            timer.destroy();
          },
        loop: false
      });
  
    }

  }
}
