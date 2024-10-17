import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("User account loaded: ", user.publicKey.toBase58());

const tokenMint = new PublicKey("AGHvmStBofVVBgY1bXrEcVmwtBqnQLdh2kTMxmyV2dqm");
const destPubKey = new PublicKey(
  "9j3uYxDQdgZxncwHrtroGPwo9qw9RhbBJpnhcbkNsafT"
);

const myTokenAccount = new PublicKey('3Rb3TXopY5qqGWsQSAPQjqKc7qnLQkUt3Rv3WZekq4s9');


const signature = await transfer(
    connection,
    user,
    myTokenAccount,
    destPubKey,
    user,
    9 * 10 ** DECIMALS,
);

const link = getExplorerLink("tx", signature, "devnet");

console.log("Transfered 9 tokens: ", link);