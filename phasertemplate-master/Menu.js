export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }
  preload() {}

  create() {
    this.facil = this.add.text(10, 10, "Facil", { fontColor: 0xffff00 });

    this.facil.setInteractive();

    this.facil.on('pointerdown',() => {
      this.scene.start('main',{dificultad:1,vidas:3});
    });

    this.medio = this.add.text(10, 30, "Medio", { fontColor: 0xffff00 });

    this.medio.setInteractive();

    this.medio.on('pointerdown',() => {
      this.scene.start('main',{dificultad:2,vidas:3});
    });


    this.dificil = this.add.text(10, 50, "Dificil", { fontColor: 0xffff00 });

    this.dificil.setInteractive();

    this.dificil.on('pointerdown',() => {
      this.scene.start('main', {dificultad:3,vidas:3});
    });
  }

  update(time, delta) {}
}
