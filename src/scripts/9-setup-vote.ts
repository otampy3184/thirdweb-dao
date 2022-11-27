import sdk from "./1-initialize-sdk.js";

// ガバナンスコントラクトのアドレスを設定
const vote = sdk.getContract("0x1F3fBA0aCFBFA8198B275Dc8eEFE63f4bEc957D9", "vote");

// ERC-20 コントラクトのアドレスを設定
const token = sdk.getContract("0x682DBa03EB560200984e67804d2884CeDb8F506c", "token");

(async () => {
  try {
    // 必要に応じて追加のトークンを作成する権限をトレジャリーに付与
    await (await token).roles.grant("minter", (await vote).getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // ウォレットのトークン残高を取得
    const ownedTokenBalance = await (await token).balanceOf(
      process.env.WALLET_ADDRESS!
    );

    // 保有する供給量の 90% を取得
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    // 供給量の 90% をガバナンスコントラクトへ移動
    await (await token).transfer(
      (await vote).getAddress(),
      percent90
    );

    console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();