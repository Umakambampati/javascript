import {foodItem} from './fooditems.js';


console.log(foodItem);
function displayItems(){
    var biryani=document.getElementById('biryani');
    var chicken=document.getElementById('Chicken');
    var paneer=document.getElementById('Paneer');
    var vegetable=document.getElementById('Vegetables');
    var chinese=document.getElementById('Chinese');
    var south_indian=document.getElementById('South-Indian');

    const biryaniData=foodItem.filter(item=> item.
        category=='biryani');
        console.log(biryaniData);
    const chickenData=foodItem.filter(item=> item.
        category=='chicken');
        console.log(chickenData);
    const paneerData=foodItem.filter(item=> item.
        category=='paneer');
        console.log(paneerData);
    const vegetableData=foodItem.filter(item=> item.
        category=='vegetable');
        console.log(vegetableData);
    const chineseData=foodItem.filter(item=> item.
        category=='chinese');
        console.log(chineseData);
    const south_indian_Data=foodItem.filter(item=> item.
        category=='south indian');
        console.log(south_indian_Data);

    biryaniData.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        biryani.appendChild(itemCard)
    })
    chickenData.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        chicken.appendChild(itemCard)
    })
    paneerData.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        paneer.appendChild(itemCard)
    })
        vegetableData.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        vegetable.appendChild(itemCard)
    })
        chineseData.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        chinese.appendChild(itemCard)
    })
        south_indian_Data.map(item=> {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id',item.id)

        cardTop.appendChild(star);
        cardTop.appendChild(heart);

        var img=document.createElement('img');
        img.src=item.img;

        var itemName=document.createElement('p');
        itemName.setAttribute('id','item-name');
        itemName.innerText=item.name;

        var itemPrice=document.createElement('p');
        itemPrice.setAttribute('id','item-price');
        itemPrice.innerText='Price ₹.'+ item.price;

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);

        south_indian.appendChild(itemCard)
    })
    
}
displayItems();

const categoryListdata=[...new Map(foodItem.map(item=>[item
    ['category'],item])).values()];
console.log(categoryListdata)

function categoryList(){
    var categoryList=document.getElementById('category-list');

    categoryListdata.map(item=> {
        var listcard=document.createElement('div')
        listcard.setAttribute('class','list-card');

        varlistImg=document.createElement('img');
        listImg.src=item.img;
        
    })
}
