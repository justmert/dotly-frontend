export interface IAccount {
    account_display: {
      address: string;
    };
    address: string;
    assets_tag: null | any; // You can replace 'any' with the specific data type if needed
    balance: string;
    balance_lock: string;
    bonded: string;
    conviction_lock: string;
    count_extrinsic: number;
    delegate: null | any; // You can replace 'any' with the specific data type if needed
    democracy_lock: string;
    election_lock: string;
    evm_account: string;
    is_council_member: boolean;
    is_erc20: boolean;
    is_erc721: boolean;
    is_evm_contract: boolean;
    is_fellowship_member: boolean;
    is_module_account: boolean;
    is_registrar: boolean;
    is_techcomm_member: boolean;
    lock: string;
    multisig: Record<string, any>; // You can replace 'any' with the specific data type if needed
    nonce: number;
    proxy: Record<string, any>; // You can replace 'any' with the specific data type if needed
    registrar_info: null | any; // You can replace 'any' with the specific data type if needed
    reserved: string;
    role: string;
    staking_info: null | any; // You can replace 'any' with the specific data type if needed
    stash: string;
    substrate_account: null | any; // You can replace 'any' with the specific data type if needed
    unbonding: string;
    vesting: null | any; // You can replace 'any' with the specific data type if needed
}
  
export interface IBalanceDistribution {
    network: string;
    symbol: string;
    decimal: number;
    price: string;
    category: string;
    balance: string;
    locked: string;
    reserved: string;
    bonded: string;
    unbonding: string;
    democracy_lock: string;
    conviction_lock: string;
    election_lock: string;
    nomination_bonded: string;
    token_unique_id: string;
}

export interface IBalanceHistory {
    value: string;
    date: string;
}

export interface IBalanceStats {
    max: string;
    min: string;
    prev24H: string;
}

interface Judgement {
    index: number;
    judgement: string;
}

export interface IIdentity {
    network: string;
    identity: boolean;
    parent: {
      address: string;
      display: string;
      sub_symbol: string;
      identity: boolean;
    }
  }