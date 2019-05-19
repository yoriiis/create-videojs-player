import VideojsPlayer from '../dist/videojs-player.js'

const videojsPlayer = new VideojsPlayer({
	multiplePlaying: false
});

videojsPlayer.create({
	element: document.querySelector('.player-1')
});

videojsPlayer.create({
	element: document.querySelector('.player-2')
});