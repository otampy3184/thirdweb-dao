import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getContract("0xfcAa6fA75B8727870e9647e46138d776FeD8cB0f", "edition-drop");

(async () => {
    try {
        // 請求条件をオブジェクトに設定して渡す
        // 複数条件を異なる時期に設定することも可能
        const claimConditions = [
            {
                // いつからNFTをミントできるようになるか
                startTime: new Date(),
                // 上限となる最大供給量
                maxQuantity: 50_000,
                // NFTの価格
                price: 0,
                // 一回のトランザクションでミントできるNFTの個数
                quantityLimitPerTransaction: 1,
                // トランザクション間の待ち時間
                // MaxUint256に設定し、一人一回しか請求できないようにする
                waitInSeconds: MaxUint256,
            },
        ];
        await (await editionDrop).claimConditions.set("0", claimConditions);
        console.log("Successfully set claim condition");
    } catch (error) {
        console.error("failed to set claim condition", error);
    }
})();