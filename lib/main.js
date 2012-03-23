// Define keyboard shortcuts for showing and hiding a custom panel.
var { Cc, Ci } = require("chrome");
var { Hotkey } = require("hotkeys");
var panel = require("panel");
var timers = require("timers");
var data = require("self").data;
var osString = Cc["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;

// Create the panel to show the warning
var myPanel = panel.Panel({
      width: 300,
      height: 60,
      contentURL: data.url("warnwin.html"),
});

// Display the warning
function showPanel() {
    if (osString == 'Darwin') {
        myPanel.contentURL = data.url("warnmac.html");
    } if (osString == 'Linux') {
        myPanel = data.url("warnlinux.html");
    }
    console.log(osString);
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
