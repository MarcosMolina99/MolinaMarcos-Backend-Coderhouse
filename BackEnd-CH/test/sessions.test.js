import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Sessions router", () =>{
    it("it should create a new session", async () =>{
        const user = {username: "testing", password: 123};
        const response = await request.post("/sessions").send(user);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("token");
        expect(response.body).to.be.an("object");
    });

    it("it should get user information", async () =>{
        const token = "token";
        const response = await request.get("/sessions/user").set("Auth",`${token}` );
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("username");
    });

    it("it should return error if there is invalid information",async () =>{
        const wCredentials = {username: "testing", password:12345};
        const response = await request.post("/sessions").send(wCredentials);
        expect(response.status).to.equal(401);
    });

})