import sdk from "./1-initialize-sdk.js";

const token = sdk.getContract("0x682DBa03EB560200984e67804d2884CeDb8F506c", "token");

(async () => {
  try {
    // 現在のロールを記録
    const allRoles = await (await token).roles.getAll();

    console.log("👀 Roles that exist right now:", allRoles);

    // ERC-20 のコントラクトに関して現ウォレットが持っている権限を全て取り消す
    await (await token).roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await (await token).roles.getAll()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();