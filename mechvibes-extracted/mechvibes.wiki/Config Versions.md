As of v2.3.5, only version 1 has been implemented. If this wiki page hasn't been updated, check release notes to see if other versions have been added.

Please be sure to familiarize yourself with all config versions, and to read up on deprecations, as duplicate properties have been stripped. For example, version 2 deprecates the `includes_numpad` property, so version 3 doesn't mention that it also doesn't have the `includes_numpad` property, because version 2 already deprecated it.

## Undocumented properties and extra data in config.json
Some properties may be present in config.json versions 1 and 2 that are not required or parsed by the application. Such as "tags", or "description". These properties, although mostly undocumented due to volatility, are reserved. Only properties defined in different versions of configs are valid, and are safe to be present in config.json

In versions 1 and 2, if you're desperate to safely store metadata, you can use a `__meta` key.
```javascript
{
	"id": "...",
	// ...
	"__meta": {
		"your_data": "here"
	}
}
```

In version 3 and up however it's worth noting that there is a dedicated "metadata" property, which both you and the server can use to store metadata about the pack, and that any undocumented properties will be stripped from the config.json

You can store any information you want in the metadata property, and it will be included in the pack. However it's worth noting that because metadata from the server is written here too, the server's metadata will take priority over your metadata.

A good practice to ensure all your metadata is kept in-tact is to use a parent key to store your data. Some examples would be like `__your_name` or `__meta` or `__data` or `__soundpack_name`. We'll use "__meta" in the example below.
```javascript
{
	"id": "..."
	// ... pack data here
	"metadata": {
		"__meta": {
			"your_data": "here",
			// you can store anything that is valid json
			"discord_support_servers": [
				"https://discord.gg/MMVrhWxa4w"
			],
		}
		// ... server data here
	}
}
```

The server can write any keys into metadata, which is why it's important to choose a good parent key name. You can try to choose a unique name, or you can use the reserved `__meta` key.

## Licensing your soundpack
It's important to mention before we get into this that, you can only license your soundpack if you own the rights to the sounds you use in it. Sounds ripped from a youtube video are not your own, and you cannot license them. Sounds you record with your microphone of a keyboard you own can be licensed.

In order to supply a license with your pack, you can add a `LICENSE.txt` file, and put the license in there. Note that it must be `LICENSE.txt` and not `LICENSE` or `LICENSE.md` or `License.txt` or `license.txt` or `LiCeNsE.tXt`

## Version 1
```javascript
{
	// A unique identifier, usually assigned by the server
	"id": "sound-pack-1200000000001",

	// The name of the soundpack
	"name": "CherryMX Black - ABS keycaps",

	// how the key definitions are defined
	"key_define_type": "single" || "multi",

	// if the soundpack includes numpad definitions
	"includes_numpad": false, // unused but required

	// the sound file to use when key_define_type is "single". This property is still required when key_define_type is "multi", but is unused in that mode.
	"sound": "sound.ogg",

	// key definitions
	"defines": {
		// format
		"keyCode": "definition"
		// when key_define_type is "single"
		"1": [
			2894,
			226
		],
		"2": [
			12946,
			191
		],
		// when key_define_type is "multi"
		"3": "sound.ogg",
		"4": "sound.ogg"
	},

	// though the default assumed version is 1, it's better to define it incase the default ever changes.
	"version": 1
}
```

## Version 2
This version adds support for keyup sounds for individual files or when "key_define_type" is "multi". This version *does not* support keyup sounds for sound clips or when "key_define_type" is "single".

This version also adds support for sound ranges which will be randomly selected from on startup.

**Note**: This version does nothing when "key_define_type" is "single"

This version deprecates `includes_numpad`. This version and all future versions will not use it.
```javascript
{
	"key_define_type": "multi",
	// fallback sounds, used when a keycode doesn't have a definition
	"sound": "generic{0-4}.mp3", // randomly selects a fallback key_down sound. eg. generic1.mp3 or generic3.mp3
	"soundup": "generic_up.mp3", // the key_up sound to be played when the key is released.

	// key definitions
	"defines": {
		"14": "backspace.mp3",
		"14-up": "release_backspace.mp3", // the key_up sound to be played when the key is released.
		"28": "ENTER{0-2}.mp3", // randomly selects a key_down sound from the list. eg. ENTER0.mp3 or ENTER2.mp3
		"28-up": "enter_release_{0-3}.mp3", // randomly selects a key_up sound from the list. eg. enter_release_2.mp3
		"57": "spacebar.mp3",
		"57-up": "release_spacebar.mp3",
		// all undefined keycodes will fallback to the sounds defined in "sound" and "soundup"
	},

	// this is required.
	"version": 2
}
```

