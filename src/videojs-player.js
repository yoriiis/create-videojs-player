/**
 * @license MIT
 * @name create-videojs-player
 * @version 2.0.2
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Easy way to load and manage multiple Videojs players with API
 * {@link https://github.com/yoriiis/create-videojs-player}
 * @copyright 2019 Joris DANIEL
 **/

'use strict';

class VideojsPlayer {
	/**
	 * @param {options}
	 */
	constructor(userParams) {

		// Merge default params with user params
		this.options = Object.assign({
			multiplePlaying: true
		}, userParams || {});

		this.players = [];
		this.playerOnPlaying = [];

	}

	/**
	 * Create the Videojs player
	 * @param {Object} userParams Options to create a player
	 */
	create(userParams) {

		// Merge default params with user params
		const params = Object.assign({
			element: null,
			playerVars: {
				'nativeControlsForTouch': false,
				'preload': 'auto',
				'volumeControl': false,
				'controls': true,
				'preload': 'auto'
			},
			events: {}
		}, userParams || {});

		// Generate unique ID for every player
		const generatedId = new Date().getTime();
		const selectorId = `videojs-${generatedId}`;
		params.element['VJS_ID'] = selectorId;
		params.element.setAttribute('id', selectorId);

		// Init Videojs player
		this.players.push(videojs(params.element, params.playerVars, () => {

			const player = videojs.getPlayers()[selectorId];

			player.on('play', () => {

				this.playerOnPlaying.push(selectorId);

				if (!this.options.multiplePlaying) {
					this.pauseOtherVideo(selectorId);
				}

			});

			player.on('pause', this.updateArrayPlayersPlaying.bind(this, selectorId));
			player.on('ended', this.updateArrayPlayersPlaying.bind(this, selectorId));

			if (typeof params.events.onPlayerReady === 'function') {
				params.events.onPlayerReady(player);
			}

		}));

	}

	/**
	 * Update the array of playing players
	 * @param {String} currentSelectorId ID of the current player
	 */
	updateArrayPlayersPlaying(currentSelectorId) {

		this.playerOnPlaying.forEach((playerId, index) => {
			if (playerId === currentSelectorId) {
				this.playerOnPlaying.splice(index, 1);
			}
		});

	}

	/**
	 * Pause other playing players
	 * @param {String} currentSelectorId ID of the current player
	 */
	pauseOtherVideo(currentSelectorId) {

		if (this.playerOnPlaying.length) {
			this.playerOnPlaying.forEach(playerId => {
				// Prevent pause current player
				if (playerId !== currentSelectorId) {
					videojs.getPlayers()[playerId].pause();
				}
			});
		}

	}

}

export default VideojsPlayer;