// Define keyboard shortcuts for showing and hiding a custom panel.
var { Ci, Cu } = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var panel = require("sdk/panel");
var timers = require("sdk/timers");
var data = require("sdk/self").data;
var runtime = require("sdk/system/runtime");
var osString = runtime.OS;
var osWarnQuitFile;

Cu.import("resource://gre/modules/Services.jsm");

// Load the right warning
if (osString === "Darwin") {
        osWarnQuitFile = "warnquitmac.html";
    } else {
        osWarnFile = "warnquit.html";
}

// Create the panel to show the warning
var warnQuitPanel = panel.Panel({
    width: 300,
    height: 80,
    contentURL: data.url(osWarnQuitFile),
});

function showWarnPanel(panel) {
    panel.show();
    timers.setTimeout(function() {
        panel.hide();
    }, 2000);
}

function attemptQuit() {
    if (warnQuitPanel.isShowing) {
        // We're already showing the warning
        warnQuitPanel.hide();
        Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit);
    } else {
        // Show the warning since we didn't quit yet
        showWarnPanel(warnQuitPanel);
    }
}

// Handle the keypress
var AccelQ = Hotkey({
    combo: "accel-q",
    onPress: function() {
        attemptQuit();
    }
});
var AccelShiftW = Hotkey({
    combo: "accel-shift-w",
    onPress: function() {
        attemptQuit();
    }
});
