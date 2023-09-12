use std::collections::HashMap;

const LATENCY_FACTOR: f64 = 0.5;
const NODE_COUNT: i32 = 131072;
const BLOCK_ONCE_EVERY: i32 = 1024;
const SIM_LENGTH: i32 = 131072;

struct Ghost {
    blocks: HashMap<[u8; 32], (usize, Option<()>)>,
    height_to_bytes: Vec<[u8; 4]>,
    cache: HashMap<Vec<u8>, [u8; 32]>,
    ancestors: Vec<HashMap<[u8; 32], [u8; 32]>>,
    logz: Vec<u8>,
}

impl Ghost {
    pub fn new() -> Self {
        let height_to_bytes: Vec<[u8; 4]> = (1..10000).map(|i: i32| i.to_be_bytes()).collect();

        let mut ancestors: Vec<HashMap<[u8; 32], [u8; 32]>> = Vec::new();
        for _ in 0..16 {
            let mut ancestor_map = HashMap::new();
            let key = [0u8; 32];
            let value = [0u8; 32];
            ancestor_map.insert(key, value);
            ancestors.push(ancestor_map);
        }

        Self {
            blocks: HashMap::new(),
            height_to_bytes,
            cache: HashMap::new(),
            ancestors,
            logz: Vec::from([0, 0]),
        }
    }

    pub fn get_ancestor(&self, block: [u8; 32], at_height: usize) -> Option<[u8; 32]> {
        let h = self.blocks.get(&block).unwrap().0;
        if at_height >= h {
            if at_height > h {
                return None;
            } else {
                return Some(block);
            }
        }

        let mut cache_key = Vec::from(block.clone());
        let bytes = self.height_to_bytes.get(at_height).unwrap();
        cache_key.extend_from_slice(bytes);

        if self.cache.contains_key(&cache_key) {
            return self.cache.get(&cache_key).copied();
        }

        let log = self.logz.get(h - at_height - 1).unwrap();
        let ancestor = self.ancestors.get(*log as usize).unwrap();
        let b = ancestor.get(block.as_slice()).unwrap();

        let o = self.get_ancestor(*b, at_height).unwrap();
        self.cache.insert(cache_key, o);

        Some(o)
    }

    pub fn get_clear_winner(
        &self,
        latest_votes: HashMap<[u8; 32], u32>,
        h: usize,
    ) -> Option<Vec<u8>> {
        let mut at_height = HashMap::new();
        let mut total_vote_count = 0;

        for (k, v) in latest_votes.iter() {
            let anc = self.get_ancestor(*k, h);
            if anc.is_some() {
                total_vote_count += 1;
            }

            let mut anc_height = at_height.entry(&anc.unwrap()).or_insert(0);
            *anc_height += v;

            at_height.insert(&anc.unwrap(), *anc_height);
        }

        for (k, v) in at_height.iter() {
            if *v >= total_vote_count / 2 {
                return Some(k.to_vec());
            }
        }

        None
    }
}

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

pub fn choose_best_child(votes: HashMap<[u8; 8], u64>) -> Option<[u8; 8]> {
    let mut bitmask = 0;

    for bit in (0..=255).rev() {
        let mut zero_votes = 0;
        let mut one_votes = 0;
        let mut single_candidate = None;

        for candidate in votes.keys() {
            let mut votes_for_candidate = votes.get(candidate);
            let mut candidate_as_int = u64::from_be_bytes(*candidate);

            if candidate_as_int >> (bit + 1) != bitmask {
                continue;
            }
            if (candidate_as_int >> bit) % 2 == 0 {
                zero_votes += votes_for_candidate.unwrap();
            } else {
                one_votes += votes_for_candidate.unwrap();
            }

            if single_candidate.is_none() {
                single_candidate = Some(candidate);
            } else {
                single_candidate = None;
            }
        }

        let vote = if one_votes > zero_votes { 1 } else { 0 };
        bitmask = (bitmask * 2) + vote;
        if single_candidate.is_some() {
            return single_candidate.copied();
        }
    }

    None
}

pub fn ghost() -> Vec<u8> {
    let mut ghost = Ghost::new();
    let mut latest_votes = HashMap::new();
    let mut balances = get_balances();

    for (i, balance) in balances.iter().enumerate() {
        let message = latest_message(i);
        let entry = latest_votes.entry(i).or_insert(0);
        *entry += *balance;
    }

    let mut head = vec![0; 32];
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
            let possible_clear_winner =
                ghost.get_clear_winner(latest_votes, height - (height % step) + step);

            if possible_clear_winner.is_some() {
                head = possible_clear_winner.unwrap();
                break;
            }
            step /= 2;
        }

        if step > 0 {
            continue;
        } else if c.len() == 1 {
            head = c.get(0).unwrap();
        } else {
            let child_votes = HashMap::new();
            for x in c.iter() {
                child_votes.insert(*x, 0.01);
            }
            for (k, v) in latest_votes.iter() {
                let child = ghost.get_ancestor(k, height + 1);
                if child.is_some() {
                    // head =
                }
            }
        }
    }

    Vec::new()
}

pub fn get_power_of_2_below(x: usize) -> u64 {
    let logz = get_logz(x);
    2_u64.pow(logz)
}
