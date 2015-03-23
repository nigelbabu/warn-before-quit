// Define keyboard shortcuts for showing and hiding a custom panel.
var { Ci, Cu } = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var panel = require("sdk/panel");
var timers = require("sdk/timers");
var data = require("sdk/self").data;
var runtime = require("sdk/system/runtime");
var osString = runtime.OS;
var osWarnFile;

Cu.import("resource://gre/modules/Services.jsm");

// Load the right warning
if (osString === "Darwin") {
        osWarnFile = "warnmac.html";
    } else {
        osWarnFile = "warn.html";
}

// Create the panel to show the warning
var myPanel = panel.Panel({
      width: 300,
      height: 80,
      contentURL: data.url(osWarnFile),
});

function showWarnPanel(panel) {
    panel.show();
    timers.setTimeout(function() {
        panel.hide();
    }, 2000);
}

var pressButton = function() {
    // We're already showing the warning
    if (myPanel.isShowing) {
        myPanel.hide();
        Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit);
    }
    // Show the warning since we didn't quit yet
    showWarnPanel(myPanel);
};

// Handle the keypress
var AccelQ = Hotkey({
  combo: "accel-q",
  onPress: function() {
    pressButton();
  }
});
var AccelShiftW = Hotkey({
  combo: "accel-shift-w",
  onPress: function() {
    pressButton();
  }
});
