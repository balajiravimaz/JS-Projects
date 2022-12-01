const icon = document.querySelector(".menu-icon");
let fa = document.querySelector(".fa-bars");


icon.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("active");    

    if (nav.classList.contains("active")) {
        fa.classList.remove("fa-bars");
        fa.classList.add("fa-times");        
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow="unset";
        fa.classList.remove("fa-times");
        fa.classList.add("fa-bars");  
    }
})

// header

const nav = document.querySelector(".nav");

window.addEventListener("scroll", function(e){
    nav.classList.toggle("active1", window.scrollY > 200);
})