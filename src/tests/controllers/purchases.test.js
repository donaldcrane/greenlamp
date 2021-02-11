import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import { purchase4, purchase5 } from "./purchases.data";
import server from "../../app";
import sendGrid from "../../utilities/sendgrid";

chai.should();
sendGrid.sandboxMode();

const { expect } = chai;
chai.use(chaiHttp);

describe("Delete purchase", () => {
  beforeEach(async () => {
    await db.Purchases.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Purchases.create(purchase4);
  });
  let adminToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        adminToken = res.body.data;
        done();
      });
  });
  it("should allow Admin Delete a purchase", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/purchase/a430e505-937b-4908-9422-7aa57044e85c")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted purchase");
        done();
      });
  });
  it("should not allow admin delete a purchase with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/purchase/8d58")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting purchase which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/purchase/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("purchase not found");
        done();
      });
  });
});

describe("GET purchase api route", () => {
  beforeEach(async () => {
    await db.Purchases.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Purchases.create(purchase4);
    await db.Purchases.create(purchase5);
  });
  it("returns all purchases", done => {
    chai
      .request(server)
      .get("/api/v1/purchases")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all purchases");

        data.forEach(purchases => {
          expect(purchases).to.have.property("id");
          expect(purchases).to.have.property("userId");
          expect(purchases).to.have.property("weedName");
          expect(purchases).to.have.property("amountInNaira");
          expect(purchases).to.have.property("reference");
          expect(purchases).to.have.property("status");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns purchase with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/purchase/c375c640-81ff-405a-89a8-460ea2f71756")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived purchase");
        expect(data).to.have.property("id");
        expect(data).to.have.property("userId");
        expect(data).to.have.property("weedName");
        expect(data).to.have.property("amountInNaira");
        expect(data).to.have.property("reference");
        expect(data).to.have.property("status");

        expect(data).to.be.an("object");
        done();
      });
  });
  it("returns 404 for purchase which is not in db", done => {
    chai
      .request(server)
      .get("/api/v1/purchase/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("purchase not found");
        done();
      });
  });
});
