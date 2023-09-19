const socket= io();

socket.emit("Connected");

document.getElementById("Form").addEventListener("submit", (event) =>{
    event.preventDefault();
    const productName= document.getElementById("productName").value;
    const productTitle= document.getElementById("productTitle").value;
    const productDescription= document.getElementById("productDescription").value;
    const productPrice= document.getElementById("productPrice").value;
    const productThumbnail= document.getElementById("productThumbnail").value;

    socket.emit("Add product", {
        name: productName,
        title: productTitle,
        description: productDescription,
        price: productPrice,
        thumbnail: productThumbnail
    });

    productName.value= "";
    productTitle.value= "";
    productDescription.value= "";
    productPrice.value= "";
    productThumbnail.value= ""
    location.reload()

})

function updateList(products){
    const productList= document.getElementById("productList");
    productList.innerHTML= "";

    products.forEach((product) =>{
        const li= document.createElement("li");
        li.innerHTML=`
        <h2>${product.name}</h2>
        <h3>Título: ${product.title}</h3>
        <p>Descripción: ${product.description}</p>
        <h3>Precio: ${product.price}</h3>
        <h3>Thumbnail: ${product.thumbnail}</h3>
        <button class="btnEliminar" data-id="${product.id}">Eliminar</button>
      `;
    })
}

socket.on("initialProducts",(productList) =>{
    updateList(productList);
})

socket.on("new product", (newProduct) =>{
    const productList= document.getElementById("productList");
    const li= document.createElement("li");
    li.textContent= newProduct.name;

    productList.appendChild(li);
})

const deleteButton= document.querySelector("btnDelete");
deleteButton.forEach(button =>{
    button.addEventListener("click", () =>{
        const id= parseInt(button.id);
        const productId= {
            id: id
        }
        socket.emit("Delete product", productId);

        location.reload();
    })
})