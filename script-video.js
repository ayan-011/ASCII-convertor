const videoInput = document.getElementById("videoUpload");
const video = document.getElementById("video");
const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d");
const output = document.getElementById("videoOutput");

const chars = ['#', '8', '&', '%', '$', '*', '(', '[', '/', '|', '!', ';', ':', ',', '.', '`', ' '];

// videoInput.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   video.src = URL.createObjectURL(file);
//   video.play();
// });

videoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  video.src = url;

  // Also set it to the visible controls-only video (optional)
  const fakeVideo = document.getElementById("videoControlsOnly");
  fakeVideo.src = url;

  video.play();
});

video.addEventListener("play", () => {
  const width = 100;
  const height = 45;
  canvas.width = width;
  canvas.height = height;

  function renderFrame() {
    if (video.paused || video.ended) return;

    ctx.drawImage(video, 0, 0, width, height);
    const frame = ctx.getImageData(0, 0, width, height).data;

    let ascii = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = frame[i], g = frame[i + 1], b = frame[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const charIndex = Math.floor(brightness / 255 * (chars.length - 1));
        ascii += chars[charIndex];
      }
      ascii += '\n';
    }

    output.textContent = ascii;
    requestAnimationFrame(renderFrame);
  }

  renderFrame();
});
