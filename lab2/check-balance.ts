import "dotenv/config"
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js"
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log(`Connected to devnet`, connection.rpcEndpoint);

const publicKey = new PublicKey("4QhJwjhhqqKYNda2pA7fqiVuRwYZTfuYGjFxzksFDVYF");

const balanceInLamports = await connection.getBalance(publicKey);

console.log(`Pub Key balance is: `, balanceInLamports);

console.log(`Airdropping 1 SOL to PubKey...`)

await airdropIfRequired(connection, publicKey, 1 * LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL);

console.log(`DONE Airdropping!!!`)

const balanceAfter = await connection.getBalance(publicKey);

console.log(`Pub Key balance is: `, balanceAfter);