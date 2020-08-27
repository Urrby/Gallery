const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const closeBtn = overlay.querySelector(".close");
const viewBtn = gallery.querySelectorAll("button");
const galleryImg = gallery.querySelectorAll("img");
const prevBtn = overlay.querySelector(".previous");
const nextBtn = overlay.querySelector(".next");
const imgArr = [];
const overlayImg = overlay.querySelector("img");
let rndNumberArray = populateRndArray([], 16);
function populateRndArray(arr, limit) {
    while (arr.length < limit) {
        const random = Math.floor(Math.random() * limit) + 1;
        if(arr.indexOf(random) === -1) arr.push(random);
    }
    return arr;
}
function handleView(e) {
    overlayImg.src = e.target.parentElement.previousElementSibling.src;
    overlay.classList.add("open");
}
function closeOverlay(e) {
    overlay.classList.remove("open");
}

function nextHandle(e) {
    overlayImg.src = imgArr[imgArr.indexOf(overlayImg.src) + 1] || imgArr[0];
}
function prevHandle(e) {
    overlayImg.src = imgArr[imgArr.indexOf(overlayImg.src) - 1] || imgArr[15];
}
function keyHandler(e) {
    if(e.key === "Escape") {
        closeOverlay()
    } else if(e.key === "ArrowRight") {
        nextHandle()
    } else if(e.key === "ArrowLeft") {
        prevHandle();
    }
}
galleryImg.forEach(function(img) {
    img.src = `img/${rndNumberArray.shift()}.jpg`;
    imgArr.push(img.src);
});
viewBtn.forEach(btn => btn.addEventListener("click", handleView));
closeBtn.addEventListener("click", closeOverlay)
window.addEventListener("keyup", keyHandler);
nextBtn.addEventListener("click", nextHandle);
prevBtn.addEventListener("click", prevHandle);
overlay.addEventListener("click", (e) => {
    if(e.target !== overlayImg && e.target !== nextBtn && e.target !== prevBtn) {
        closeOverlay();
    }
})
