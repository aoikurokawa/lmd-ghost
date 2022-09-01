# Solana-twitter

## Overview

<img width="1461" alt="Screen Shot 2022-09-01 at 9 29 25 PM" src="https://user-images.githubusercontent.com/62386689/187939830-e9fc31b2-2a93-4547-96f4-ec3ab7d86137.png">


## Tech Stack

- [Anchor](https://www.anchor-lang.com/)
- [Nextjs](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)

## Get started

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
