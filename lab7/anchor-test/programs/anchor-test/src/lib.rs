use anchor_lang::prelude::*;

declare_id!("9wQw4F89uTFBwKDFq28EnnP5GqP3Bf3quQsvcNEje94R");

#[program]
pub mod anchor_test {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
