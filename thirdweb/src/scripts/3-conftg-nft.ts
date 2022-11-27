import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getContract("0xfcAa6fA75B8727870e9647e46138d776FeD8cB0f", "edition-drop");

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: "IBC Member's Limited Area",
        description:
          "Ridgelinez IBC専用の限定アイテムです",
        image: readFileSync("src/scripts/assets/NFT.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();