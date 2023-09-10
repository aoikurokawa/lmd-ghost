use std::collections::HashMap;

use ethereum_types::H256 as Hash256;

mod ghost;
mod node;
mod sorted_list;
mod tree;

pub const SKIP_LIST_LEN: usize = 16;

pub type Height = usize;
pub type Slot = u64;

pub struct Block {
    pub slot: Slot,
    ancestor_skip_list: [Hash256; SKIP_LIST_LEN],
}

pub type Store = HashMap<Hash256, Block>;

fn main() {
    println!("Hello, world!");
}
