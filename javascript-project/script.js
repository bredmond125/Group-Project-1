const equipNavButton = document.querySelector('#equip-nav');
const spellsNavButton = document.querySelector('#spells-nav');
const skillsNavButton = document.querySelector('#skills-nav');
const allNavButton = document.querySelector('#all-options');
const imagesEquip = document.querySelector('.image-container-equip');
const imagesSpells = document.querySelector('.image-container-spell');
const imagesSkills = document.querySelector('.image-container-skill');
const shopitems = document.querySelectorAll('.shop-item');
const shopOptions = document.querySelector('.shop-options');
const inventoryContainer = document.querySelector('.inventory-container');
const inventoryContent = document.querySelector('.inventory-content');
const desktopInventoryContainer = document.querySelector('.desktop-inv-container');
const headers = document.querySelector('.headers-div');
const menuItems = document.querySelectorAll('.menu-item');
const mainContent = document.querySelector('.main-content');
const cartContent = document.querySelector('.cart-content');
const cartContainer = document.querySelector('.cart-container');
const tax = document.querySelector('.tax');
const subTotal = document.querySelector('.sub-total');
const total = document.querySelector('.total');
const cashForm = document.querySelector('.cash-form');
const cardForm = document.querySelector('.card-form');
const payBtn = document.querySelectorAll('.paybtn');
const paymentOptions = document.querySelector('.payment-options');
const cashOption = document.querySelector('.cashoption');
const cardOption = document.querySelector('.cardoption');
const payWithCashBtn = document.querySelector('#paywithcashbtn');
const changeDue = document.querySelector('.change-due');
const changeDueMessage = document.querySelector('.change-due-message');
const shopkeepMessage = document.querySelector('.shopkeeper-message');
const mobileDescription = document.querySelectorAll('.description-container');
const images = document.querySelectorAll('.image-container');
const productDescription = document.querySelectorAll('.description');
const shopkeepDiv = document.querySelector('.shopkeeper-div');
const pageBackground = document.querySelector('body');
const cartContainerAll = document.querySelectorAll('.checkout-item');
const firstSibling = document.querySelector('.cart-items-pre-checkout');

let cartItems = [

]

let inventoryItems = [

]

function emptyCart() {
//    let nextSibling = firstSibling.nextElementSibling;
//    while(nextSibling) {
//        nextSibling.remove();

// cartContainer.forEach( (element) => {
//     console.log(element);
//     if (element.classList.contains('checkout-item')){
//             element.remove();
//        }
//     })
    cartContainer.innerHTML = '';
    cartItems = [] 
}


headers.addEventListener('click',(event)=> {
        if (event.target.innerText === 'Shop'){
            mainContent.classList.remove('hidden');
            shopOptions.classList.remove('hidden');
            inventoryContent.classList.add('hidden');
            cartContent.classList.add('hidden');
            shopkeepMessage.innerText = `"What might you be looking for?"`;
        } else if (event.target.innerText === 'Cart') {
            cartContent.classList.remove('hidden');
            mainContent.classList.add('hidden');
            inventoryContent.classList.add('hidden');
            shopOptions.classList.add('hidden');
        } else if (event.target.innerText === 'Inventory') {
            console.log('inventory');
            inventoryContent.classList.remove('hidden');
            mainContent.classList.add('hidden');
            shopOptions.classList.add('hidden');
            cartContent.classList.add('hidden');
        } 
})

//  this can be condensed into one event listener for the nav bar.
// this will look for the class of the nav li and then execute the below click
// currently this is set up that it would be an event listener for each of the nav buttons, however we can
// condense this down into one event listener for a click on any of the nav buttons.


allNavButton.addEventListener('click',(event)=> {
    shopitems.forEach((element) => {
        if (element.classList.contains('hidden')){
            element.classList.remove('hidden');
        }
        shopkeepMessage.innerText = `"All manner of wonders to purchase."`;
    })
    
})

equipNavButton.addEventListener('click',(event)=> {
    shopitems.forEach((element) => {
        if (element.classList.contains('image-container-equip')){
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
        shopkeepMessage.innerText = `"Fancy some new gear today, Traveler?"`;
    })
    
})

spellsNavButton.addEventListener('click',(event)=> {
    shopitems.forEach((element) => {
        if (element.classList.contains('image-container-spells')){
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
        shopkeepMessage.innerText = `"Ahh, a young mage, are you?"`;
    })
    
})

skillsNavButton.addEventListener('click',(event)=> {
    shopitems.forEach((element) => {
        if (element.classList.contains('image-container-skill')){
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
        shopkeepMessage.innerText = `"A seeker of knowledge I see! Just like my cousin Grant."`;
    })
    
})
//let checkout = document.createElement('p');
mainContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
        shopkeepMessage.innerText = `That will serve you well Traveler`;
        let cartItem = {
            name: event.target.name, 
            value: parseInt(event.target.value)
        };
        cartItems.push(cartItem);
        let checkout = document.createElement('p');
        checkout.classList.add('checkout-item');
        checkout.innerText = `${cartItem.name}/${cartItem.value}`;
        cartContainer.appendChild(checkout);
        let currentTotal = 0;
        cartItems.forEach((i) => {
            currentTotal += i.value;
        }) 
        subTotal.innerText = currentTotal;
        tax.innerText = currentTotal * 0.06;
        total.innerText = currentTotal * 1.06;

    } 
})


