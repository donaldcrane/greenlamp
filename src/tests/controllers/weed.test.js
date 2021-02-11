import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4, user5 } from "./user-sign-in-test-data";
import {
  weed, weed2, weed3, weed4, weed5
} from "./weed.data";
import server from "../../app";
import sendGrid from "../../utilities/sendgrid";

chai.should();
sendGrid.sandboxMode();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add weed", () => {
  let adminToken;
  let userToken;
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
  it("should allow user with admin role add a weed", done => {
    chai
      .request(server)
      .post("/api/v1/admin/weed")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send(weed)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow admin add the same Weed name twice", done => {
    chai
      .request(server)
      .post("/api/v1/admin/weed")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send(weed)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
  it("should not allow admin add a Weed with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/admin/weed")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send(weed2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not allow user without token add a Weed ", done => {
    chai
      .request(server)
      .post("/api/v1/admin/weed")
      .send(weed3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it("should not allow user without admin role add a Weed ", done => {
    chai
      .request(server)
      .post("/api/v1/admin/weed")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(weed3)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe("Update Weed", () => {
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
  it("should allow Admin update a Weed", done => {
    chai
      .request(server)
      .patch("/api/v1/admin/weed/015494a8-5115-4e3e-ba84-6d08b9d2e08f")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send({ name: "Aso rock" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully updated weed");
        done();
      });
  });
  it("should not allow admin update a Weed with invalid ID data type", done => {
    chai
      .request(server)
      .patch("/api/v1/admin/weed/8d58")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send({ name: "Abuja" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when updating weed which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/admin/weed/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Accept", "application/json")
      .send({ location: "Rivers" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("weed not found");
        done();
      });
  });
});

describe("Delete Weed", () => {
  beforeEach(async () => {
    await db.Weeds.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Weeds.create(weed4);
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
  it("should allow Admin Delete a Weed", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/weed/015494a8-5115-4e3e-ba84-6d08b9d2e08f")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted weed");
        done();
      });
  });
  it("should not allow admin delete a weed with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/weed/8d58")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting weed which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/admin/weed/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("weed not found");
        done();
      });
  });
});

describe("GET weed api route", () => {
  beforeEach(async () => {
    await db.Weeds.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Weeds.create(weed4);
    await db.Weeds.create(weed5);
  });
  it("returns all weeds", done => {
    chai
      .request(server)
      .get("/api/v1/weeds")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all weeds");

        data.forEach(weeds => {
          expect(weeds).to.have.property("id");
          expect(weeds).to.have.property("name");
          expect(weeds).to.have.property("imageUrl");
          expect(weeds).to.have.property("pricePerQty");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns weed with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/weed/54070e3b-8ea1-4267-818e-bdb489e2ace8")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived weed");
        expect(data).to.have.property("id");
        expect(data).to.have.property("name");
        expect(data).to.have.property("imageUrl");
        expect(data).to.have.property("pricePerQty");

        expect(data).to.be.an("object");
        done();
      });
  });
});
