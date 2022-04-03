# Solana-twitter

## Description


## Tech Stack

- TypeScript, React.js, Anchor, Rust
- App works on only Solana localnet

## Usage

1. Run Solana localnet

```bash
$ solana-test-validator --no-bpf-jit
# If you want to run on m1 mac book, you should use this command
```

2. Deploy Smart Contract

```bash
$ anchor deploy
```

3. Edit your environment variables

```bash
# rename env file
$ mv .env.sample .env
```

4. Start frontend server

```bash
# cd into `app` folder
$ cd app
# install dependencies
$ yarn
# start frontend server
$ yarn dev
```

## References

1. https://lorisleiva.com/create-a-solana-dapp-from-scratch
