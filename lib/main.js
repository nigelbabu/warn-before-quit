// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("hotkeys");
var panel = require("panel");
var timers = require("timers");
var data = require("self").data;
var runtime = require("runtime");
var osString = runtime.OS;
var osWarnFile;

// Load the right warning
if (osString === "Darwin") {
        osWarnFile = "warnmac.html";
    } else {
        osWarnFile = "warn.html";
}

// Create the panel to show the warning
var myPanel = panel.Panel({
      width: 300,
      height: 65,
      contentURL: data.url(osWarnFile),
});

// Display the warning
function showPanel() {
    myPanel.show();
    timers.setTimeout(function() {
        myPanel.hide();
    }, 2000);
}

// Handle the keypress
var showHotKey = Hotkey({
  combo: "accel-q",
  onPress: function() {
    // We're already showing the warning
    if (myPanel.isShowing) {
        myPanel.hide();
        Cc['@mozilla.org/toolkit/app-startup;1']
            .getService(Ci.nsIAppStartup)
            .quit(Ci.nsIAppStartup.eAttemptQuit)
    }
    // Show the warning since we didn't quit yet
    showPanel();
  }
});
