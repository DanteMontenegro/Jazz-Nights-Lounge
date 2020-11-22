"use strict";

// Variables 
var song = document.querySelector(".song");
var play = document.querySelector(".play");
var replay = document.querySelector(".replay");
var outline = document.querySelector(".moving-outline circle");
var video = document.querySelector(".vid-container video");
var sounds = document.querySelectorAll(".time-select button");
var timeDisplay = document.querySelector(".time-display");
var outlineLength = outline.getTotalLength();
var timeSelect = document.querySelectorAll(".sound-picker button");
var fakeDuration = 600;
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = "".concat(Math.floor(fakeDuration / 60), ":").concat(Math.floor(fakeDuration % 60));
sounds.forEach(function (sound) {
  sound.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});
play.addEventListener("click", function () {
  checkPlaying(song);
});
replay.addEventListener("click", function () {
  restartSong(song);
});

var restartSong = function restartSong(song) {
  var currentTime = song.currentTime;
  song.currentTime = 0;
};

timeSelect.forEach(function (option) {
  option.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = "".concat(Math.floor(fakeDuration / 60), ":").concat(Math.floor(fakeDuration % 60));
  });
});

var checkPlaying = function checkPlaying(song) {
  var element = document.getElementById("button");

  if (song.paused) {
    song.play();
    video.play();
    element.classList.remove("play");
    element.classList.add("paused");
  } else {
    song.pause();
    video.pause();
    element.classList.remove("paused");
    element.classList.add("play");
  }
};

song.ontimeupdate = function () {
  var currentTime = song.currentTime;
  var elapsed = fakeDuration - currentTime;
  var seconds = Math.floor(elapsed % 60);
  var minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = "".concat(minutes, ":").concat(seconds);
  var progress = outlineLength - currentTime / fakeDuration * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "assets/svg/play.svg";
    video.pause();
  }
};