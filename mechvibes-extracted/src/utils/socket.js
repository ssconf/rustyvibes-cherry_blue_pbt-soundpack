const os = require("os");
const WebSocket = require('ws');
const EventSystem = require("./event_system");

// How many times the socket can reconnect without a successful connection before it gives up.
let socket_reconnect_limit = 5;
let log;

class DebugSocket extends EventSystem {
	constructor(app, _log) {
		log = _log;
		this.app = app;

		this.enabled = false; // whether or not remote debugging is enabled
		this.identifier = undefined; // this users uuid
		this.debugger = undefined; // the uuid of the debugger
		this.remoteUrl = "wss://beta.mechvibes.com/debug/server/";

		this.__socket_options = {
			origin: "https://beta.mechvibes.com",
			headers: {
				"User-Agent": `Mechvibes/${this.app.getVersion()} (Electron/${process.versions.electron})`,
			},

			// Unfortunately, the version of electron we're using doesn't support something about modern certificates,
			// and as such we have to disable certificate validation in order for the socket to connect.
			// This is absolutely a security risk, but it's the only way to get the socket to connect.
			// Thankfully, the socket is disabled by default, and users have to enable it manually,
			// plus the certificate is still used, so the connection is still encrypted,
			// so this shouldn't be a huge issue.
			rejectUnauthorized: false
		};

		this.socket = undefined;
	}

	open() {
		this.enabled = true;
		this.socket = new WebSocket(this.remoteUrl, this.__socket_options);
		this.socket.on("open", (e) => {
			console.log(e);
			this.emit("open", e);
			socket_reconnect_limit = 5;

			socket.send(JSON.stringify({
				type: "identify",
				data: "client",
				userInfo: {
					hostname: os.hostname(), // Lunas-Macbook-Pro.local
					username: os.userInfo().username, // lunaalfien
					platform: os.platform(), // darwin
					version: app.getVersion() // v2.3.5
				},
				resume: debug.identifier // The identifier is used to resume a previous session.
			}));
		})

		this.socket.on("message", (raw) => {
			const data = raw.toString();
			const json = JSON.parse(data);
			switch (json.type) {
				case "identify":
					this.identifier = json.data;
					break;
				case "connect":
					console.log(json);
					dialog.showMessageBox({
						type: "info",
						title: "Remote Debugging",
						message: "Incoming connection",
						detail: `A remote debugging session has been initiated by ${json.data.first_name} ${json.data.last_name}.`,
						buttons: ["Accept", "Reject"]
					}).then((response) => {
						if (response.response === 0) {
							this.debugger = json.data.uuid;
							socket.send(JSON.stringify({ type: "connect", accept: true, uuid: json.data.uuid }));
						} else {
							socket.send(JSON.stringify({ type: "connect", accept: false, uuid: json.data.uuid }));
						}
					});
					break;
				case "command":
					handleCommand(json);
					break;
				case "restart":
					this.app.relaunch();
					this.app.quit();
					break;
				default:
					socket.send(JSON.stringify({ type: "error", message: "Unknown command." }));
					break;
			}
			console.log(data);
		})
		this.socket.on("close", () => {
			if (this.enabled) {
				if (socket_reconnect_limit > 0) {
					socket_reconnect_limit--;
					this.emit("reconnecting", socket_reconnect_limit);
					log.variables.sender = "socket";
					log.warn("Socket closed, reopening...");
					log.variables.sender = "main";
					setTimeout(() => {
						this.open();
					}, 1000);
				} else {
					this.emit("closed", true);
					log.variables.sender = "socket";
					log.warn("Socket reconnect limit reached, disabling remote debugging.");
					log.variables.sender = "main";
				}
			} else {
				this.emit("closed", false);
				log.variables.sender = "socket";
				log.info("Closed");
				log.variables.sender = "main";
			}
		})
		this.socket.on("error", (err) => {
			this.emit("error", err);
			log.variables.sender = "socket";
			// log.error(err);
			console.log(err, socket);

			log.variables.sender = "main";
		})
	}

	send(data) {
		this.socket.send(data);
	}

	sendJSON(data) {
		this.socket.send(JSON.stringify(data));
	}

	close() {
		this.enabled = false;
		this.socket.close();
	}
}

// Initialize the socket connection to the remote debugger.
function initializeSocket(app, log, debug) {
	let socket = new WebSocket(debug.remoteUrl, );



	return socket;
}

module.exports = DebugSocket;