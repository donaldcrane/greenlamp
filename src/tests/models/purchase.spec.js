import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import PurchasesModel from "../../models/purchase";

chai.use(sinonChai);

describe("src/models/purchase", () => {
  const Purchase = PurchasesModel(sequelize, dataTypes);
  const purchase = new Purchase();

  checkModelName(Purchase)("Purchases");

  context("properties", () => {
    ["userId", "weedName", "status", "amountInNaira", "quantity", "reference"].forEach(
      checkPropertyExists(purchase),
    );
  });
});
