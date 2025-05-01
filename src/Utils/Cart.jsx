//** we can only save kay value in local storage */

export function loadCart(){

   let cart = localStorage.getItem("cart");

   if(cart == null){
      cart = {
        orderedItems : [],
        days : 1,
        startingDate :formatDate(new Date()),
        endingDate : formatDate(new Date())

      }
      const cartString = JSON.stringify(cart);
      localStorage.setItem("cart",cartString);
      return cart;
   }

   cart = JSON.parse(cart);
   return cart;
}

export function addToCart(key,quantity){
     
    const cart = loadCart();
    let found = false;

    for(let i=0; i < cart.orderedItems.length ; i++){

        if(cart.orderedItems[i].key == key){
            cart.orderedItems[i].quantity += quantity;
            found = true;
        }
    }

    if(!found){
        cart.orderedItems.push({key , quantity});
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart",cartString);

}

export function removeFromCart(key){
   
    const cart = loadCart();
    const newCart = cart.orderedItems.filter((item)=>item.key != key);
    cart.orderedItems = newCart;
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart",cartString);
}


export function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    return `${year}-${month}-${day}`;
}   