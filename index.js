import {foodItem} from './fooditems.js';

console.log(foodItem);
var cartData = [];

function displayItems(){
    var biryani=document.getElementById('biryani');
    var chicken=document.getElementById('chicken');
    var paneer=document.getElementById('paneer');
    var vegetable=document.getElementById('vegetable');
    var chinese=document.getElementById('chinese');
    var south_indian=document.getElementById('south-indian');

    const biryaniData=foodItem.filter(item=> item.category=='biryani');
    const chickenData=foodItem.filter(item=> item.category=='chicken');
    const paneerData=foodItem.filter(item=> item.category=='paneer');
    const vegetableData=foodItem.filter(item=> item.category=='vegetable');
    const chineseData=foodItem.filter(item=> item.category=='chinese');
    const south_indian_Data=foodItem.filter(item=> item.category=='south_indian');

    function createItemCard(item) {
        var itemCard=document.createElement('div');
        itemCard.setAttribute('id','item-card');
        itemCard.setAttribute('data-id', item.id);

        var cardTop=document.createElement('div')
        cardTop.setAttribute('id','card-top');

        var star=document.createElement('i');
        star.setAttribute('class','fa fa-star');
        star.setAttribute('id','rating')
        star.innerText=' '+item.rating;

        var heart=document.createElement('i');
        heart.setAttribute('class','fa fa-heart-o add-to-cart');
        heart.setAttribute('id', 'heart-' + item.id);
        heart.setAttribute('data-item-id', item.id);

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

        return itemCard;
    }

    biryaniData.map(item=> biryani.appendChild(createItemCard(item)));
    chickenData.map(item=> chicken.appendChild(createItemCard(item)));
    paneerData.map(item=> paneer.appendChild(createItemCard(item)));
    vegetableData.map(item=> vegetable.appendChild(createItemCard(item)));
    chineseData.map(item=> chinese.appendChild(createItemCard(item)));
    south_indian_Data.map(item=> south_indian.appendChild(createItemCard(item)));
}
displayItems();

const categoryListdata=[...new Map(foodItem.map(item=>[item['category'],item])).values()];
console.log(categoryListdata)

function categoryLists(){
    var categoryList=document.getElementById('category-list');

    categoryListdata.map(item=> {
        var listCard=document.createElement('div')
        listCard.setAttribute('class','list-card');

        var listImg=document.createElement('img');
        listImg.src=item.img;

        var listName= document.createElement('a');
        listName.setAttribute('class','list-name');
        listName.innerText=item.category;
        listName.setAttribute('href', '#' + item.category.replace(' ', '-'));
        
        listCard.appendChild(listImg);
        listCard.appendChild(listName);
        categoryList.appendChild(listCard);
    })
}
categoryLists();

// ========== UPDATED addToCart FUNCTION ==========
function addToCart(event){
    // Get the heart icon that was clicked
    const heart = event.target.closest('.add-to-cart');
    if (!heart) return;
    
    const itemId = heart.getAttribute('data-item-id') || heart.id.replace('heart-', '');
    const itemObj = foodItem.find(element => element.id == itemId);
    
    if (!itemObj) return;
    
    const index = cartData.findIndex(item => item.id == itemId);
    
    if(index === -1){
        // Add to cart
        heart.classList.add('toggle-heart');
        itemObj.quantity = 1;
        itemObj.basePrice = itemObj.price;
        cartData.push({...itemObj});
        console.log('Added to cart:', itemObj);
    } else {
        // Remove from cart
        heart.classList.remove('toggle-heart');
        cartData.splice(index, 1);
        console.log('Removed from cart:', itemObj);
    }
    
    // Update all cart displays
    updateCartDisplays();
}


function updateAllHeartIcons() {
    // Update heart icons in both desktop and mobile views
    document.querySelectorAll('.add-to-cart').forEach(heart => {
        const itemId = heart.getAttribute('data-item-id') || heart.id.replace('heart-', '');
        const isInCart = cartData.some(item => item.id == itemId);
        
        if (isInCart) {
            heart.classList.add('toggle-heart');
        } else {
            heart.classList.remove('toggle-heart');
        }
    });
}

