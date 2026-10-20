// ... align based on win = createWindow() or app.on('ready', ...)

iohook.start();
// key pressed, pack current key and play sound
iohook.on('keydown', ({ keycode }) => {
	const date = new Date();
	const time = `${date.getSeconds()}.${date.getMilliseconds()}`;
	log.info(`main, ${keycode}`);
	win.webContents.send("keydown", keycode, time);
});

// TODO: keyup event