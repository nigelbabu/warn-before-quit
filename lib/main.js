// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("hotkeys");
var notifications = require("notifications");
var panel = require("panel");
var timers = require("timers");
var data = require("self").data;

var myPanel = panel.Panel({
      width: 300,
      height: 60,
      contentURL: data.url("warn.html"),
});

function showPanel() {
    myPanel.show();
    timers.setTimeout(function() {
        myPanel.hide();
        lastQPress = 0;
    }, 2000);
}
var lastQPress = 0;

var showHotKey = Hotkey({
  combo: "accel-meta-q",
  onPress: function() {
    // TODO: Make delay configurable
    if (lastQPress) {
        myPanel.hide();
        Cc['@mozilla.org/toolkit/app-startup;1']
            .getService(Ci.nsIAppStartup)
            .quit(Ci.nsIAppStartup.eAttemptQuit)
    }
    showPanel();
    lastQPress = 1;
  }
});
