import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import WeedModel from "../../models/weed";

chai.use(sinonChai);

describe("src/models/weed", () => {
  const Weed = WeedModel(sequelize, dataTypes);
  const weed = new Weed();

  checkModelName(Weed)("Weeds");

  context("properties", () => {
    ["name", "imageUrl", "pricePerQty"].forEach(
      checkPropertyExists(weed),
    );
  });
});
