// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("hotkeys");
var notifications = require("notifications");
var panel = require("panel");
var timers = require("timers");
var data = require("self").data;

// Create the panel to show the warning
var myPanel = panel.Panel({
      width: 300,
      height: 60,
      contentURL: data.url("warn.html"),
});

// Display the warning
function showPanel() {
    myPanel.show();
    timers.setTimeout(function() {
        myPanel.hide();
    }, 2000);
}

// Set the status back to normal on hiding the panel
myPanel.on("hide", function() {
    lastQPress = 0;
});

// Define our initial state
var lastQPress = 0;

// Handle the keypress
var showHotKey = Hotkey({
  combo: "accel-meta-q",
  onPress: function() {
    // We're already showing the warning
    if (lastQPress) {
        myPanel.hide();
        Cc['@mozilla.org/toolkit/app-startup;1']
            .getService(Ci.nsIAppStartup)
            .quit(Ci.nsIAppStartup.eAttemptQuit)
    }
    // Show the warning since we didn't quit yet
    showPanel();
    // Set state as showing the warning
    lastQPress = 1;
  }
});
