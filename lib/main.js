// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("hotkeys");
var notifications = require("notifications");

var lastQPress = 0;

var showHotKey = Hotkey({
  combo: "accel-meta-q",
  onPress: function() {
    // TODO: Make delay configurable
    if (lastQPress && (Date.now() - lastQPress) < 1000) {
        Cc['@mozilla.org/toolkit/app-startup;1']
            .getService(Ci.nsIAppStartup)
            .quit(Ci.nsIAppStartup.eAttemptQuit)
    }
    else {
        notifications.notify({
            text: "Press Meta-Q again to quit"
        });
    }
    lastQPress = Date.now();
  }
});
