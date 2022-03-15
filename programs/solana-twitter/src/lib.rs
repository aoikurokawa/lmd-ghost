use anchor_lang::prelude::*;

declare_id!("9dR6c95cjzNhS4rnhzgZpRAhUmVrNq5w6oHyPs5bqAev");

#[program]
pub mod solana_twitter {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}
