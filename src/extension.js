'use strict';

const { Meta, GLib } = imports.gi;


class Extension {
	constructor() {
		this.timeout_id = null;
	}

	enable() {
		Meta.disable_unredirect_for_display(global.display);

		// add a 5 minutes timeout to disable again
		this.timeout_id = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 300, () => {
			Meta.disable_unredirect_for_display(global.display);
			return GLib.SOURCE_CONTINUE;
		});
	}

	disable() {
		Meta.enable_unredirect_for_display(global.display);

		// remove timeout
		if (this.timeout_id) {
			GLib.Source.remove(this.timeout_id);
			this.timeout_id = null;
		}
	}
}


function init() {
	return new Extension();
}