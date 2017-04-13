/**
 *
 * Module: VideoJS player
 * @version 1.0.2
 * @author: Joris DANIEL
 * @fileoverview: Easy way to load and manage multiple VideoJS player with API
 * Compatibilities : videoJS API v5.0.0+
 *
 * Copyright (c) 2017 Joris DANIEL
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 **/

(function(){

    var PlayerVJS = function( options ){

        this.players = [];
        this.playerOnPlaying = [];

        var defaultOptions = {
            parsePlayer: true,
            ignoreSelector: '',
            multiplePlaying: true,
            urlFlashSwf: 'default',
            optionsPlayer: {
                nativeControlsForTouch: false,
                preload: 'auto',
                volumeControl: false
            },
            events: {}
        };

        this.options = utils.extend({}, defaultOptions, options);

        this.reParse = function(selector){
            this.parsePlayer(selector);
        }

        this.parsePlayer();

    };

    PlayerVJS.prototype.parsePlayer = function(selector){

        var _this = this,
            instancePlayer = null;

        //Parse specific player
        if( typeof selector !== 'undefined' ){
            var selector = document.querySelectorAll(selector);
        }else{
            //Parse all selector by default
            var selectorString = '.player-vjs-js:not(.parsed)';
            if( this.options.ignoreSelector !== '' ){
                var selectorIgnoredArray = this.options.ignoreSelector.split(',');
                for( var j = 0, lengthIgnoreSelector = selectorIgnoredArray.length; j < lengthIgnoreSelector; j++ ){
                    selectorString += ':not(' + selectorIgnoredArray[j] + ')';
                }
            }
            var selector = document.querySelectorAll(selectorString);
        }

        if( this.options.urlFlashSwf !== 'default' ){
            videojs.options.flash.swf = this.options.urlFlashSwf;
        }

        for( var i = 0, lengthSelector = selector.length; i < lengthSelector; i++ ){

            var element = selector[i],
                selectorId = element.querySelector('.video-js').getAttribute('id'),
                playerPoster = element.parentNode.querySelector('.player-poster') || false;

            utils.addClass('parsed', element);

            //Init videoJS player and callback when ready
            instancePlayer = videojs(selectorId, this.options.optionsPlayer, function(){

                var player = this,
                    selectorId = player.el().getAttribute('id'),
                    playerPoster = player.el().parentNode.parentNode.querySelector('.player-poster') || false;

                player.on('play', function(){

                    _this.playerOnPlaying.push(selectorId);

                    if(!_this.options.multiplePlaying){
                        _this.pauseOtherVideo(selectorId);
                    }

                });

                player.on('pause', function(){
                    _this.updateArrayPlayersPlaying(selectorId);
                });

                player.on('ended', function(){
                    _this.updateArrayPlayersPlaying(selectorId);
                });

                if (typeof _this.options.events.onReady === 'function') {
                    _this.options.events.onReady(player);
                }else{

                    //On video ended, show poster video if element exist
                    player.on('ended', function(){
                        if( playerPoster !== false ){
                            playerPoster.style.display = 'block';
                        }
                    });

                }

            });

            element.setAttribute('data-vjs-key', _this.players.length);
            this.players.push(instancePlayer);

            //Start video on poster click, and hide it if element exist
            if( playerPoster !== false ){
                playerPoster.addEventListener('click', function(e){

                    var instancePlayer = _this.players[e.currentTarget.parentNode.querySelector('.player-vjs-js').getAttribute('data-vjs-key')];

                    e.preventDefault();

                    if (typeof _this.options.events.posterClick === 'function') {
                        _this.options.events.posterClick(e, instancePlayer);
                    }else{
                        instancePlayer.play();
                        e.currentTarget.style.display = 'none';
                    }

                });
            }

        }

    };

    //If player is paused or ended, removed from array
    PlayerVJS.prototype.updateArrayPlayersPlaying = function(currentSelectorId){

        for( var i = 0, lengthPlayerPlaying = this.playerOnPlaying.length; i < lengthPlayerPlaying; i++ ){
            if( this.playerOnPlaying[i] === currentSelectorId ){
                this.playerOnPlaying.splice(i, 1);
            }
        }

    };

    //If multiplePlaying option is disabled, pause all other video before play current video
    PlayerVJS.prototype.pauseOtherVideo = function(currentSelectorId){

        if( this.playerOnPlaying.length > 1 ){
            for( var i = 0, lengthPlayerPlaying = this.playerOnPlaying.length; i < lengthPlayerPlaying; i++ ){
                //Prevent pause current player
                if( this.playerOnPlaying[i] !== currentSelectorId ){
                    var currentPlayerKey = document.querySelector('#' + this.playerOnPlaying[i]).parentNode.getAttribute('data-vjs-key')
                    var instancePlayer = this.players[currentPlayerKey];
                    instancePlayer.pause()
                }
            }
        }

    };

    var utils = {
        addClass: function(className, selector) {
            if (selector.classList){
                selector.classList.add(className);
            }else{
                selector.className += ' ' + className;
            }
        },
        extend: function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];

                if (!obj){
                    continue;
                }

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object'){
                            out[key] = this.extend(out[key], obj[key]);
                        }else{
                            out[key] = obj[key];
                        }
                    }
                }
            }

            return out;
        }
    };

    window.PlayerVJS = PlayerVJS;

})();