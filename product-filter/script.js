const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
    },
];


const productsContainer = document.querySelector(".products");
const categories = document.querySelector(".categories");
const inp = document.getElementById("search");


const brand = document.querySelector(".brand");


const displayProduct = (filterData) => {
    productsContainer.innerHTML = filterData.map((product) =>
        `
        <div class="product">
        <img src=${product.img}>
        <span class="p-title">${product.name}</span>
        <span class="p-price">$${product.price}</span>
        </div>
        `
    ).join("");

    console.log(filterData);
}


const displayBrand = (filterData) => {

    const cat = filterData.map((item) => item.cat);
    const category = [
        ...cat.filter((product, i) => cat.indexOf(product) == i)
    ];

    brand.innerHTML = category.map((product, i) =>
        `
    <div class="inp">    
    <input type="checkbox" id="${product}-${i}" name="${product}" value="${product}" class="chk">
    <label for="${product}-${i}">${product}</label>
    </div>
    `
    ).join("");
    
    brand.addEventListener("change", (e) => {
        const listCheck = [];
        document.querySelectorAll(".chk").forEach((list) => {
            if (list.checked) {
                listCheck.push(list.value);
            }
        })

        listCheck.length > 0 ? displayProduct(data.filter((items) => listCheck.includes(items.cat))) : displayProduct(data);
    })
}

displayBrand(data);

inp.addEventListener("keyup", (e) => {
    const val = e.target.value.toLowerCase();

    if (val) {
        console.log(val);
        displayProduct(
            data.filter((item) => item.name.toLowerCase().indexOf(val) !== -1)
        );
    } else {
        displayProduct(data)
    }

});


const displayCat = (filterData) => {
    const cat = filterData.map(cats => cats.cat);
    const category = [
        "All",
        ...cat.filter((item, i) => cat.indexOf(item) == i)
    ]
    categories.innerHTML = category.map((list) =>
        `<p>${list}</p>`
    ).join("");

    categories.addEventListener("click", (e) => {
        const selCat = e.target.textContent;
        selCat === "All" ? displayProduct(data) : displayProduct(data.filter((item) => item.cat === selCat))
    })
}


const setPrice = (filterData) => {
    const range = document.getElementById("range");
    const selText = document.getElementById("range-txt");

    const arr = filterData.map(list => list.price);

    const min = Math.min(...arr);
    const max = Math.max(...arr);

    range.min = min;
    range.max = max;

    range.addEventListener("input", (e) => {
        selText.textContent = `$ ${e.target.value}`;
        displayProduct(filterData.filter((items) => items.price <= e.target.value))
    })

}

displayProduct(data);
displayCat(data);

setPrice(data);


// Create Categories
