const btnCart = document.querySelectorAll(".btn-cart");
const noItems = document.getElementById("noItems");
const cart = localStorage.getItem("cart");
const cartLi = document.querySelector(".cart-div");

const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".close");

const table = document.getElementById("table");


class Cart {
    constructor() {
        this.btnCart = document.querySelectorAll(".btn-cart");
        this.noItems = document.getElementById("noItems");
        this.cart = localStorage.getItem("cart");
        this.cartLi = document.querySelector(".cart-div");
        this.sidebar = document.querySelector(".sidebar");
        this.close = document.querySelector(".close");
        this.table = document.getElementById("table");
        this.data = [
            {
                "id": 1,
                "img": "img-1.png",
                "title": "Chicken Pizza",
                "price": 125,
            },
            {
                "id": 2,
                "img": "img-2.png",
                "title": "Veg. Pizza",
                "price": 325,
            },
            {
                "id": 3,
                "img": "img-3.png",
                "title": "Mexican Pizza",
                "price": 450,
            },
            {
                "id": 4,
                "img": "img-4.jpg",
                "title": "Egg Pizza",
                "price": 550,
            },
            {
                "id": 5,
                "img": "img-5.png",
                "title": "Double cheese Pizza",
                "price": 380,
            },
            {
                "id": 6,
                "img": "img-6.png",
                "title": "Pepporoni Pizza",
                "price": 225,
            },
        ];
        this.cartItems = [];
        this.flex = document.querySelector("#cont");
    }
    foodCart() {

        this.data.forEach(items => {

            this.card = document.createElement("div");
            this.card.className = "card";

            this.imgDiv = document.createElement("div");
            this.imgDiv.className = "img";

            this.img = document.createElement("img");
            this.img.src = `assets/img/${items.img}`;

            this.body = document.createElement("div");
            this.body.className = "body";

            this.h4 = document.createElement("h4");
            this.h4.innerText = items.title;
            this.p = document.createElement("p");
            this.p.innerHTML = `Rs. <span>${items.price}</span>`

            this.a = document.createElement("a");
            this.a.innerText = "Add to Cart";
            this.a.className = "btn btn-cart";
            this.a.setAttribute("data-cart", items.price);
            this.a.setAttribute("data-name", items.title);
            this.a.setAttribute("data-id", items.id);

            this.a.addEventListener("click", (e) => this.addtoCart(e));

            this.card.appendChild(this.imgDiv);
            this.card.appendChild(this.body);

            this.imgDiv.appendChild(this.img);

            this.body.appendChild(this.h4);
            this.body.appendChild(this.p);
            this.body.appendChild(this.a);

            this.flex.appendChild(this.card);

        });



    }
    getLocal() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    calculate(e) {
        this.sum = 0;
        if (e) {
            this.inp = e.target.value
            this.num = e.target.nextSibling.getAttribute("pp")
            this.total = this.num * this.inp
            e.target.nextSibling.innerText = `Rs. ${this.total}`
        }
        document.querySelectorAll(".price").forEach((items) => {
            this.split = items.textContent.substr(3);
            // console.log(this.split);
            this.sum = Number.parseInt(this.sum) + Number.parseInt(this.split);
        })
        return document.querySelector(".total_price").textContent = `Your Cart Total is Rs. ${this.sum}`;
    }
    removeItems(e) {
        this.cartRemove = [];
        e.parentElement.remove();
        this.getLocal().forEach(items => {
            if (items.id != e.getAttribute("id")) {
                this.cartRemove.push({ 'id': items.id, 'name': items.name, 'price': items.price });
            }
        });
        localStorage.setItem('cart', JSON.stringify(this.cartRemove));

        console.log(this.cartRemove);
        console.log(this.cartRemove.length);

        if (this.cartRemove.length == 0) {
            localStorage.removeItem("cart");
            this.getElements();
        }
        if (this.cartRemove.length > 0) {
            this.calculate();
        }
        this.countCart();
    }

    getElements() {
        this.get = this.getLocal();
        this.table.innerHTML = "";

        if (this.getLocal()) {
            const h5 = document.createElement("h5");
            const btn = document.createElement("a");
            btn.className = "btn checkout";
            btn.textContent = "Checkout";
            for (let i = 0; i < this.get.length; i++) {

                window['tr_' + i] = document.createElement("tr");
                window['td_' + i] = document.createElement("td");
                window['td_' + i].setAttribute("id", i);
                window['p_' + i] = document.createElement("p");
                window['inp_' + i] = document.createElement("input");
                window['inp_' + i].type = "number";
                window['inp_' + i].setAttribute("min", 0);
                window['inp_' + i].value = "1";
                window['inp_' + i].className = "itemCart";


                window['price_' + i] = document.createElement("p");
                window['price_' + i].className = "price";
                window['price_' + i].setAttribute("pp", this.get[i].price);

                window['close_' + i] = document.createElement("span");
                window['close_' + i].className = "close-cart";
                window['close_' + i].setAttribute("id", this.get[i].id);
                window['close_' + i].addEventListener("click", () => this.removeItems(window['close_' + i]));

                window['close_' + i].innerHTML = "&times";

                window['p_' + i].textContent = this.get[i].name;
                this.sum += +this.get[i].price;

                window['inp_' + i].addEventListener("change", (e) => this.calculate(e));
                window['td_' + i].appendChild(window['p_' + i]);
                window['td_' + i].appendChild(window['inp_' + i]);
                window['td_' + i].appendChild(window['price_' + i]);
                window['td_' + i].appendChild(window['close_' + i]);

                window['price_' + i].textContent = `Rs. ${this.get[i].price}`;

                window['tr_' + i].appendChild(window['td_' + i]);
                table.appendChild(window['tr_' + i]);
            }

            h5.className = "total_price";
            table.appendChild(h5);
            table.appendChild(btn);
            this.calculate();
        } else {

            this.p = document.createElement("p");
            this.p.style.textAlign = "center";
            this.p.textContent = "Cart is Empty";
            this.table.appendChild(this.p);
        }
    }

    activeSidebar() {
        this.sidebar.classList.add("active")
        this.getElements();
    }

    checkItem(ids) {
        let loc = this.getLocal();
        return (loc) ? loc.some(cart => cart.id == ids) : false;
    }

    addtoCart(e) {

        // console.log(e.target);

        this.dataCart = e.target.getAttribute("data-cart");
        this.dataId = e.target.getAttribute("data-id");
        this.dataName = e.target.getAttribute("data-name");
        this.check = this.checkItem(this.dataId);


        if (this.check == false) {
            if (this.getLocal()) {
                this.cartItems = this.getLocal();
            }
            this.cartItems.push({ 'id': this.dataId, 'name': this.dataName, 'price': this.dataCart });
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
            this.countCart();
            this.activeSidebar();
            // console.log(this.cartItems);

        }
        if (this.check == true) {
            alert("Data Already Added");
        }
        return this.cartItems;

    }

    countCart() {
        // console.log(this.cartItems);        
        if (this.getLocal())
            this.noItems.textContent = JSON.parse(localStorage.getItem("cart")).length;
    }
}


const newCart = new Cart();

newCart.countCart();

newCart.foodCart();

newCart.close.addEventListener("click", () => newCart.sidebar.classList.remove("active"));

newCart.cartLi.addEventListener("click", () => newCart.activeSidebar());
const counte = (newCart.getLocal()) ? newCart.countCart() : false;