## Version 3 [DRAFT]
This version introduces a new way to control sounds. You can utilize both sound clips and individual files in one sound pack, as well as randomize what sound is played on each key press or key release, cycle through a list of sounds as keys are pressed or even configure sounds that repeat while you hold down a key.

This version also standardizes metadata storage, for things like author information.

This version deprecates `sound`, `soundup`, and `key_define_type`.
```javascript
{
	"sounds": {
		// play a clip of a file
		"keydown": {
			"file": "#/sound.ogg", // #/ marks the root of the soundpack
			"clip": [2186, 281], // ["start", "length"]
		},
		"keyup": {
			"file": "#/sound.ogg",
			"clip": [3251, 281],

			// note that this is the default, and you don't need to specify it. See below for when you would want to define mode.
			"mode": "default"
		},

		// play the whole file
		"key_down": {
			"file": "#/sound2.ogg",
		},
		"key_up": {
			"file": "#/sound2_up.ogg",
		},

		// if the key is held, repeat after x ms
		"key_repeat": {
			"file": "#/sound3.ogg",
			"repeat-delay": 1000 // 1s
		},
		"repeatkey": {
			"file": "#/sound.ogg",
			"clip": [4566, 191],
			"repeat-delay": 2500 // 2.5s
		},

		// cycle through random sounds
		"keyrandom": {
			"mode": "random",
			"file": "#/sound.ogg",
			"clips": [
				[1321, 191],
				[1542, 191],
			]
		},
		"key_random": {
			"mode": "random",
			"files": [
				"#/sound2.ogg",
				"#/sound3.ogg"
			]
		},
		"key_random_repeat": {
			"mode": "random",
			"files": [
				"#/sound2.ogg",
				"#/sound3.ogg",
			],
			"repeat-delay": 1500, // 1.5s
		},

		// cycle through each file in order
		"key_cycle": {
			"mode": "cycle",
			"files": [
				"#/duck.ogg",
				"#/duck.ogg",
				"#/goose.ogg",
			]
		}
		// cycle through each clip in order
		"keycycle": {
			"mode": "cycle",
			"clips": [
				[1321, 191],
				[1542, 191],
			]
		}
	}

	// key definitions
	"defines": {
		// format
		"keyCode": ["keyDown", "keyUp"]
		// definitions

		// define one sound for key down only
		"1": ["keydown"],

		// define two sounds for key down and key up
		"2": ["key_down", "keyup"],

		// repeating keys must be on the keydown cycle
		"3": ["key_repeat"],

		// cycling keys must be on the keydown cycle, but they must also have multiple definitions to function.
		"4": ["key_cycle"],
		"5": ["key_cycle"],
	},

	// this is required.
	"version": 3

	// v3 standardizes metadata storage.
	"metadata": {}
}
```

### Random Repeating sound definitions
Note that, when using a random repeating sound definition, the sound selection will be re-randomized each repeat cycle.

eg.
```javascript
"key_random_repeat": {
	"mode": "random",
	"files": [
		"#/sound2.ogg",
		"#/sound3.ogg",
	],
	"repeat-delay": 1500, // 1.5s
}
```

To disable this behaviour, and have the sound only be randomized on keyDown instead of on keyRepeat, you can set "reroll" to false.

eg.
```javascript
"key_random_repeat_same": {
	"mode": "random",
	"files": [
		"#/sound2.ogg",
		"#/sound3.ogg",
	],
	"repeat-delay": 1500, // 1.5s
	"reroll": false,
}
```

To further explain this, with reroll set to true (the default), while holding a key, every 1.5s the application will randomly choose between sound2.ogg and sound3.ogg, but if you set reroll to false, the application will randomly choose between sound2.ogg and sound3.ogg and then play that sound every 1.5s.

So for example, if reroll is false, and the application chooses sound2.ogg, sound2.ogg will play every 1.5s

### Cycle repeating sound definition
It's important to note that cycle repeating sound definitions do not operate similar to random repeating sound definitions. Cycle repeating sound definitions only repeat the same sound, and will not cycle to the next sound. This cannot be modified with a toggle.

eg.
```javascript
"key_cycle": {
	"mode": "cycle",
	"files": [
		"#/duck.ogg",
		"#/duck.ogg",
		"#/goose.ogg",
	],
	"repeat-delay": 500 // 0.5s
}
```

## Version 4 [DRAFT]
A draft has not yet been started, however, v4 is planned to implement configurations, which allows pack authors to provide multiple variations of their pack in one pack.

For example, authors could create a pack which has 2 variations, and in the first variation, normal keys play duck.ogg and special keys play goose.ogg. In the second variation, every key cycles through duck.ogg, duck.ogg and goose.ogg in that order. The author could also name these variations "Basic" and "Duck Duck Goose", and then the user could select these variations via a dropdown in the app.

This version deprecates `defines` in favour of `configurations`.