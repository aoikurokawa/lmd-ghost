# Solana-twitter

## Description


## Tech Stack

- TypeScript, React.js, Anchor, Rust
- App works on only Solana localnet

## Usage

1. Deploy Contract

```bash
$ ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -cp config.json ./assets
# If you want to update contract `ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts update_candy_machine -e devnet -k ~/.config/solana/devnet.json -cp config.json`
```

2. Verify

```bash
$ ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json
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
