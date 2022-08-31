import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaTwitter } from "../target/types/solana_twitter";
import * as assert from "assert";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

describe("solana-twitter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;

  it("can send a new tweet!", async () => {
    const tweetKeypair = anchor.web3.Keypair.generate();
    await program.methods.sendTweet("Hello", "Hello, World!").accounts(
      {        
        tweet: tweetKeypair.publicKey,
        author: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    )
    .signers([tweetKeypair])
    .rpc();      

    const tweetAccount = await program.account.tweet.fetch(
      tweetKeypair.publicKey
    );

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, "Hello");
    assert.equal(tweetAccount.content, "Hello, World!");
    assert.ok(tweetAccount.timestamp);
  });

  it("can send a new tweet without a topic", async () => {
    const tweet = anchor.web3.Keypair.generate();
    await program.methods.sendTweet("", "gm").accounts(
      {        
        tweet: tweet.publicKey,
        author: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    )
    .signers([tweet])
    .rpc();      

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, "");
    assert.equal(tweetAccount.content, "gm");
    assert.ok(tweetAccount.timestamp);
  });

  // it("can send a new tweet from a different author", async () => {
  //   const otherUser = anchor.web3.Keypair.generate();
  //   const signature = await program.provider.connection.requestAirdrop(
  //     otherUser.publicKey,
  //     1000000000
  //   );
  //   await program.provider.connection.confirmTransaction(signature, "finalized");

  //   const tweet = anchor.web3.Keypair.generate();
  //   await program.methods.sendTweet("veganism", "Yay Tofu").accounts(
  //     {        
  //       tweet: tweet.publicKey,
  //       author: otherUser.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     }
  //   )
  //   .signers([otherUser, tweet])
  //   .rpc();      

  //   const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  //   // Ensure it has the right data.
  //   assert.equal(
  //     tweetAccount.author.toBase58(),
  //     otherUser.publicKey.toBase58()
  //   );
  //   assert.equal(tweetAccount.topic, "veganism");
  //   assert.equal(tweetAccount.content, "Yay Tofu");
  //   assert.ok(tweetAccount.timestamp);
  // });

  it("can not provide a topic with more than 50 characters", async () => {
    try {
      const tweet = anchor.web3.Keypair.generate();
      const topicWith51Chars = "x".repeat(51);
      await program.methods.sendTweet(topicWith51Chars, "Yay Tofu").accounts(
        {        
          tweet: tweet.publicKey,
          author: program.provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      )
      .signers([tweet])
      .rpc();      

    } catch (error) {
      assert.equal(
        error.error.errorMessage,
        "The provided topic should be 50 characters long maximum."
      );
      return;
    }

    assert.fail(
      "The instruction should have failed with a 51-character topic."
    );
  });

  it("can not provide a content with more than280 characters", async () => {
    try {
      const tweet = anchor.web3.Keypair.generate();
      const contentWith51Chars = "x".repeat(281);
      await program.methods.sendTweet("tropical food", contentWith51Chars).accounts(
        {        
          tweet: tweet.publicKey,
          author: program.provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }
      )
      .signers([tweet])
      .rpc();      
    } catch (error) {
      assert.equal(
        error.error.errorMessage,
        "The provided content should be 280 characters long maximum."
      );
      return;
    }

    assert.fail(
      "The instruction should have failed with a 281-character content."
    );
  });

  // it("can fetch all tweets", async () => {
  //   const tweetAccounts = await program.account.tweet.all();
  //   assert.equal(tweetAccounts.length, 3);
  // });

  // it("can filter tweets by author", async () => {
  //   const authorPublicKey = program.provider.wallet.publicKey;
  //   const tweetAccounts = await program.account.tweet.all([
  //     {
  //       memcmp: {
  //         offset: 8, // Discriminator.
  //         bytes: authorPublicKey.toBase58(),
  //       },
  //     },
  //   ]);
  //   assert.equal(tweetAccounts.length, 2);
  //   assert.ok(
  //     tweetAccounts.every((tweetAccount) => {
  //       return (
  //         tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
  //       );
  //     })
  //   );
  // });

  // it("can filter tweets by topics", async () => {
  //   const tweetAccounts = await program.account.tweet.all([
  //     {
  //       memcmp: {
  //         offset:
  //           8 + // Discriminator
  //           32 + // Author public key
  //           8 + // Timestamp
  //           4, // Topic String prefix
  //         bytes: bs58.encode(Buffer.from("veganism")),
  //       },
  //     },
  //   ]);

  //   assert.equal(tweetAccounts.length, 1);
  //   assert.ok(
  //     tweetAccounts.every((tweetAccount) => {
  //       return tweetAccount.account.topic === "veganism";
  //     })
  //   );
  // });
});
