const getAllCart = async() =>{
    try {
        const validateCart = localStorage.getItem("cartId");
        if(!validateCart){
            console.log("Wrong cart");
        }

        const response = await fetch(`api/cart/${validateCart}`);
        if(response.ok){
            const cart = await response.json();
            return cart;  
        }else{
            console.log("Error getting the cart");
        }


    } catch (error) {
        console.log("Error getting the whole cart");
    }
}

const deleteFromCart = async(event) =>{
    productId = event.target.id;
    cartId = cart;
    try {
        const response = await fetch(`/carts/${cartId}/products/${productId}`,{method:"DELETE"})
        if(response.ok){
            const finalResult = await response.json()
            console.log(finalResult.message);
            location.reload()
        }else{
            console.log("Error deleting the product from cart");
        }
    } catch (error) {
        console.log("error");
    }
    let emptyButton = document.getElementById("empty")
    emptyButton.addEventListener("click", emptyCart);
}

const emptyCart = async() =>{
    const idCart = cart;
    try {
        const response = await fetch(`/carts/${idCart}`, {method: "DELETE"});
        if(response.ok){
            const finalResult = await response.json();
            console.log(finalResult.message);
        }else{
            console.log("Error emptying the cart");
        }
    } catch (error) {
        console.log("Error");
    }
}