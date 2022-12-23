let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let first_page = document.querySelector(".first_page");
let last_page = document.querySelector(".last_page");
let pageno = document.querySelector(".pageno");
let coinGekuUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rows}&page=1&sparkline=false";
let usd, eur, inr;
let page = 1;
let rows = 10;
let clicks = 0;
let add = document.querySelector(".coinTable");
previous.addEventListener("click", async () => {

    if (page > 1) {
        page--;
        clicks++;

        await deleteTable();

        if (clicks === 1) {
            await getData()
        }
        clicks--;
        pageno.value--;
    }
})

next.addEventListener("click", async () => {
    if (page < 100 / rows) {
        page++;
        clicks++;

        await deleteTable();

        if (clicks === 1) {
            await getData()
        }
        clicks--;
        pageno.value++;
    }
});



first_page.addEventListener("click", async () => {
    page = 1;
    clicks++;

    await deleteTable();

    if (clicks === 1) {
        await getData()
    }
    clicks--;
    await getData();
    pageno.value = 1;
})

last_page.addEventListener("click", async () => {
    page = 10;
    clicks++;

    await deleteTable();

    if (clicks === 1) {
        await getData()
    }
    clicks--;
    await getData();
    pageno.value = 10;
})

pageno.addEventListener("keydown", async (keypress) => {
    if (keypress.key == 'Enter' && (Number(pageno.value) > 0 && Number(pageno.value) <= 10)) {
        page = pageno.value;
        if (add.rows.length === 12) {
            for (var i = rows; i > 0; i--) {
                add.deleteRow(i);
            }
        }
        await getData();

    }
})

async function deleteTable() {
    for (var i = add.rows.length - 2; i > 0; i--) {
        add.deleteRow(i);
    }
}

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
        dol.innerHTML = "$ " + usd[i].current_price;
        euro.innerHTML = "€ " + eur[i].current_price;
        rup.innerHTML = "₹ " + inr[i].current_price;
    }

}

let getData = async () => {

    let crypto = document.querySelector(".coinTable");
    let load = document.createElement("img")
    load.src = "images/loading.gif";
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


