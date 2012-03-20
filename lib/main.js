// Define keyboard shortcuts for showing and hiding a custom panel.
var { Hotkey } = require("hotkeys");
 
var showHotKey = Hotkey({
  combo: "accel-meta-q",
  onPress: function() {
    console.log("We disbled Meta-Q. You are welcome.");
  }
});