function cartItems(){
    var tableBody= document.getElementById('table-body');
    tableBody.innerHTML='';

    cartData.map(item=> {
        var tableRow= document.createElement('tr');

        var rowdata1= document.createElement('td');
        var img =document.createElement('img');
        img.src=item.img;
        rowdata1.appendChild(img);

        var rowdata2= document.createElement('td');
        rowdata2.innerText=item.name;

        var rowdata3=document.createElement('td');
        var btn1= document.createElement('button');
        btn1.setAttribute('class','decrease-item')
        btn1.innerHTML='-';
        var span=document.createElement('span');
        span.innerText=item.quantity;
        var btn2= document.createElement('button');
        btn2.setAttribute('class','increase-item');
        btn2.innerHTML='+';

        rowdata3.appendChild(btn1);
        rowdata3.appendChild(span);
        rowdata3.appendChild(btn2);

        var rowData4=document.createElement('td');
        rowData4.innerText=item.price;

        tableRow.appendChild(rowdata1);
        tableRow.appendChild(rowdata2);
        tableRow.appendChild(rowdata3);
        tableRow.appendChild(rowData4);

        tableBody.appendChild(tableRow);
    })
    
    document.querySelectorAll('.increase-item').forEach(item=>{
        item.addEventListener('click',incrementItem);
    })

    document.querySelectorAll('.decrease-item').forEach(item=>{
        item.addEventListener('click',decrementItem);
    })
}

