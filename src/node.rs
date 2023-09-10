#[derive(Default, Clone)]
pub struct Node {
    pub parent_hash: Option<Hash256>,
    pub children: Vec<Hash256>,
    pub score: u64,
    pub height: Height,
    pub block_hash: Hash256,
}

impl Node {
    pub fn does_not_have_children(&self) -> bool {
        self.children.is_empty()
    }
}
