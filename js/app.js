(function(){

    var playerVJS = new PlayerVJS({
        parsePlayer: true,
        ignoreSelector: '',
        multiplePlaying: true,
        urlFlashSwf: 'http://' + window.location.host + '/video-js.swf',
        optionsPlayer: {
            nativeControlsForTouch: false,
            preload: 'auto',
            volumeControl: false
        }
    });

})();