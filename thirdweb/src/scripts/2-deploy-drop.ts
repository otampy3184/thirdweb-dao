import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // コレクションの名前
      name: "Ridgelinez IBC",
      // コレクションの説明（同じく書き換えてください）
      description: "A DAO for IBC",
      // コレクションのアイコンとなる画像
      image: readFileSync("src/scripts/assets/IBCCollection.png"),
      // NFT の販売による収益を受け取るアドレスを設定
      // ドロップに課金をしたい場合は、ここに自分のウォレットアドレスを設定します
      // 今回は課金設定はないので、0x0 のアドレスで渡す
      primary_sale_recipient: AddressZero,
    });

    // 初期化し、返ってきた editionDrop コントラクトのアドレスから editionDrop を取得
    const editionDrop = sdk.getContract(editionDropAddress, "edition-drop");

    // メタデータを取得
    const metadata = await (await editionDrop).metadata.get();

    // editionDrop コントラクトのアドレスを出力
    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress
    );

    // editionDrop コントラクトのメタデータを出力
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    // エラーをキャッチしたら出力
    console.log("failed to deploy editionDrop contract", error);
  }
})();