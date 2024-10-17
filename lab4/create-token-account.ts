import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl,  } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("User account loaded: ", user.publicKey.toBase58());

const tokenMint = new PublicKey('AGHvmStBofVVBgY1bXrEcVmwtBqnQLdh2kTMxmyV2dqm');
const destPubKey = new PublicKey('FgRv34GopxDVsu7rhgqK2jsmfP7yQ3HEyohSMgyVrGWL');

const destTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMint, destPubKey);

console.log("Token account created: ", destTokenAccount.address.toBase58());