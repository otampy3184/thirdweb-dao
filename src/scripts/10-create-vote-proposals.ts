import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// 投票コントラクトのアドレスを設定します
const vote = sdk.getContract("0x1F3fBA0aCFBFA8198B275Dc8eEFE63f4bEc957D9", "vote");

// ERC-20 コントラクトのアドレスを設定します。
const token = sdk.getContract("0x682DBa03EB560200984e67804d2884CeDb8F506c", "token");


(async () => {
  try {
    // トレジャリーに 420,000 のトークンを新しく鋳造する提案を作成
    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        // mint を実行するトークンのコントラクトアドレスを設定
        toAddress: (await token).getAddress(),
        // DAO のネイティブトークンが ETH であるため、プロポーザル作成時に送信したい ETH の量を設定（今回はトークンを新しく発行するため 0 を設定）
        nativeTokenValue: 0,
        // ガバナンスコントラクトのアドレスに mint するために、金額を正しい形式（wei）に変換
        transactionData: (await token).encoder.encode(
          "mintTo", [
          (await vote).getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]
        ),
      }
    ];

    await (await vote).propose(description, executions);

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    // 6,900 のトークンを自分たちに譲渡するための提案を作成
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        nativeTokenValue: 0,
        transactionData: (await token).encoder.encode(
          // トレジャリーからウォレットへの送金
          "transfer",
          [
            process.env.WALLET_ADDRESS!,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: (await token).getAddress(),
      },
    ];

    await (await vote).propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();