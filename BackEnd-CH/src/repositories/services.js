import UsersDao from "../dao/dbManager/userDao.js";
import CartDao from "../dao/dbManager/cartDao.js";
import TicketDao from "../dao/dbManager/ticketDao.js";
import ProductDao from "../dao/dbManager/productDao.js";
import UserRepository from "./user.repository.js";
import CartRepository from "./cart.repository.js";
import TicketRepository from "./ticket.repository.js";
import ProductRepository from "./product.repository.js";

const daoCart = new CartDao;
const daoProduct = new ProductDao;
const daoUser = new UsersDao;
const daoTicket = new TicketDao;


export const cartService = new CartRepository(daoCart);
export const productService = new ProductRepository(daoProduct);
export const userService = new UserRepository(daoUser);
export const ticketService = new TicketRepository(daoTicket);