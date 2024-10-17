import { createMint, mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl,  } from "@solana/web3.js";

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("User account loaded: ", user.publicKey.toBase58());

const tokenMint = new PublicKey("AGHvmStBofVVBgY1bXrEcVmwtBqnQLdh2kTMxmyV2dqm");
const destTokenAccount = new PublicKey("3Rb3TXopY5qqGWsQSAPQjqKc7qnLQkUt3Rv3WZekq4s9");

const sig = await mintTo(
    connection,
    user,
    tokenMint,
    destTokenAccount,
    user,
    AMOUNT * (10 ** DECIMALS),
);

const link = getExplorerLink("tx", sig, "devnet");

console.log("Transaction done, link is: ", link);