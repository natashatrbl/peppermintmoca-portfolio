const header = document.querySelector("header");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    activeLink();
})

/* --------- Sticky Navbar ---------*/
function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------- Reveal Animation ---------*/

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "bottom", delay: 700 });

/* --------- Mix Portfolio Animation ---------*/

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: ".prt-card"
    },
    animation: {
        duration: 500
    }
});

/* --------- Modal Pop Up Animation ---------*/

let currentIndex = 0;

zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex)
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
    if(currentIndex === 0){
        currentIndex = 9;
    } else {currentIndex--;}
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if(currentIndex === 9){
        currentIndex = 0;
    } else {currentIndex++;}
    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/* --------- Swiper Animation ---------*/

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

/* --------- Change Active Navbar on Scroll ---------*/

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return { 
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter(sct => sct.y <= 0)
    
    let currSectionID = passedSections.at(-1).id;

    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();