# LMD-GHOST (Latest Message Driven, Greedy Heaviest-Observed Sub-Tree)

## GHOST
The GHOST protocol comes from a 2013 [paper](https://eprint.iacr.org/2013/881.pdf) by Sompolinsky and Zohar about how to safely imporove transaction throughput on Bitcoin.

Algorithm. Greeedy Heaviest-Observed Sub-Tree (GHOST)
Input: Block tree 15:40

1. set B <- Genesis Block
2. if ChildrenT(B) = 0 then return (B) and exist
3. else update B <- argmax (C ChildrenT(B)) |subtreeT(C)|8
4. goto line 2

The algorithm follows a path from the root of the tree (the genesis block) and chosses at each fork the block leading to the heaviest subtree. 
For instance, the subtree of block 1B contains 12 blocks, whereas that of 1A contains only 6. The algoritm will thus pick 1B as belonging to the main chain, and proceed to resolve the forks inside subtree (1B).

## Tech Stack

- [Rust](https://www.rust-lang.org/)

## Get started

1. Run an app

```bash

cargo r

```

## References

1. https://github.com/protolambda/lmd-ghost
2. https://github.com/ethereum/research/blob/master/ghost/ghost.py
3. https://eth2book.info/capella/part2/consensus/lmd_ghost/
