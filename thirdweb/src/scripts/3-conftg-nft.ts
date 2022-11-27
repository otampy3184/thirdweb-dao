import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getContract("0x09d56c9bFFA4e5984C5845DE75017879E717Be82", "edition-drop");

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: "IBC Member's Limited Area",
        description:
          "Ridgelinez IBC専用の限定アイテムです",
        image: readFileSync("src/scripts/assets/IBCCard.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();