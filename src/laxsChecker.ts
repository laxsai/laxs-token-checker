import { Connection, PublicKey } from "@solana/web3.js"

const LAXS_MINT = new PublicKey("LAXS CONTRACT")

export async function checkLaxsBalance(wallet: string): Promise<number> {
  const connection = new Connection("https://api.mainnet-beta.solana.com")
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey(wallet), {
    programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
  })

  for (const { account } of tokenAccounts.value) {
    const info = account.data.parsed.info
    if (info.mint === LAXS_MINT.toBase58()) {
      return parseFloat(info.tokenAmount.uiAmountString)
    }
  }

  return 0
}
