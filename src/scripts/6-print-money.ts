import sdk from "./1-initialize-sdk.js";

const token = sdk.getContract("0x682DBa03EB560200984e67804d2884CeDb8F506c", "token");

(async () => {
  try {
    // // 設定したい最大供給量を設定
    const amount = 1000000;
    // デプロイされた ERC-20 コントラクトを通して、トークンをミント
    await (await token).mint(amount);
    const totalSupply = await (await token).totalSupply();

    // トークンがどれだけあるかを表示
    console.log(
      "There now is",
      totalSupply.displayValue,
      "$TSC in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();