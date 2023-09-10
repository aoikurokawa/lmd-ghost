use std::collections::BTreeMap;

pub struct SortedList<K>(BTreeMap<K, ()>);

impl<K: Ord> SortedList<K> {
    pub fn new() -> Self {
        SortedList(BTreeMap::new())
    }

    pub fn insert(&mut self, key: K) {
        self.0.insert(key, ());
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn nth(&self, n: usize) -> Option<&K> {
        self.0.iter().nth(n).and_then(|(k, _v)| Some(k))
    }
}
