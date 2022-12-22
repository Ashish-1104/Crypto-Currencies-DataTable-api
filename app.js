let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let first_page = document.querySelector(".first_page");
let last_page = document.querySelector(".last_page");
let coinGekuUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rows}&page=1&sparkline=false";
let usd, eur, inr;
let page = 1;
let rows=10;
let add = document.querySelector(".coinTable");
previous.addEventListener("click",async () => {
    if (page > 1) {
        page--;
        for (var i = rows; i > 0; i--) {
            // console.log(i);
            add.deleteRow(i);
        }
       await getData()
    }
})

next.addEventListener("click", async() => {
    if (page < 100/rows) {
        page++;
        for (var i = rows; i > 0; i--) {
            // console.log(i);
            add.deleteRow(i);
        }
       await getData()
    }
});

first_page.addEventListener("click",async()=>{
    page=1;
    for(var i=rows;i>0;i--)
        add.deleteRow(i);
    await getData();
})

last_page.addEventListener("click",async()=>{
    page=10;
    for(var i=rows;i>0;i--)
        add.deleteRow(i);
    await getData();
})
function genTable() {

    for (var i = 0; i < rows; i++) {
        let row = add.insertRow(i + 1);
        let serial = row.insertCell(0);
        let icon = row.insertCell(1);
        let symbol = row.insertCell(2);
        let name = row.insertCell(3);
        let dol = row.insertCell(4);
        let euro = row.insertCell(5);
        let rup = row.insertCell(6);

        serial.innerHTML = (page - 1) * rows + i + 1;
        icon.innerHTML = `<img src=${usd[i].image}>`;
        symbol.innerHTML = usd[i].symbol;
        name.innerHTML = usd[i].name;
        dol.innerHTML = "$ "+usd[i].current_price;
        euro.innerHTML = "€ "+eur[i].current_price;
         rup.innerHTML = "₹ "+inr[i].current_price;
    }

}

let getData = async () => {

    let crypto=document.querySelector(".coinTable");
    let load=document.createElement("img")
    load.src="images/loading.gif";
    load.classList.add("loadingGif");
    crypto.appendChild(load);
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rows}&page=${page}&sparkline=false`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            usd = data;
        })


    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${rows}&page=${page}&sparkline=false`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            eur = data;
        })


    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${rows}&page=${page}&sparkline=false`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            inr = data;
        })
        load.remove();

    genTable();
}

getData();


