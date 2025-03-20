document.addEventListener("DOMContentLoaded", () => {// To run js script after the HTML is fully loaded
  const umbrella = document.getElementById("umbrella"); // To get access to umbrella image 
  const logoPreview = document.getElementById("logo-preview"); // To get access to logo display on umbrella
  const colorButtons = document.querySelectorAll(".color-btn"); // To get access to colors
  const logoInput = document.getElementById("logoInput"); // To get access to input field to upload image
  const uploadBtn = document.getElementById("upload-btn"); // To get access to upload button
  const fileNameDisplay = document.getElementById("file-name"); // To get access to name display in upload button
  const removeFileBtn = document.getElementById("remove-file"); // To get access to remove file icon
  const loader = document.getElementById("umbrella-loader"); // To get access to loader shown in umbrella
  const iconLoader = document.getElementById("icon-loader"); // To get access to loader shown in upload button
  const uploadIcon = document.querySelector(".icon"); // To get access to loader shown in upload icon

  // Handle color change
  colorButtons.forEach(button => {
    button.addEventListener("click", () => {
      showLoader();
      const color = button.getAttribute("data-color");
      umbrella.src = `images/${color}-umbrella.png`;//Update umbrella image dynamically

      //Change whole page background color based on color selection
      document.body.style.backgroundColor = getBackgroundColor(color);
      uploadBtn.style.backgroundColor = getBackgroundColor(color, true);
      removeFileBtn.style.backgroundColor = getBackgroundColor(color, true);
      loader.style.filter = getLoaderBackgroundColor(color);

      // Highlight selected color
      document.querySelectorAll(".color-btn").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  //Display Loader and disable the umbrella image and icon while loader shown
  function showLoader() {
    umbrella.style.display = "none";
    uploadIcon.style.display = "none";
    logoPreview.style.display = "none";
    loader.style.display = "block";
    iconLoader.style.display = "block";
    // Disable body interactions
    document.body.classList.add("disabled-body");

    // Disable Upload Button
    uploadBtn.classList.add("disabled");
    logoInput.disabled = true; // Prevent file selection

    // Disable color buttons
    colorButtons.forEach(button => button.disabled = true);

    setTimeout(() => {
      uploadIcon.style.display = "block";
      umbrella.style.display = "block";
      if (logoPreview.src && logoPreview.src !== '') logoPreview.style.display = "block";
      iconLoader.style.display = "none";
      loader.style.display = "none";

      // Re-enable body interactions
      document.body.classList.remove("disabled-body");

      // Enable Upload Button
      uploadBtn.classList.remove("disabled");
      logoInput.disabled = false;

      // Enable color buttons
      colorButtons.forEach(button => button.disabled = false);
    }, 7000);

  }

  // Handle logo upload
  logoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    showLoader();

    if (file && file.size <= 5 * 1024 * 1024) { // Max 5MB
      const reader = new FileReader();
      reader.onload = function (e) {
        logoPreview.src = e.target.result;
        logoPreview.classList.remove("logo-hidden");

        // Display file info
        removeFileBtn.style.display = "flex";
        fileNameDisplay.textContent = file.name;
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be under 5MB");
    }
  });

  // Remove uploaded file
  removeFileBtn.addEventListener("click", () => {
    logoPreview.removeAttribute("src");
    logoPreview.style.display = "none"; // Hide when no source
    logoPreview.classList.add("logo-hidden");
    logoInput.value = "";
    fileNameDisplay.textContent = 'Upload Logo';
    removeFileBtn.style.display = "none";
  });

  // Function to get theme color
  function getBackgroundColor(color, isButton) {
    const colors = {
      blue: isButton ? '#7171f0' : "#d7efff",
      pink: isButton ? '#e592a0' : "#ffd7eb",
      yellow: isButton ? '#e7e729' : "#fff5d7",
    };
    return colors[color] || "#fefbf1";
  }
  function getLoaderBackgroundColor(color) {
    const colors = {
      blue: 'invert(38%) sepia(76%) saturate(682%) hue-rotate(221deg) brightness(90%) contrast(90%)',
      pink: 'invert(71%) sepia(28%) saturate(747%) hue-rotate(315deg) brightness(95%) contrast(90%)',
      yellow: 'invert(83%) sepia(53%) saturate(500%) hue-rotate(2deg) brightness(105%) contrast(90%)',
    };

    return colors[color] || "invert(1)";
  }
});
