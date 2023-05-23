> **Warning** `create-videojs-player` is deprecated and has been merged into the `vLitejs` project. See [vLitejs](https://github.com/vlitejs/vlite) for its successor 🎉

![Create Videojs Player](https://img.shields.io/badge/Create_Videojs_Player-v2.0.2-66A8CC.svg?style=flat-square)

# Create Videojs Player

Create Videojs Player is a lightweight Javascript library to instanciate Videojs players, without any dependencies.

## Installation

The libraryis available as the `create-videojs-player` package on <a href="https://www.npmjs.com/package/create-videojs-player" title="npm create-videojs-player">npm</a>.

```
npm install create-videojs-player --save
```

## Demo

Online demo is available on the <a href="https://yoriiis.github.io/create-videojs-player/" title="Create Videojs Player Github page" target="_blank">Create Videojs Player Github page</a>.


## How it works

### HTML structure

The minimalist HTML structure below is enough to create the Videojs player.

Replace the `{{urlVideo}}` with the url of the video id.

```html
<video class="video-js player">
    <source src="{{urlVideo}}" type="video/mp4">
</video>
```

### Basic usage

Every page that contains a player, has to instanciates them. The following example create one item.

```javascript
import VideojsPlayer from 'create-videojs-player'
const videojsPlayer = new VideojsPlayer();
videojsPlayer.create({
    element: document.querySelector('.player')
});
```

### Options

You can pass configuration options to the constructor. Example below show all default values. Allowed values are as follows:

```javascript
{
    multiplePlaying: true
}
```

* `multiplePlaying` - {Boolean} - Disable multiple player Videojs playing in the same time

## Available methods

Each player instanciations returns the instance of the class with somes available methods to easily manipulate the element.

### Create the player

The `create()` function create the Videojs player.

```javascript
videojsPlayer.create({
    element: document.querySelector('.player')
});
```

#### Options

You can pass configuration options to the `create()` function.<br />Example below show all default values. Allowed values are as follows:

```javascript
{
    element: null,
    playerVars: {
        'nativeControlsForTouch': false,
        'preload': 'auto',
        'volumeControl': false,
        'controls': true,
        'preload': 'auto'
    }
}
```

* `element` - {Object} - DOM element reference
* `playerVars` - {Object} - Parameters of the Videojs player

More informations about player parameters in the <a href="https://docs.videojs.com/tutorial-options.html" title="Videojs documentation" target="_blank">Videojs documentation</a>.

## Callback functions

There is a callback function available with the library.

### Videojs player ready

The `onPlayerReady` function is called when the player is ready and instanciated.

```javascript
videojsPlayer.create({
    element: document.querySelector('.player'),
    events: {
        onPlayerReady: (player) => {
            // Videojs player is ready
        }
    }
});
```

Parameters:
* `player` - {Object} - Videojs player instance