// Add this function to check and show empty cart message
function updateCartEmptyMessage() {
    const tableBody = document.getElementById('table-body');
    const cartTitle = document.getElementById('cart-title');
    const mTotalAmount = document.getElementById('m-total-amount');
    
    if (!tableBody) return;
    
    // Check if cart is empty
    if (cartData.length === 0) {
        // Check if empty message already exists
        if (!document.getElementById('empty-cart-message')) {
            const emptyMessage = document.createElement('div');
            emptyMessage.id = 'empty-cart-message';
            emptyMessage.style.cssText = `
                text-align: center;
                padding: 40px 20px;
                color: #666;
                font-style: italic;
                background: #f9f9f9;
                border-radius: 10px;
                margin: 20px 0;
            `;
            
            emptyMessage.innerHTML = `
                <i class="fa fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px; color: #ddd;"></i>
                <p style="font-size: 18px; margin-bottom: 10px;">Your cart feels light!</p>
                <p style="font-size: 14px;">Add some delicious items from the menu</p>
            `;
            
            // Insert after cart title
            if (cartTitle && cartTitle.nextSibling) {
                cartTitle.parentNode.insertBefore(emptyMessage, cartTitle.nextSibling);
            }
        }
        
        // Hide the total amount display
        if (mTotalAmount) {
            mTotalAmount.style.display = 'none';
        }
    } else {
        // Remove empty message if it exists
        const emptyMessage = document.getElementById('empty-cart-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
      
        if (mTotalAmount) {
            mTotalAmount.style.display = 'block';
        }
    }
}

// SINGLE updateCartDisplays function - REMOVED DUPLICATE
function updateCartDisplays() {
   
    document.getElementById('cart-plus').innerText = cartData.length + ' Items';
    totalAmount();
    cartItems();
    
   
    updateMobileCartCount();
    
  
    updateCartEmptyMessage();
    
    
    if (window.innerWidth < 800) {
        updateAllHeartIcons();
    }
}

function incrementItem(){
    let itemName = this.closest('tr').children[1].innerText;
    let incObj = cartData.find(item => item.name === itemName);

    incObj.quantity++;
    incObj.price = incObj.basePrice * incObj.quantity;

    updateCartDisplays();
}

function decrementItem(){
    let itemName = this.closest('tr').children[1].innerText;
    let decObj = cartData.find(item => item.name === itemName);
    let index = cartData.indexOf(decObj);

    if(decObj.quantity > 1){
        decObj.quantity--;
        decObj.price = decObj.basePrice * decObj.quantity;
    } else {
        // Remove item from cart
        cartData.splice(index, 1);
        // Update heart icon
        document.querySelectorAll(`.add-to-cart[data-item-id="${decObj.id}"]`).forEach(heart => {
            heart.classList.remove('toggle-heart');
        });
    }

    updateCartDisplays();
}

function totalAmount(){
    var sum=0;
    cartData.map(item=>{
        sum+= item.price;
    })
    document.getElementById('total-item').innerText= 'Total Item : ' + cartData.length;
    document.getElementById('total-price').innerText= 'Total Price : ₹ ' + sum;
    document.getElementById('m-total-amount').innerText= 'Total Price : ₹ ' + sum;
}

document.getElementById('cart-plus').addEventListener('click',cartToggle);
document.getElementById('m-cart-plus').addEventListener('click',cartToggle);

  
var flag= false;
function cartToggle(){
    if(cartData.length > 0){
        document.getElementById('food-items').classList.toggle('food-items');
        document.getElementById('category-list').classList.toggle('food-items');
        document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle');
        document.getElementById('cart-page').classList.toggle('cart-toggle');
        document.getElementById('category-header').classList.toggle('toggle-category');
        document.getElementById('checkout').classList.toggle('cart-toggle');
        flag= true;
        console.log(flag);
        
        // ========== ADD BACK BUTTON FOR DESKTOP VIEW ==========
        // Only for desktop (screen width >= 800px)
        if (window.innerWidth >= 800) {
            const cartPage = document.getElementById('cart-page');
            const backBtn = document.getElementById('desktop-back-btn');
            
            if (cartPage && !cartPage.classList.contains('cart-toggle')) {
                // Cart is visible - create back button if it doesn't exist
                if (!backBtn) {
                    const newBackBtn = document.createElement('div');
                    newBackBtn.id = 'desktop-back-btn';
                    newBackBtn.innerHTML = '← Back to Items';
                    newBackBtn.style.cssText = `
                        position: fixed;
                        top: 200px;
                        left: 100px;
                        background: #FF6B6B;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        z-index: 1000;
                        font-size: 16px;
                        font-weight: bold;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    `;
                    newBackBtn.onclick = cartToggle;
                    document.body.appendChild(newBackBtn);
                }
            } else {
                // Cart is hidden or doesn't exist - remove back button
                if (backBtn) {
                    backBtn.remove();
                }
            }
        }
    }
    else{
        alert("Currently no item in cart!");
    }
}


// ========== MOBILE VIEW FUNCTIONS ==========
function updateMobileCartCount() {
    const mobileCartBadge = document.getElementById('m-cart-plus');
    if (mobileCartBadge) {
        mobileCartBadge.textContent = cartData.length;
    }
}

function setupMobileLayout() {
    const itemContainer = document.querySelector('.item-container');
    if (!itemContainer) return;
    
   
    itemContainer.innerHTML = '';
    
    
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    categoryHeader.id = 'category-header';
    itemContainer.appendChild(categoryHeader);
    

    const mobileFoodItems = document.createElement('div');
    mobileFoodItems.id = 'mobile-food-items';
    itemContainer.appendChild(mobileFoodItems);
    
   
    const categories = ['biryani', 'chicken', 'paneer', 'vegetable', 'chinese', 'south-indian'];
    
    categories.forEach(categoryId => {
        const desktopCategory = document.getElementById(categoryId);
        if (desktopCategory) {
            const mobileCategory = desktopCategory.cloneNode(true);
            mobileCategory.id = 'mobile-' + categoryId;
            mobileFoodItems.appendChild(mobileCategory);
        }
    });
    
    
    setupMobileCategoryHeader();
    

    setTimeout(() => {
        attachMobileEventListeners();
        updateAllHeartIcons(); 
    }, 100);
}

function setupMobileCategoryHeader() {
    const categoryHeader = document.getElementById('category-header');
    if (!categoryHeader) return;
    
    categoryHeader.innerHTML = '';
    
    categoryListdata.forEach(item=> {
        const listCard = document.createElement('div');
        listCard.className = 'list-card';
        
        const listImg = document.createElement('img');
        listImg.src = item.img;
        
        const listName = document.createElement('span');
        listName.className = 'list-name';
        listName.textContent = item.category;
        
        listCard.appendChild(listImg);
        listCard.appendChild(listName);
        
        listCard.addEventListener('click', () => {
            const categorySection = document.getElementById('mobile-' + item.category.replace('_', '-'));
            if (categorySection) {
                categorySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        categoryHeader.appendChild(listCard);
    });
}

function attachMobileEventListeners() {
       const mobileHearts = document.querySelectorAll('#mobile-food-items .add-to-cart');
    mobileHearts.forEach(heart => {
        heart.removeEventListener('click', addToCart);
        heart.addEventListener('click', addToCart);
    });
    
  
    const cartIcon = document.querySelector('.cart-icon-wrapper') || 
                     document.querySelector('.top-menu')?.lastElementChild;
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (window.innerWidth < 800) {
                if (cartData.length === 0) {
                    alert("Currently no item in cart!");
                } else {
                    showMobileCart();
                }
            }
        });
    }
}

// SIMPLE FUNCTION TO SHOW MOBILE CART
function showMobileCart() {
    const itemContainer = document.querySelector('.item-container');
    if (!itemContainer) return;
    
    // Hide food items and category header
    const foodItems = document.getElementById('mobile-food-items');
    const categoryHeader = document.getElementById('category-header');
    
    if (foodItems) foodItems.style.display = 'none';
    if (categoryHeader) categoryHeader.style.display = 'none';
    
    // Remove existing cart page
    const existingCartPage = document.getElementById('mobile-cart-page');
    if (existingCartPage) {
        existingCartPage.remove();
    }
    
    // Create cart page
    const cartPage = document.createElement('div');
    cartPage.id = 'mobile-cart-page';
    cartPage.style.cssText = `
        padding: 20px;
        background: white;
        height: 100%;
        overflow-y: auto;
    `;
    
    // Back button
    const backBtn = document.createElement('div');
    backBtn.innerHTML = '← Back to Menu';
    backBtn.style.cssText = `
        color: indianred;
        font-size: 18px;
        margin-bottom: 20px;
        margin-top:30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    backBtn.addEventListener('click', function() {
        // Show food items, hide cart
        cartPage.remove();
        if (foodItems) foodItems.style.display = 'block';
        if (categoryHeader) categoryHeader.style.display = 'flex';
    });
    
    // Cart title
    const cartTitle = document.createElement('p');
    cartTitle.textContent = 'Your Cart';
    cartTitle.style.cssText = `
        font-size: 24px;
        color: indianred;
        margin-bottom: 20px;
        font-weight: bold;
    `;
    
    cartPage.appendChild(backBtn);
    cartPage.appendChild(cartTitle);
    
    if (cartData.length === 0) {
        cartPage.innerHTML += `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fa fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px; color: #ddd;"></i>
                <p style="font-size: 18px;">Your cart is empty</p>
                <p style="font-size: 14px; margin-top: 10px;">Add some delicious items to get started!</p>
            </div>
        `;
    } else {
        // Display cart items
        let total = 0;
        
        cartData.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = `
                display: flex;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid #eee;
                gap: 15px;
            `;
            
            // Item image
            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;
            img.style.cssText = `
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
            `;
            
            // Item info
            const infoDiv = document.createElement('div');
            infoDiv.style.flex = '1';
            
            const name = document.createElement('div');
            name.textContent = item.name;
            name.style.cssText = `
                font-weight: 600;
                font-size: 16px;
                color: #333;
                margin-bottom: 5px;
            `;
            
            const price = document.createElement('div');
            price.textContent = `₹${item.basePrice} each`;
            price.style.cssText = `
                font-size: 14px;
                color: #666;
                margin-bottom: 8px;
            `;
            
            // Quantity controls
            const qtyDiv = document.createElement('div');
            qtyDiv.style.display = 'flex';
            qtyDiv.style.alignItems = 'center';
            qtyDiv.style.gap = '10px';
            
            const decreaseBtn = document.createElement('button');
            decreaseBtn.innerHTML = '−';
            decreaseBtn.style.cssText = `
                background: lightcoral;
                color: white;
                border: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            `;
            decreaseBtn.addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity--;
                    item.price = item.basePrice * item.quantity;
                    updateCartDisplays();
                    showMobileCart(); // Refresh cart view
                } else {
                    const index = cartData.findIndex(cartItem => cartItem.id == item.id);
                    if (index > -1) {
                        cartData.splice(index, 1);
                        updateCartDisplays();
                        showMobileCart(); // Refresh cart view
                    }
                }
            });
            
            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = item.quantity;
            quantitySpan.style.cssText = `
                font-weight: bold;
                font-size: 16px;
                min-width: 30px;
                text-align: center;
            `;
            
            const increaseBtn = document.createElement('button');
            increaseBtn.innerHTML = '+';
            increaseBtn.style.cssText = `
                background: lightcoral;
                color: white;
                border: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            `;
            increaseBtn.addEventListener('click', function() {
                item.quantity++;
                item.price = item.basePrice * item.quantity;
                updateCartDisplays();
                showMobileCart(); // Refresh cart view
            });
            
            qtyDiv.appendChild(decreaseBtn);
            qtyDiv.appendChild(quantitySpan);
            qtyDiv.appendChild(increaseBtn);
            
            // Item total
            const totalDiv = document.createElement('div');
            totalDiv.textContent = `₹${item.price}`;
            totalDiv.style.cssText = `
                font-weight: bold;
                font-size: 16px;
                color: indianred;
                min-width: 80px;
                text-align: right;
            `;
            
            infoDiv.appendChild(name);
            infoDiv.appendChild(price);
            infoDiv.appendChild(qtyDiv);
            
            itemDiv.appendChild(img);
            itemDiv.appendChild(infoDiv);
            itemDiv.appendChild(totalDiv);
            
            cartPage.appendChild(itemDiv);
            
            total += item.price;
        });
        
        // Total display
        const totalDiv = document.createElement('div');
        totalDiv.style.cssText = `
            background: lightcoral;
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        `;
        totalDiv.textContent = `Total: ₹${total}`;
        cartPage.appendChild(totalDiv);
        
        // Checkout button
        const checkoutBtn = document.createElement('button');
        checkoutBtn.textContent = 'Proceed to Checkout';
        checkoutBtn.style.cssText = `
            background: crimson;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
        `;
        checkoutBtn.addEventListener('click', function() {
            alert(`Order placed successfully! Total: ₹${total}`);
        });
        cartPage.appendChild(checkoutBtn);
    }
    
    itemContainer.appendChild(cartPage);
}

// ========== INITIALIZE ==========
// Initial event listeners for desktop
document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click', addToCart);
});

document.getElementById('add-address').addEventListener('click',addAddress);
document.getElementById('m-add-address').addEventListener('click',addAddress);

function addAddress(){
    var address= prompt('Enter your address','');
    if(address){
        document.getElementById('add-address').innerText= ' ' + address;
        document.getElementById('m-add-address').innerText= ' ' + address;
    }
    else{
        alert("Address not added")
    }
}

// Window resize handler - SIMPLIFIED
window.onresize = window.onload = function(){
    var size = window.innerWidth;
    
    if(size < 800){
        // Mobile view
        document.getElementById('container').style.display = 'none';
        document.getElementById('mobile-view').style.display = 'grid';
        
        // Only setup mobile layout if not already done
        if (!document.getElementById('mobile-food-items')) {
            setupMobileLayout();
        }
        updateMobileCartCount();
    } else {
        // Desktop view
        document.getElementById('container').style.display = 'grid';
        document.getElementById('mobile-view').style.display = 'none';
    }
};

// Initialize on load
if (window.innerWidth < 800) {
    setupMobileLayout();
    updateMobileCartCount();
}

// Initialize empty cart message on load
updateCartEmptyMessage();
// ==================== SIMPLE LOGIN SYSTEM (SHOWS FIRST) ====================
// User data
let simpleUsers = JSON.parse(localStorage.getItem('simpleUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const loginScreen = document.getElementById('simpleLoginScreen');
const loginForm = document.getElementById('simpleLoginForm');
const registerForm = document.getElementById('simpleRegisterForm');
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');
const guestLoginBtn = document.getElementById('guestLoginBtn');

// Main function to initialize login
function initializeSimpleLogin() {
    // Check if user is already logged in
    if (currentUser) {
        // User is already logged in, show main app
        showMainApp();
    } else {
        // Show login screen first
        showLoginScreen();
    }
    
    // Setup event listeners
    setupLoginEvents();
}

// Show login screen (first thing users see)

function showLoginScreen() {
    loginScreen.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Hide main app
    document.getElementById('container').style.display = 'none';
    document.getElementById('mobile-view').style.display = 'none';
}

// Show main app after login
function showMainApp() {
    loginScreen.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling
    
    // Show main app based on screen size
    if (window.innerWidth < 800) {
        document.getElementById('mobile-view').style.display = 'grid';
    } else {
        document.getElementById('container').style.display = 'grid';
    }
    
    // Create user info bar
    createUserInfoBar();
}

// Setup all event listeners
function setupLoginEvents() {
    // Login form submit
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('simpleEmail').value;
        const password = document.getElementById('simplePassword').value;
        loginUser(email, password);
    });
    
    // Register form submit
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('simpleName').value;
        const email = document.getElementById('simpleRegEmail').value;
        const password = document.getElementById('simpleRegPassword').value;
        registerUser(name, email, password);
    });
    
    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
    
    // Guest login
    guestLoginBtn.addEventListener('click', function() {
        currentUser = {
            id: 'guest',
            name: 'Guest User',
            email: 'guest@foodapp.com',
            type: 'guest'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
        alert('You are browsing as Guest. Please register to add items to cart.');
    });
}

// Login user
function loginUser(email, password) {
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    const user = simpleUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            type: 'registered'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
        alert(`Welcome back, ${user.name}!`);
    } else {
        alert('Invalid email or password');
    }
}

// Register user
function registerUser(name, email, password) {
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    if (simpleUsers.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password
    };
    
    simpleUsers.push(newUser);
    localStorage.setItem('simpleUsers', JSON.stringify(simpleUsers));
    
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        type: 'registered'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showMainApp();
    alert(`Welcome to FoodApp, ${name}! You can now add items to cart.`);
}

// Create user info bar at top
function createUserInfoBar() {
    // Remove existing bar if any
    const existingBar = document.querySelector('.user-info-bar');
    if (existingBar) {
        existingBar.remove();
    }
    
    // Create new bar
    const userBar = document.createElement('div');
    userBar.className = 'user-info-bar';
    
    // User info
    const userInfo = document.createElement('div');
    userInfo.innerHTML = `
        <span>Welcome, ${currentUser.name}!</span>
        <small>${currentUser.type === 'guest' ? 'Guest Mode' : ''}</small>
    `;
    
    // Logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.addEventListener('click', logoutUser);
    
    userBar.appendChild(userInfo);
    userBar.appendChild(logoutBtn);
    
    // Add to body
    document.body.insertBefore(userBar, document.body.firstChild);
}

// Logout user
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        // Save cart data for registered users
        if (currentUser.type === 'registered' && cartData.length > 0) {
            saveUserCart();
        }
        
        // Clear user data
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Clear cart
        cartData = [];
        updateCartDisplays();
        
        // Remove user bar
        const userBar = document.querySelector('.user-info-bar');
        if (userBar) {
            userBar.remove();
        }
        
        // Show login screen again
        showLoginScreen();
        
        // Reset forms
        loginForm.reset();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Save user's cart (for registered users only)
function saveUserCart() {
    if (currentUser && currentUser.type === 'registered') {
        const userIndex = simpleUsers.findIndex(u => u.id === currentUser.id);
        if (userIndex > -1) {
            simpleUsers[userIndex].cart = [...cartData];
            localStorage.setItem('simpleUsers', JSON.stringify(simpleUsers));
        }
    }
}

// Load user's saved cart (for registered users only)
function loadUserCart() {
    if (currentUser && currentUser.type === 'registered') {
        const user = simpleUsers.find(u => u.id === currentUser.id);
        if (user && user.cart) {
            cartData = [...user.cart];
            updateCartDisplays();
            updateAllHeartIcons();
        }
    }
}

// ==================== UPDATE YOUR EXISTING FUNCTIONS ====================

// MODIFY the addToCart function to check login
const originalAddToCart = addToCart;
addToCart = function(event) {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please login or register to add items to cart!');
        showLoginScreen();
        return;
    }
    
    // Check if user is guest
    if (currentUser.type === 'guest') {
        alert('Guest users cannot add items to cart. Please register first!');
        return;
    }
    
    // If registered user, allow adding to cart
    originalAddToCart(event);
    
    // Save cart for registered users
    saveUserCart();
};

// MODIFY the address function
const originalAddAddress = addAddress;
addAddress = function() {
    if (!currentUser) {
        alert('Please login to save address!');
        showLoginScreen();
        return;
    }
    originalAddAddress();
};

// MODIFY the checkout button
const originalCheckoutBtn = document.querySelector('.cart-btn');
if (originalCheckoutBtn) {
    originalCheckoutBtn.addEventListener('click', function(e) {
        if (!currentUser) {
            e.preventDefault();
            alert('Please login to checkout!');
            showLoginScreen();
            return false;
        }
        
        if (currentUser.type === 'guest') {
            e.preventDefault();
            alert('Guest users cannot checkout. Please register first!');
            return false;
        }
    });
}

// Initialize login system when page loads
window.addEventListener('DOMContentLoaded', function() {
    // First, initialize login
    initializeSimpleLogin();
    
    // Then load user's cart if they're registered
    if (currentUser && currentUser.type === 'registered') {
        setTimeout(loadUserCart, 100);
    }
});
document.querySelector('.cart-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Calculate total
    let total = 0;
    cartData.forEach(item => {
        total += item.price;
    });
    
    if (cartData.length === 0) {
        alert("Your cart is empty! Add some items first.");
    } else {
        alert(`Order placed successfully! Total: ₹${total}`);
    }
});
