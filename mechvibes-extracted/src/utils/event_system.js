class EventSystem {
	constructor() {
		this.events = {};
	}

	on(event, callback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
	}

	off(event, callback) {
		if (this.events[event]) {
			this.events[event] = this.events[event].filter(
				(cb) => cb !== callback
			);
		}
	}

	once(event, callback) {
		const onceCallback = (data) => {
			callback(data);
			this.off(event, onceCallback);
		};
		this.on(event, onceCallback);
	}

	emit(event, data) {
		if (this.events[event]) {
			this.events[event].forEach((cb) => cb(data));
		}
	}
}