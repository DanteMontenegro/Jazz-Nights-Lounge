$(document).ready(function() {
    var btn = $(".switch");
    btn.click(function() {
      btn.toggleClass("paused");
      return false;
    });
  });