class Live {
    constructor() {
        this.user = document.querySelector(".user");
        this.inp = document.getElementById("search");
        this.liteItem = [];
    }

    async fetchUser() {
        const res = await fetch("https://randomuser.me/api/?results=50");
        const data = await res.json();
        this.loadData(data.results);        
    }

    loadData(data) {
        this.user.innerHTML = "";

        data.forEach(users => {

            const li = document.createElement("li");
            this.liteItem.push(li);
            li.innerHTML = `
            <img src="${users.picture.large}" alt="">
              <div class="user-info">
                <h4>${users.name.first} ${users.name.last}</h4>
                <p>${users.location.city}, ${users.location.country}</p>
              </div>
            `;
            this.user.appendChild(li);
        })
    }
    filterUser(data){
        this.liteItem.forEach(items => {
            if(items.innerText.toLowerCase().includes(data.toLowerCase())){
                items.classList.remove("hide");
            }else{
                items.classList.add("hide");
            }
        })
    }
}


const search = new Live();
search.fetchUser();

search.inp.addEventListener("input", (e) => search.filterUser(e.target.value));