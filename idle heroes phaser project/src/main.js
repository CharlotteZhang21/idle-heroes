 import Boot from './states/boot';
 import Endcard from './states/endcard';
 import Preloader from './states/preloader';

 const game = new Phaser.Game(
     document.body.scrollWidth * window.devicePixelRatio,
     document.body.scrollHeight * window.devicePixelRatio,
     Phaser.CANVAS,
     'game',
     null,
     true);

 game.state.add('boot', new Boot());
 game.state.add('endcard', new Endcard());
 game.state.add('preloader', new Preloader());

 game.state.start('boot');
