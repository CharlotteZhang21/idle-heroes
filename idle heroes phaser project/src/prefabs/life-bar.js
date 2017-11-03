  import * as Util from '../utils/util';
  import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';

class LifeBar extends Phaser.Group{
	constructor(game, icon = "", enemy = false, amount){
		super(game);
		this.createLifeBar(enemy, amount);
		this.amount = (amount!=null)? amount : 100;
		this.initialWidth;
		if (icon != "")
			this.createIcon(icon);
	}

	// setCta(cta) {
	// 	this.cta = cta;
	// }

	createIcon(iconName){

		var icon = this.game.add.sprite(0,0,iconName);
		this.add(icon);
		if(iconName != "girl-portrait"){
			icon.anchor.set(0.5);
			icon.x = (-1) * icon.width/2 * 1.2;
			icon.y = this.initialHeight/2;
			icon.scale.y = this.initialHeight / icon.height * 1.5;
			icon.scale.x = icon.scale.y;
		}else{
			icon.x = (-1) * icon.width/2 * 1.5;
			icon.y = this.initialHeight/2 - 150;
			icon.scale.y = this.initialHeight / icon.height * 5;
			icon.scale.x = icon.scale.y ;
		}
		
	}

	createLifeBar(enemy, amount) {
		var barBg = this.game.add.sprite(0,0,'bar-bg');
		this.add(barBg);


		var barFill = 'bar-fill';
		if(enemy){
			barFill = 'enemy-bar-fill';
		}

		var barFilling = this.game.add.sprite(0,0, barFill);
		this.add(barFilling);

		barFilling.x = this.width/100;
		barFilling.y = this.height/100 * 7;

		
		barFilling.x = this.width/100;
		barFilling.y = this.height/100 * 7;

		barFilling.scale.x = (this.width - this.width/100 * 2) / barFilling.width;
		barFilling.scale.y = barBg.height / barFilling.height * .85;

		this.fullWidthFilling = barFilling.scale.x;

		if(amount == 0){

			barFilling.scale.x = 0;
		}
		this.initialWidth = this.width;
		this.initialHeight = this.height;

		this.barFilling = barFilling;
	}

	decreaseLifeBar(value) {
		if (this.amount - value > 0)
			this.amount -= value;
		else
			this.amount = 0;

		var scaleTween = this.game.add.tween(this.barFilling.scale).to(
			{x:this.fullWidthFilling * (this.amount/100)}, 300, Phaser.Easing.Quadratic.InOut, true, 0);
		// var delay = Math.random() * 500;
		// this.game.time.events.add(delay, function() {
		// 	// this.cta.playTrail();
		// 	var bloodAnim = CustomPngSequencesRenderer.playPngSequence(this.game, PiecSettings.pngAnimations[0], this);
		// 	bloodAnim.anchor.set(0.5);
		// 	bloodAnim.scale.x = (this.initialWidth/5) / bloodAnim.width;
		// 	bloodAnim.scale.y = bloodAnim.scale.x;
		// 	bloodAnim.x = this.initialWidth * window.devicePixelRatio / 100 * (Math.random() * 100) * 0.2;
		// }, this);
	}

	increaseLifeBar(value) {

		console.log("increase: " + value);
		if (this.amount < 100)
			this.amount += value;
		else
			this.amount = 0;

		console.log("now amout is: " + this.amout);
		var scaleTween = this.game.add.tween(this.barFilling.scale).to(
			{x:this.fullWidthFilling * (this.amount/100)}, 300, Phaser.Easing.Quadratic.InOut, true, 0);
	}

	decreaseLifeBarWithDelay(value, delay) {
		this.game.time.events.add(delay, function() {
			this.decreaseLifeBar(value);
		}, this);
	}

}

export default LifeBar;