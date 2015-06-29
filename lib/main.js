// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var panel = require("sdk/panel");
var timers = require("sdk/timers");
var data = require("sdk/self").data;
var runtime = require("sdk/system/runtime");
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
      height: 80,
      contentURL: data.url(osWarnFile),
});

// Display the warning
function showPanel() {
    myPanel.show();
    timers.setTimeout(function() {
        myPanel.hide();
    }, 2000);
}

var pressButton = function() {
    // We're already showing the warning
    if (myPanel.isShowing) {
        myPanel.hide();
        Cc['@mozilla.org/toolkit/app-startup;1']
            .getService(Ci.nsIAppStartup)
            .quit(Ci.nsIAppStartup.eAttemptQuit)
    }
    // Show the warning since we didn't quit yet
    showPanel();
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
