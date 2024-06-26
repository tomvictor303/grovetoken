declare global {
  interface HomeState {
    network: Network | null,
    //////////////////////
    token_type: number
    token_name: string
    token_symbol: string
    token_decimals: number
    //////////////////////
    supply_type: 'Fixed' | 'Capped' | 'Unlimited'
    initial_supply: number
    maximum_supply: number
    //////////////////////
    isConformedERC20: boolean
    isVerifiedOnEtherscan: boolean,
    isNoCopyrightLink: boolean,
    isMintable: boolean,
    isBurnable: boolean,
    isPausable: boolean,
    isRecoverable: boolean,
    isAntiWhale: boolean,
    isTax: boolean,
    //////////////////////
    buyPercent: number,
    sellPercent: number,
    transferPercent: number,
    //////////////////////
    burnPercent: number,
    teamPercent: number,
    taxCurrency: string,
    //////////////////////
    teamAddressList: Array<TeamAddress>,
    //////////////////////
    swap_router: string,
    access_type: "Owner" | "Roles",
  }
}

export {};