const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const output = document.getElementById("output");

const chars = ['@', '#', '8', '&', '%', '$', '*', '(', '[', '/', '|', '!', ';', ':', ',', '.', '`', ' '];

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const asciiWidth = 120;
      const aspectRatio = img.height / img.width;
      const charAspect = 0.5;
      const asciiHeight = Math.round(asciiWidth * aspectRatio * charAspect);

      canvas.width = asciiWidth;
      canvas.height = asciiHeight;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let ascii = "";

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          const charIndex = Math.floor(brightness / 255 * (chars.length - 1));
          ascii += chars[charIndex];
        }
        ascii += "\n";
      }

      output.textContent = ascii;
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
