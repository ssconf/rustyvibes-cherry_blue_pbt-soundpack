// ... align this gist based on pressed_keys or iohook.on('keyup', ...)

// store pressed state of multiple keys
let pressed_keys = {};

// if key released, clear current key
ipcRenderer.on('keyup', ({ keycode }) => {
	const date = new Date();
	const time = `${date.getSeconds()}.${date.getMilliseconds()}`;
	log.debug(`msg, ${keycode}`);
	log.debug(`diff, ${(Number(time) - Number(_time))}`);
	// current_key_down = null;
	let holding = false;
	pressed_keys[`${keycode}`] = false;
	for (const key in pressed_keys) {
		if(pressed_keys[key]){
			holding = true;
		}
	}
	if(!holding){
		app_logo.classList.remove('pressed');
	}
});

// key pressed, pack current key and play sound
ipcRenderer.on('keydown', ({ keycode }) => {
	const date = new Date();
	const time = `${date.getSeconds()}.${date.getMilliseconds()}`;
	log.debug(`msg, ${keycode}`);
	log.debug(`diff, ${(Number(time) - Number(_time))}`);
	// if hold down a key, don't repeat the sound
	if(pressed_keys[`${keycode}`] !== undefined && pressed_keys[`${keycode}`]){
		return;
	}
	pressed_keys[`${keycode}`] = true;

	// display current pressed key
	// app_logo.innerHTML = keycode;
	app_logo.classList.add('pressed');

	// pack current pressed key
	current_key_down = keycode;

	// pack sprite id
	const sound_id = `keycode-${current_key_down}`;

	// get loaded audio object
	// if object valid, pack volume and play sound
	if (current_pack) {
		playSound(sound_id, volume.value);
	}
});