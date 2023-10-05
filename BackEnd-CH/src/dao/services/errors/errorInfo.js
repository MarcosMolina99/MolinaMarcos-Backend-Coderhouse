export const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or invalid.
    List of required properties:
    * first_name : needs to be a string, received ${user.first_name}
    * last_name : needs to be a string, received ${user.last_name}
    * email : needs to be a string received ${user.email}`
}

export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or invalid.
    List of required properties: 
    * Title: needs to be a string, (more than 3 character) received ${product.title}
    * Description: needs to be a string, received ${product.description}
    * Price: needs to be a string, received ${product.price}
    * Image: needs to be a string, received ${product.thumbnail}}
    * Code: needs to be a string, received ${product.code}
    * Stock: needs to be a string, received ${product.stock}`
}