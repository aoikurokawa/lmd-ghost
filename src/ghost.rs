use std::collections::HashMap;

const LATENCY_FACTOR: f64 = 0.5;
const NODE_COUNT: i32 = 131072;
const BLOCK_ONCE_EVERY: i32 = 1024;
const SIM_LENGTH: i32 = 131072;

struct Ghost {
    blocks: HashMap<Vec<u8>, (usize, Option<()>)>,
    children: HashMap<Vec<u8>, Vec<Vec<u8>>>,
    height_to_bytes: Vec<[u8; 4]>,
    cache: HashMap<Vec<u8>, Vec<u8>>,
    ancestors: Vec<HashMap<Vec<u8>, Vec<u8>>>,
    logz: Vec<u8>,
}

impl Ghost {
    pub fn new() -> Self {
        let height_to_bytes: Vec<[u8; 4]> = (1..10000).map(|i: i32| i.to_be_bytes()).collect();

        let mut ancestors: Vec<HashMap<Vec<u8>, Vec<u8>>> = Vec::new();
        for _ in 0..16 {
            let mut ancestor_map = HashMap::new();
            let key = Vec::from([0u8; 32]);
            let value = Vec::from([0u8; 32]);
            ancestor_map.insert(key, value);
            ancestors.push(ancestor_map);
        }

        Self {
            blocks: HashMap::new(),
            children: HashMap::new(),
            height_to_bytes,
            cache: HashMap::new(),
            ancestors,
            logz: Vec::from([0, 0]),
        }
    }

    pub fn get_height(&self, block: &Vec<u8>) -> Option<usize> {
        Some(self.blocks.get(block).unwrap().0)
    }

    pub fn get_ancestor(&mut self, block: &Vec<u8>, at_height: usize) -> Option<Vec<u8>> {
        let h = self.blocks.get(block).unwrap().0;
        if at_height >= h {
            if at_height > h {
                return None;
            } else {
                return Some(block.clone());
            }
        }

        let mut cache_key = Vec::from(block.clone());
        let bytes = self.height_to_bytes.get(at_height).unwrap();
        cache_key.extend_from_slice(bytes);

        if self.cache.contains_key(&cache_key) {
            return self.cache.get(&cache_key).cloned();
        }

        let log = self.logz.get(h - at_height - 1).unwrap();
        let ancestor = self.ancestors.get(*log as usize).unwrap();
        let b = ancestor.get(block.as_slice()).unwrap();

        let o = self.get_ancestor(b, at_height).unwrap();
        self.cache.insert(cache_key, o.clone());

        Some(o)
    }

    pub fn get_clear_winner(
        &self,
        latest_votes: &HashMap<Vec<u8>, u64>,
        h: usize,
    ) -> Option<Vec<u8>> {
        let mut at_height = HashMap::new();
        let mut total_vote_count = 0;

        for (k, v) in latest_votes.iter() {
            let anc = self.get_ancestor(k, h);
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
    let message: Vec<[u8; 32]> = vec![[0; 32]; NODE_COUNT as usize];
    message[index]
}

pub fn get_balances() -> Vec<u64> {
    vec![1; NODE_COUNT as usize]
}

pub fn get_balance(index: usize) -> u64 {
    let balances = vec![1; NODE_COUNT as usize];
    balances[index]
}

pub fn max_known_height(index: usize) -> Option<usize> {
    let h = Vec::from([0]);
    h.get(index).copied()
}

pub fn choose_best_child(votes: HashMap<Vec<u8>, f64>) -> Option<Vec<u8>> {
    let mut bitmask = 0;

    for bit in (0..=255).rev() {
        let mut zero_votes = 0f64;
        let mut one_votes = 0f64;
        let mut single_candidate = None;

        for candidate in votes.keys() {
            let votes_for_candidate = votes.get(candidate);
            if candidate.len() == 8 {
                let arr = [
                    candidate[0],
                    candidate[1],
                    candidate[2],
                    candidate[3],
                    candidate[4],
                    candidate[5],
                    candidate[6],
                    candidate[7],
                ];
                let candidate_as_int = u64::from_be_bytes(arr);

                if candidate_as_int >> (bit + 1) != bitmask {
                    continue;
                }

                if (candidate_as_int >> bit) % 2 == 0 {
                    zero_votes += votes_for_candidate.unwrap();
                } else {
                    one_votes += votes_for_candidate.unwrap();
                }

                if single_candidate.is_none() {
                    single_candidate = Some(candidate.to_vec());
                } else {
                    single_candidate = None;
                }
            }
        }

        let vote = if one_votes > zero_votes { 1 } else { 0 };
        bitmask = (bitmask * 2) + vote;
        if single_candidate.is_some() {
            return single_candidate;
        }
    }

    None
}

pub fn ghost() -> Vec<u8> {
    let mut ghost = Ghost::new();
    let mut latest_votes: HashMap<Vec<u8>, u64> = HashMap::new();
    let balances = get_balances();

    for (i, balance) in balances.iter().enumerate() {
        let message = latest_message(i);
        let entry = latest_votes.entry(message.to_vec()).or_insert(0u64);
        *entry += *balance;
    }

    let mut head = vec![0u8; 32];
    let mut height = 0;

    // let children = ghost.children.clone();
    loop {
        let c = match ghost.children.get(&head) {
            Some(child) => child.clone(),
            None => vec![],
        };
        if c.is_empty() {
            return head;
        }
        let max_known_height = max_known_height(0).unwrap();
        let mut step = get_power_of_2_below(max_known_height - height);
        while step > 0 {
            let possible_clear_winner =
                ghost.get_clear_winner(&latest_votes, height - (height % step) + step);

            if let Some(winner) = possible_clear_winner {
                head = winner;
                break;
            }
            step /= 2;
        }

        if step > 0 {
            continue;
        } else if c.len() == 1 {
            head = c[0].clone();
        } else {
            let mut child_votes = HashMap::new();
            for x in c.iter() {
                child_votes.insert(x.clone(), 0.01);
            }
            for (k, v) in latest_votes.iter() {
                if let Some(child) = ghost.get_ancestor(k, height + 1) {
                    let child_vote = child_votes.get(&child).unwrap_or(&0f64);
                    child_votes.insert(child, *child_vote + *v as f64);
                }
            }
            head = choose_best_child(child_votes).unwrap();
        }

        height = ghost.get_height(&head).unwrap();
        let mut deletes = Vec::new();
        for (k, _v) in latest_votes.iter() {
            let anc = ghost.get_ancestor(k, height).unwrap();
            if anc.to_vec() != head {
                deletes.push(k.clone());
            }
        }

        for k in deletes.iter() {
            latest_votes.remove(k);
        }
    }
}

pub fn get_power_of_2_below(x: usize) -> usize {
    let logz = get_logz(x);
    2_u64.pow(logz) as usize
}
