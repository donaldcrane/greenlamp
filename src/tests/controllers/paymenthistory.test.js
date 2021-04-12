import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user5 } from "./user-sign-in-test-data";
import { payment4, payment5 } from "./paymenthistory.data";
import server from "../../app";
import sendGrid from "../../utilities/sendgrid";

chai.should();
sendGrid.sandboxMode();

const { expect } = chai;
chai.use(chaiHttp);

describe("GET payment history api route", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user5)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  beforeEach(async () => {
    await db.PaymentHistories.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.PaymentHistories.create(payment4);
    await db.PaymentHistories.create(payment5);
  });
  it("returns all payments", done => {
    chai
      .request(server)
      .get("/api/v1/payment/history")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all payment Histories");

        data.forEach(payment => {
          expect(payment).to.have.property("id");
          expect(payment).to.have.property("userId");
          expect(payment).to.have.property("email");
          expect(payment).to.have.property("reference");
          expect(payment).to.have.property("status");
          expect(payment).to.have.property("amount");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns payment history with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/payment/history/09015644-4195-417f-8934-7cdc6e8519e2")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived payment History");
        expect(data).to.have.property("id");
        expect(data).to.have.property("userId");
        expect(data).to.have.property("email");
        expect(data).to.have.property("reference");
        expect(data).to.have.property("status");
        expect(data).to.have.property("amount");

        expect(data).to.be.an("object");
        done();
      });
  });
  it("returns 404 for payment which is not in db", done => {
    chai
      .request(server)
      .get("/api/v1/payment/history/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Payment History not found");
        done();
      });
  });
});
