import supertest from "supertest";
import chai from "chai";
import { add } from "winston";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing endpoints", () =>{
    describe("Carts Router", () =>{
        it("it should add a product to the cart", async () =>{
            const idUser = 1;
            const addedProduct = {idProduct, quantity: 1};
            const response = await request.post(`/carts/${idUser}/add`).send(addedProduct);
            expect(response.status).to.equal(200);
            expect(response.body).to.include(addedProduct);
        })

        it("it should get the user´s cart", async () =>{
            const idUser = 1;
            const response = await request.get(`/carts/${idUser}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("object");
        })

        it("it should delete a product from the cart", async () =>{
            const idUser = 1;
            const deletedProduct = {idProduct: 1};
            const response = await request.delete(`/carts/${idUser}/delete`).send(deletedProduct);
            expect(response.status).to.equal(200);
            expect(response.body).to.not.include(deletedProduct);
        })
    })
})