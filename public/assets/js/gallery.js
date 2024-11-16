$(document).ready(function () {
    const images = [
        "/public/assets/img/slides/Slide1.jpg",
        "/public/assets/img/slides/Slide2.jpg",
        "/public/assets/img/slides/Slide3.jpg",
        "/public/assets/img/slides/Slide4.jpg",
        "/public/assets/img/slides/Slide5.jpg",
        "/public/assets/img/slides/Slide6.jpg",
        "/public/assets/img/slides/Slide7.jpg",
        "/public/assets/img/slides/Slide8.jpg",
        "/public/assets/img/slides/Slide9.jpg",
        "/public/assets/img/slides/Slide10.jpg",
        "/public/assets/img/slides/Slide11.jpg",
        "/public/assets/img/slides/Slide12.jpg",
        "/public/assets/img/slides/Slide13.jpg",
        "/public/assets/img/slides/Slide14.jpg",
        "/public/assets/img/slides/Slide15.jpg",
        "/public/assets/img/slides/Slide16.jpg",
        "/public/assets/img/slides/Slide17.jpg",
        "/public/assets/img/slides/Slide18.jpg",
        "/public/assets/img/slides/Slide19.jpg",
        "/public/assets/img/slides/Slide20.jpg",
        "/public/assets/img/slides/Slide21.jpg",
        "/public/assets/img/slides/Slide22.jpg",
        "/public/assets/img/slides/Slide23.jpg",
        "/public/assets/img/slides/Slide24.jpg"
    ];
    let currentIndex = 0;
    // Logs the images array to the console
    // console.log(images);
    
    function showImage(index) {
        const galleryImage = document.getElementById("gallery-image");
        galleryImage.src = images[index];
    }
    
    function prevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    }
    
    function nextImage() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    }

    // Use jQuery to bind event listeners
    $(".prev").click(prevImage);
    $(".next").click(nextImage);
});