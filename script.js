// Get Our element
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filed');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.full-screen');

//  bluid the funtions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateicon() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleprogess() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function srucb(e) {
  const scrubTImer = (e.offsetX / progress.offsetWidth) * video.duration;
  // console.log(scrubTImer);
  video.currentTime = scrubTImer;
}
function fullScreen() {
  const full = video;
  if (!document.fullscreenElement) {
    full.requestFullscreen().catch((err) => {
      alert(`error :${err.message}(${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateicon);
video.addEventListener('pause', updateicon);
video.addEventListener('timeupdate', handleprogess);

skipButton.forEach((button) => button.addEventListener('click', skip));
// ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
let mousedown = false;

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', srucb);
progress.addEventListener('mousedown', (e) => mousedown && srucb(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
fullscreen.addEventListener('click', fullScreen);
