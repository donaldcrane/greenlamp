import chai, { expect } from "chai";

import sinonChai from "sinon-chai";

import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";

import PaymentHistoryModel from "../../models/paymenthistory";

chai.use(sinonChai);
describe("src/models/paymenthistory", () => {
  const PaymentHistory = PaymentHistoryModel(sequelize, dataTypes);
  const paymenthistory = new PaymentHistory();
  checkModelName(PaymentHistory)("PaymentHistories");
  context("properties", () => {
    ["userId", "email", "reference", "amount", "status"].forEach(
      checkPropertyExists(paymenthistory)
    );
  });
  context("associations", () => {
    const Users = "Payment History data";
    before(() => {
      PaymentHistory.associate({ Users });
    });
    it("defined a belongsTo association with PaymentHistory", () => {
      expect(PaymentHistory.belongsTo).to.have.been.calledWith(Users);
    });
  });
});
