import { keypairIdentity, Metaplex, irysStorage } from "@metaplex-foundation/js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection } from "@solana/web3.js";
import { uploadMetadata } from "./uploadMetadata";
import {createNft} from "./createNft";
import "dotenv/config";

const nftData = {
    name: "SDP Cool Nft",
    symbol: "SDP",
    description: "Solana Developers Program - Romania, second cohort",
    imagePath: "./src/solana.png",
};

async function main() {
    const connection = new Connection("https://api.devnet.solana.com");
    console.log("Connection done");
    
    const keypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log(`Keypair loaded: ${keypair.publicKey.toBase58()}`);

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(keypair))
        .use(
            irysStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://devnet.solana.com",
                timeout: 60000,
            })
        );
    
    const uri = await uploadMetadata(metaplex, nftData);

    console.log("Metaplex loaded!");

    const nft = await createNft(metaplex, uri, nftData);

    console.log("NFT created!");
}

main()
    .then(() => console.log("Done!"));