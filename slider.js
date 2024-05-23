(function() {
  let slideIndex = 0; // Initial slide index
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  // Function to show the next slide
  function showNextSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0; // Loop back to the first slide
    }
    slides[slideIndex].style.display = "block"; // Display the current slide
    updateDots(); // Update dots to indicate the current slide
    showTextLetterByLetter(slides[slideIndex]); // Display text letter by letter
  }

  // Set the slide interval
  let slideInterval = setInterval(showNextSlide, 5000); // Change slides every 5 seconds

  // Stop automatic sliding on hover
  document.querySelector(".slideshow-container").addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  // Restart automatic sliding when not hovering
  document.querySelector(".slideshow-container").addEventListener("mouseleave", () => {
    slideInterval = setInterval(showNextSlide, 5000);
  });

  // Function to change slides with next/prev buttons
  function changeSlides(n) {
    slideIndex += n;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    showSpecificSlide();
  }

  // Function to display the specific slide
  function showSpecificSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex].style.display = "block"; // Display the current slide
    updateDots(); // Update dots to indicate the current slide
    showTextLetterByLetter(slides[slideIndex]); // Display text letter by letter
  }

  // Function to display the current slide
  function setCurrentSlide(n) {
    slideIndex = n - 1;
    showSpecificSlide();
  }

  // Event listeners for previous and next buttons
  document.querySelector(".prev").addEventListener("click", () => changeSlides(-1));
  document.querySelector(".next").addEventListener("click", () => changeSlides(1));

  // Event listeners for dot navigation
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => setCurrentSlide(i + 1));
  }

  // Function to display text letter by letter
  function showTextLetterByLetter(slide) {
    const words = slide.querySelectorAll(".word");

    // Reset visibility and text content of all words
    for (let i = 0; i < words.length; i++) {
      words[i].style.visibility = "hidden";
      words[i].textContent = words[i].dataset.text; // Use a data attribute to store the original text
    }

    // Display each word sequentially
    let index = 0;
    function displayWords() {
      if (index < words.length) {
        showLetters(words[index]);
        index++;
        setTimeout(displayWords, 1000); // Adjust the delay between words (in milliseconds)
      }
    }

    displayWords(); // Start displaying the words
  }

  // Function to display letters of a word progressively
  function showLetters(word) {
    const text = word.dataset.text; // Get the original text content from the data attribute
    word.textContent = ""; // Clear the word text content
    word.style.visibility = "visible"; // Make the word visible

    // Display the letters of the word progressively
    let index = 0;
    function displayLetters() {
      if (index < text.length) {
        word.textContent += text.charAt(index);
        index++;
        setTimeout(displayLetters, 100); // Adjust the delay between letters (in milliseconds)
      }
    }

    displayLetters(); // Start displaying the letters
  }

  // Function to update the dots to reflect the current slide
  function updateDots() {
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex].className += " active";
  }

  // Initialize the slides
  showSpecificSlide();
})();
