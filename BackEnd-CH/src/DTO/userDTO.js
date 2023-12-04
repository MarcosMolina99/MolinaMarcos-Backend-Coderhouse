export default class UserDTO {
    constructor(user){
        this.first_name = user.user.user.first_name;
        this.last_name = user.user.user.last_name;
        this.email = user.user.user.email;
        this.role = user.user.user.role;
    }
}

export function createUserDTO(newUser){
    if(!newUser || !newUser.user || !newUser.user.user){
        return null;
    }
    const userDTO= new userDTO(newUser);
    return userDTO;
}