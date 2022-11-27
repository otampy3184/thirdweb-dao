import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // 標準的なERC20のコントラクトをデプロイする
        const tokenAddress = await sdk.deployer.deployToken({
            // 名前
            name: "IBC Governance Token",
            // 単位
            symbol: "IBCT",
            // 売却時の受け取りアドレス
            primary_sale_recipient: AddressZero
        });
        console.log(
            "Successfully deployed token module, address:",
            tokenAddress
        );
    } catch(error){
        console.error("failed to deploy token module", error);
    }
})();