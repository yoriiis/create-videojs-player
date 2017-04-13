![videojs-player-js](https://img.shields.io/badge/videoJS_Player-v1.0.1-000000.svg?style=flat-square)
![videoJS](https://img.shields.io/badge/videoJS-v5.0.0+=-66A8CC.svg?style=flat-square)

# [videoJS Player](http://yoriiis.github.io/videojs-player)

videoJS player module allow you to automatically parse DOM and start instantiation. Each player is available with a small boilerplate (poster and play button).

You can manage all videos videoJS on your page with a global javascript object `PlayerVJS`. It is write in vanillaJS, no needs to import jQuery.

## Installation

Call videoJS player module in your HTML before your application and use it.

```html
<script src="js/videojs-player.js"></script>
```

## How it works

### HTML structure

Use HTML structure below without change. Replace just `{{idSelector}}` with a unique id and `{{urlVideo}}` with the url of the video. Tag `.player-poster` is optional and integration inside can be easily modified.<br />
_For information, all player must have a unique id._

```html
<div class="container-player">
  <div class="player-vjs-js">
    <video id="player-vjs-{{idSelector}}" class="video-js" controls preload="auto" width="640" height="264">
      <source src="{{urlVideo}}" type='video/mp4'>
    </video>
  </div>
  <div class="player-poster"></div>
</div>
```

### Options

* `parsePlayer` automatically parse all videoJS players in the page
* `ignoreSelector` ignore specific player (string selector class or id)
* `multiplePlaying` disable multiple player videoJS playing in the same time
* `urlFlashSwf` by default videoJS use Flash SWF on their CDN, you can change the path to host the file
* `optionsPlayer` player parameters pass to videoJS API (object equivalent to data-setup)

_More informations on <a href="http://docs.videojs.com" title="videoJS API documentation" target="blank">videoJS API documentation_


### Instanciation

```javascript
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
```

### Parsing DOM

On module player init, with `parsePlayer` enabled, CSS class are added to every videoJS player parsed. You can re-parse the DOM with `playerVJS.reParse()`.

```javascript
playerVJS.reParse();
```

This method accept one parameter, a string with selector class or id to parse specific player on your page.

```javascript
playerVJS.reParse('.player-vjs-js');
```

### Events

There are events available with module player. If events function exist, default behavior is overrided.

* [`onReady`](#onReady) - Event on player videoJS ready
* [`posterClick`](#posterClick) - Event on player poster click

```javascript
var playerVJS = new PlayerVJS({
    parsePlayer: true,
    ignoreSelector: '',
    multiplePlaying: true,
    urlFlashSwf: 'http://' + window.location.host + '/video-js.swf',
    optionsPlayer: {
        nativeControlsForTouch: false,
        preload: 'auto',
        volumeControl: false
    },
    events: {
        onReady: onPlayerReady,
        posterClick: onPosterClick
    }
});
```

#### <a name="onReady"></a>On player videoJS ready

Function called when each player is ready and instanciated. `player` parameter is player instance. There is a default behavior to show poster when video is ended. You can change this behavior with this event function.

For example, you can add specific behavior when player is ready. In example below, show a log when the player start play.

```javascript
function onPlayerReady(player){
    player.on('play', function(){
        console.log('videoJS play');
    });
}
```

#### <a name="posterClick"></a>On player poster click

Function called on poster click. `e` parameter is click event, `instancePlayer` is the instance of the player. There is a default behavior to player the video and hide the poster. You can change this behavior with this event function.

```javascript
function onPosterClick(e, player){
    console.log('posterClick', e, player);
}
```