use std::collections::HashMap;

use ethereum_types::H256 as Hash256;

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

pub const LATENCY_FACTOR: f64 = 0.5;
pub const NODE_COUNT: i32 = 131072;
pub const BLOCK_ONCE_EVERY: i32 = 1024;
pub const SIM_LENGTH: i32 = 131072;

pub fn get_ancestor() {}

pub fn get_logz(x: usize) -> u32 {
    let logz: Vec<u32> = vec![0, 0];
    logz[x]
}

pub fn latest_message(index: usize) -> [u8; 32] {
    let mut message: Vec<[u8; 32]> = vec![[0; 32]; NODE_COUNT as usize];
    message[index]
}

pub fn get_balances() -> Vec<u64> {
    vec![1; NODE_COUNT as usize]
}

pub fn get_balance(index: usize) -> u64 {
    let mut balances = vec![1; NODE_COUNT as usize];
    balances[index]
}

pub fn get_children() -> HashMap<[u8; 32], Vec<u8>> {
    let map = HashMap::new();
    map
}

pub fn max_known_height(index: usize) -> Option<usize> {
    let mut h = Vec::from([0]);
    h.get(index).copied()
}

pub fn get_clear_winner(latest_votes: HashMap<[u8; 32], Vec<u8>>) {
    let mut at_height = HashMap::new();
    let mut total_vote_count = 0;

    for (k, v) in latest_votes.iter() {
        let anc = get
    }
}

pub fn ghost() -> Vec<u8> {
    let mut latest_votes = HashMap::new();
    let mut balances = get_balances();

    for (i, balance) in balances.iter().enumerate() {
        let message = latest_message(i);
        let entry = latest_votes.entry(i).or_insert(0);
        *entry += *balance;
    }

    let head = vec![0; 32];
    let height = 0;

    let mut children = get_children();
    loop {
        let c = children.entry(head).or_insert(vec![]);
        if c.is_empty() {
            return head;
        }
        let max_known_height = max_known_height(0).unwrap();
        let step = get_power_of_2_below(max_known_height - height);
        while step > 0 {

        }
    }

    Vec::new()
}

pub fn get_power_of_2_below(x: usize) -> u64 {
    let logz = get_logz(x);
    2_u64.pow(logz)
}

fn main() {
    println!("Hello, world!");
}
