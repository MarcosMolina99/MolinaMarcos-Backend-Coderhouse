import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const createHash = (password) =>
bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
    console.log({"cloud password": savedPassword, loginPassword: password});
    return bcrypt.compareSync(password,savedPassword);
}


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);