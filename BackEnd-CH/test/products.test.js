import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Products router", () =>{
    it("it should create one new product", async () =>{
        const productToCreate = {name: "testing", price: 1, desciption: "testing"};
        const response = await request.post("/products").send(productToCreate);
        expect(response.status).to.equal(200);
        expect(response.body).to.include(productToCreate);
    });

    it("it should update one product", async () =>{
        const productUpdated = {name: "testing", price:2, desciption: "testing"};
        const response = await request.put("/products/1").send(productUpdated);
        expect(response.status).to.equal(200);
        expect(response.body).to.include(productUpdated);
    });

    it("it should get all the products", async () =>{
        const response = await request.get("/products");
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
    });

    it("it should delete one product", async () =>{
        let idProduct = 1
        const deletedProduct = {name: "testing", price: 5, desciption: "testing"};
        const response = (await request.delete(`/products/${idProduct}/delete`)).setEncoding(deletedProduct);
        expect(response.status).to.equal(200);
        expect(response.body).to.not.include(deletedProduct);
    })
})