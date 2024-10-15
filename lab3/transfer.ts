import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, clusterApiUrl, Connection, sendAndConfirmTransaction, SystemProgram } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log("Sender public key:", sender.publicKey.toBase58());

const receiver = new PublicKey("H5bKPaTjsx3Ug2ELXRYfbkPRtct4p11Kk4v1rgzjymq7");

const transanction = new Transaction();

const amount = 0.01;

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: amount * LAMPORTS_PER_SOL,
});

transanction.add(transferInstruction);

const createMemo = createMemoInstruction("Memo instruction");
transanction.add(createMemo);

const signature = await sendAndConfirmTransaction(connection, transanction, [sender]);

console.log("Transaction confirmed: ", signature);