cartContent.addEventListener('click', (event) => {
    // add code to state nothing is in the cart
    if (event.target.classList.contains('checkoutbtn')) {
        payBtn.forEach( variable =>
            variable.classList.remove('hidden')
        )
        } else if (event.target.classList.contains ('paycash')){
            cashOption.classList.remove('hidden');
            cardOption.classList.add('hidden');
        } else if (event.target.classList.contains ('paycard')){
            cardOption.classList.remove('hidden');
            cashOption.classList.add('hidden');
    } 
})

function totalReset() {
    total.innerText = 0,
    subTotal.innerText = 0
    tax.innerText = 0
}



cashForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(cashForm);
    const cashInputVal = formData.get("cashinput");
    let currentTotal = parseInt(total.innerText);
        if (cashInputVal > currentTotal){
            let overageDue = (cashInputVal - currentTotal);
            console.log(overageDue);
            // output change due
            changeDueMessage.innerText = `Your change back is ${overageDue}. Thank you for your purchase!`;
            shopkeepMessage.innerText = `Excellent purchase Traveler!`;
            inventoryItems = inventoryItems.concat(cartItems);
            // mobile inventory code - add items to inventory
            cartItems.forEach( (element) => {
                let inventoryChest = document.createElement('p');
                inventoryChest.classList.add('inventory-purchased-items');
                inventoryChest.innerText =  `${element.name} - ${element.value}`;
                inventoryContainer.appendChild(inventoryChest);
                desktopInventoryContainer.appendChild(inventoryChest);
            })
            totalReset();
            emptyCart();

        // first attempt at removing the p tags from teh cartContainer after purchasing them //
            // cartContainer.forEach( (element) => {
            //     console.log(element);
            //     if (element.classList.contains('checkout-item')){
            //         cartContainer.removeChild(element);
            //     }
            // })

            

            console.log(cartItems);
            } else if (cashInputVal == currentTotal){

            // this can be turned into a functions since it is used at teh end of needing change as well
            cartItems.forEach( (element) => {
                let inventoryChest = document.createElement('p');
                inventoryChest.innerText =  `${element.name} - ${element.value}`;
                inventoryContainer.appendChild(inventoryChest);
            }) 
            totalReset();
            emptyCart();
             // desktop inventory code - add items to inventory
             inventoryItems.forEach( (element) => {
                let inventoryChest = document.createElement('p');
                inventoryChest.classList.add('inventory-purchased-items');
                inventoryChest.innerText =  `${element.name} - ${element.value}`;
                desktopInventoryContainer.appendChild(inventoryChest);
            })
            changeDueMessage.innerText = `Thank you for your purchase! We hope you enjoy your shiny new things!`;
            shopkeepMessage.innerText = `"Excellent purchase Traveler!"`;
            }  else {
            changeDueMessage.innerText = `That's not enough gold friend, got any more?`;
            shopkeepMessage.innerText = `"Hm, maybe check the job board by the Arcanium?"`;
        }
})

cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    inventoryItems = inventoryItems.concat(cartItems);
            // mobile inventory code - add items to inventory
            cartItems.forEach( (element) => {
                let inventoryChest = document.createElement('p');
                inventoryChest.classList.add('inventory-purchased-items');
                inventoryChest.innerText =  `${element.name} - ${element.value}`;
                inventoryContainer.appendChild(inventoryChest);
            })
            // desktop inventory code - add items to inventory
            cartItems.forEach( (element) => {
                let inventoryChest = document.createElement('p');
                inventoryChest.classList.add('inventory-purchased-items');
                inventoryChest.innerText =  `${element.name} - ${element.value}`;
                desktopInventoryContainer.appendChild(inventoryChest);
            })
            totalReset();
            emptyCart();
})


function brandtChirpusDescription (event) {
    if (window.innerWidth >= 768 && event.target.classList.contains('img')) {
        shopkeepMessage.innerText = event.target.nextElementSibling.innerText;
    } else if (event.target.classList.contains('img')) {
        function removeHiddenClass () {
            event.target.nextElementSibling.classList.remove('hidden');
            function addHiddenClass () {
                event.target.nextElementSibling.classList.add('hidden');
            }
            setTimeout(addHiddenClass, 2000);
        }    
        removeHiddenClass();
    } 
}

mainContent.addEventListener('click', brandtChirpusDescription);



//TODO
//currently, if you do not have enough money for purchase and you keep submitting, it will add new element 
//and you get inifinite messages
//update so it changes innerText rather than adding new element (see vending machine examp;e???)
    ///// COMPLETED ////

//style for all cart and inventory related things
//make cart and inventory with styles: add text to supplement values, currently it is only displaying the bare
//minimum stuff, so add text around them as well as stylish stuff like borders, centering, whatever looks good
//also make irrelevant things .hidden


//all products (minus the first) require price value (should be a number) and name value to add them to the cart.  use first product
// as an example.  should be a sort of copy and paste to the other products.
    /////// COMPLETED /////

//styling buttons and anthing else you think could use style

//credit card does not work
//check to make sure fields have any content
//submit ---> thank you message
//then push to inventory like with the cash option

