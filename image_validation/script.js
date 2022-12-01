const image = document.getElementById("image");
const newImg = document.getElementById("newImage");


image.addEventListener("change", (e) => {
    // console.log(e.target.files);
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    let size = e.target.files[0]['size'];
    let type = e.target.files[0]['type'];

    if (size > 500000) {
        alert("Image size should be less then 500KB");                
        e.target.value ="";
    } else if (!(allowed.includes(type))) {
        alert("Image should be jpg or png");
        e.target.value ="";
    } else {
        newImg.src=URL.createObjectURL(e.target.files[0]);
    }
});


