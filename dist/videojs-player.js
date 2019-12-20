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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VideojsPlayer =
/*#__PURE__*/
function () {
  /**
   * @param {options}
   */
  function VideojsPlayer(userParams) {
    _classCallCheck(this, VideojsPlayer);

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


  _createClass(VideojsPlayer, [{
    key: "create",
    value: function create(userParams) {
      var _this = this;

      // Merge default params with user params
      var params = Object.assign({
        element: null,
        playerVars: _defineProperty({
          'nativeControlsForTouch': false,
          'preload': 'auto',
          'volumeControl': false,
          'controls': true
        }, "preload", 'auto'),
        events: {}
      }, userParams || {}); // Generate unique ID for every player

      var generatedId = new Date().getTime();
      var selectorId = "videojs-".concat(generatedId);
      params.element['VJS_ID'] = selectorId;
      params.element.setAttribute('id', selectorId); // Init Videojs player

      this.players.push(videojs(params.element, params.playerVars, function () {
        var player = videojs.getPlayers()[selectorId];
        player.on('play', function () {
          _this.playerOnPlaying.push(selectorId);

          if (!_this.options.multiplePlaying) {
            _this.pauseOtherVideo(selectorId);
          }
        });
        player.on('pause', _this.updateArrayPlayersPlaying.bind(_this, selectorId));
        player.on('ended', _this.updateArrayPlayersPlaying.bind(_this, selectorId));

        if (typeof params.events.onPlayerReady === 'function') {
          params.events.onPlayerReady(player);
        }
      }));
    }
    /**
     * Update the array of playing players
     * @param {String} currentSelectorId ID of the current player
     */

  }, {
    key: "updateArrayPlayersPlaying",
    value: function updateArrayPlayersPlaying(currentSelectorId) {
      var _this2 = this;

      this.playerOnPlaying.forEach(function (playerId, index) {
        if (playerId === currentSelectorId) {
          _this2.playerOnPlaying.splice(index, 1);
        }
      });
    }
    /**
     * Pause other playing players
     * @param {String} currentSelectorId ID of the current player
     */

  }, {
    key: "pauseOtherVideo",
    value: function pauseOtherVideo(currentSelectorId) {
      if (this.playerOnPlaying.length) {
        this.playerOnPlaying.forEach(function (playerId) {
          // Prevent pause current player
          if (playerId !== currentSelectorId) {
            videojs.getPlayers()[playerId].pause();
          }
        });
      }
    }
  }]);

  return VideojsPlayer;
}();

var _default = VideojsPlayer;
exports["default"] = _default;
module.exports = exports.default;
