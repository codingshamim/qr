const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");
const downloadBtn = document.querySelector(".download-btn");
let preValue;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
    downloadBtn.classList.add("active");
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});

const actionButton = document.querySelectorAll(".action-button");
actionButton.forEach((button) => {
  button.addEventListener("click", () => {
    const isclick = button.getAttribute("action");
    const scanner = document.querySelector(".scanner");
    const generator = document.querySelector(".generator");
    actionButton.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add "active" class to the clicked button
    button.classList.add("active");
    if (isclick === "scanner") {
      scanner.style.display = "block";
      generator.style.display = "none";
    } else {
      scanner.style.display = "none";
      generator.style.display = "block";
    }
  });
});

downloadBtn.addEventListener("click", () => {
  const imageSrc = qrImg.getAttribute("src");
  const imageName = getImageName(imageSrc);

  // Create a link element
  const downloadLink = document.createElement("a");
  downloadLink.href = imageSrc;
  downloadLink.download = imageName;

  // Simulate click on the link to start download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

function getImageName(imageSrc) {
  const lastSlashIndex = imageSrc.lastIndexOf("/");
  return imageSrc.substring(lastSlashIndex + 1);
}
