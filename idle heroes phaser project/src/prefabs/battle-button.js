import LifeBar from '../prefabs/life-bar';

class BattleButton extends Phaser.Group {
	constructor(game) {
		super(game);
		this.button = new Phaser.Sprite(game, 0, 0, 'attack-button', 0);

		var knight_pt = new Phaser.Sprite(game, 0, 0, 'knight-portrait', 0),
			girl_pt = new Phaser.Sprite(game, 0, 0, 'girl-portrait', 0);

		this.portrait = {
			"0" : knight_pt,
			"2" : girl_pt,
			"5" : knight_pt
			
		}

		this.girlEnergyBar = new LifeBar(this.game, 'girl-portrait', false, 0);
		this.add(this.girlEnergyBar);
		this.enemyEnergyBar = new LifeBar(this.game, 'death-icon', true, 0);
		this.add(this.enemyEnergyBar);

		this.add(this.button);

		this.button.anchor.set(0.5);

		this.button.x = this.game.global.windowWidth * window.devicePixelRatio / 2;
		this.button.y = this.game.global.windowHeight * window.devicePixelRatio / 2;

		if (this.game.global.windowHeight < this.game.global.windowWidth) {
			this.button.scale.x = this.game.global.windowWidth * window.devicePixelRatio * .3 / this.button.width;
		} else {
			this.button.scale.x = this.game.global.windowWidth * window.devicePixelRatio * .5 / this.button.width;
			
		}
		this.button.scale.y = this.button.scale.x;

		this.idleAnimation();

		this.button.alpha = 0;
		this.girlEnergyBar.alpha = 0;
		this.enemyEnergyBar.alpha = 0;

		this.girlEnergyBar.x = this.button.x/2 + 100;
		this.girlEnergyBar.y = this.button.y + 150;

		this.girlEnergyBar.scale.x = this.button.scale.x/3;
		this.girlEnergyBar.scale.y = this.button.scale.y/3;

		this.enemyEnergyBar.x = this.button.x/2 + 100;
		this.enemyEnergyBar.y = this.button.y + 250;

		this.enemyEnergyBar.scale.x = this.button.scale.x/3;
		this.enemyEnergyBar.scale.y = this.button.scale.y/3;

		this.initPortrait();

	}

	initPortrait() {


		for ( var i in this.portrait){
			var pt = this.portrait[i];

			this.add(pt);

			pt.anchor.set(0.5);

			pt.x = this.button.x - 10;

			pt.y = this.button.y - 150;

			if (this.game.global.windowHeight < this.game.global.windowWidth) {
				pt.scale.x = this.game.global.windowWidth * window.devicePixelRatio * .3 / pt.width;
			} else {
				pt.scale.x = this.game.global.windowWidth * window.devicePixelRatio * .5 / pt.width;
			}

			pt.scale.y = pt.scale.x;

			pt.alpha = 0;

		}
	
	}

	idleAnimation() {
		var initialScale = this.button.scale.x;
		this.game.add.tween(this.button.scale).to({
			x: initialScale * 1.05,
			y: initialScale * 1.05,
		}, 100, Phaser.Easing.Quadratic.InOut, true, 0).loop().yoyo(true, 0);
	}

	hide() {
		this.game.add.tween(this.button).to({
			alpha : 0
		}, 100, Phaser.Easing.Quadratic.InOut, true, 0);

		for(var i in this.portrait) {
			var pt = this.portrait[i];
			if( pt && pt.alpha != 0){
				this.game.add.tween(pt).to({
					alpha : 0
				}, 100, Phaser.Easing.Quadratic.InOut, true, 0);
			}
			
		}

		if(this.girlEnergyBar && this.girlEnergyBar.alpha != 0){
			this.game.add.tween(this.girlEnergyBar).to({
				alpha : 0
			}, 100, Phaser.Easing.Quadratic.InOut, true, 0);
		}

		if(this.enemyEnergyBar && this.enemyEnergyBar.alpha != 0){
			this.game.add.tween(this.enemyEnergyBar).to({
				alpha : 0
			}, 100, Phaser.Easing.Quadratic.InOut, true, 0);
		}
	}

	show() {
		this.game.add.tween(this.button).to({
			alpha: 1,
		}, 200, Phaser.Easing.Quadratic.InOut, true, 0);
	}

	showWithCharacter(i) {
		this.game.add.tween(this.button).to({
			alpha: 1,
		}, 200, Phaser.Easing.Quadratic.InOut, true, 0);

		this.game.add.tween(this.portrait[i]).to({
			alpha: 1,
		}, 200, Phaser.Easing.Quadratic.InOut, true, 0);

		this.game.add.tween(this.girlEnergyBar).to({
			alpha: 1,
		}, 200, Phaser.Easing.Quadratic.InOut, true, 0);

		if(this.game.global.interaction > 0)
			this.girlEnergyBar.increaseLifeBar(40);



		if(!PiecSettings.alwaysWin){
			this.game.add.tween(this.enemyEnergyBar).to({
				alpha: 1,
			}, 200, Phaser.Easing.Quadratic.InOut, true, 0);

			// this.game.time.events.add(3000, function(){
			// 	this.enemyEnergyBar.increaseLifeBar(this.duration);
			// })
		}
		

	}

}

export default BattleButton;