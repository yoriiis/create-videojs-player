(function(){

    var playerVJS = new PlayerVJS({
        parsePlayer: true,
        ignoreSelector: '',
        multiplePlaying: false,
        urlFlashSwf: 'http://' + window.location.host + '/video-js.swf',
        optionsPlayer: {
            nativeControlsForTouch: false,
            preload: 'auto',
            volumeControl: false
        }
    });

})();