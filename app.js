// let d;
// async function info(num){

// let url="https://thronesapi.com/api/v2/Characters/"+num;
// // let url ="http://api.aviationstack.com/v1/flights?access_key=9b079cb171aedca665f8669b08da209d";
// console.log(url);

//  await fetch(url).then((response)=>{
//     let res=response.json();
//     return res;
// }).then((data)=>{
    
//     // console.log("this is ",data);
//     d=data;
//     console.log(d);
//     genCard(d);
//     // return data;
// }).catch((err)=>{
//     console.log(err);
//     return err;
// })
// return d;
// }


// let btn=document.querySelector("button");
// btn.addEventListener("click",()=>{
//     let num=Math.floor(Math.random()*53+1)
//     console.log(num);
//     info(num);
// })
// async function genCard(data)
// {   document.querySelector("img").src=data.imageUrl;
//     document.querySelector("h1").innerHTML=data.fullName;
//     document.querySelector(".title").innerHTML=data.title;
//     document.querySelector(".family").innerHTML=data.family; 
//     console.log(data);
// }

// const hd=document.createElement("h1");
// const n=document.createTextNode("MY heading")
// hd.appendChild(n);

// // const add=document.querySelector(".container")
// // add.appendChild(hd);


// const para = document.createElement("h2");
// const node = document.createTextNode("This is new.");
// para.appendChild(node);

// const element = document.querySelector("#parag");
// element.appendChild(para);

// const add=document.querySelector("table")


// // let p=
// let u="https://api.coinstats.app/public/v1/coins?skip=0&currency=dol";
//  fetch(u)
// .then((d)=> d.json())
// .then(x=>genTable(x))


let coinGekuUrl="https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false";

let ft=fetch(coinGekuUrl)
.then((d)=>{
    return d.json()
})
.then((data)=>{
    setTimeout(genTable(data)
, 2000);
})

let add = document.querySelector("table");
function genTable(data){
    console.log(data);
for(var i=0;i<data.length;i++){
let row=add.insertRow(i+1);
let serial=row.insertCell(0);
// console.log(data.coins[i].name);
let icon=row.insertCell(1);
let symbol=row.insertCell(2);
let name=row.insertCell(3);
let usd=row.insertCell(4);
let eur=row.insertCell(5);
let inr=row.insertCell(6);
cell1.innerHTML=data[i].name;
cell2.innerHTML=data[i].current_price;
}
}

