export function getExplorerUrlAddress(
  chainId: number,
  address: string
): string {
  const explorers: { [key: number]: string } = {
    1: 'https://eth.blockscout.com/address/',
    137: 'https://polygon.blockscout.com/address/',
    42161: 'https://arbitrum.blockscout.com/address/',
    10: 'https://explorer.optimism.io/address/',
    56: 'https://bscscan.com/address/',
    43114: 'https://snowtrace.io/address/',
    8453: 'https://base.blockscout.com/address/',
    324: 'https://zksync.blockscout.com/address/',
    100: 'https://gnosis.blockscout.com/address/',
    130: 'https://unichain.blockscout.com/address/',
    146: 'https://sonicscan.org/address/',
    59144: 'https://lineascan.build/address/',
  };

  const baseUrl = explorers[chainId] || 'https://etherscan.io/address/';
  return `${baseUrl}${address}`;
}

export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const explorers: { [key: number]: string } = {
    1: 'https://eth.blockscout.com/tx/',
    137: 'https://polygon.blockscout.com/tx/',
    42161: 'https://arbitrum.blockscout.com/tx/',
    10: 'https://explorer.optimism.io/tx/',
    56: 'https://bscscan.com/tx/',
    43114: 'https://snowtrace.io/tx/',
    8453: 'https://base.blockscout.com/tx/',
    324: 'https://zksync.blockscout.com/tx/',
    100: 'https://gnosis.blockscout.com/tx/',
    130: 'https://unichain.blockscout.com/tx/',
    146: 'https://sonicscan.org/tx/',
    59144: 'https://lineascan.build/tx/',
  };

  const baseUrl = explorers[chainId] || 'https://etherscan.io/tx/';
  return `${baseUrl}${txHash}`;
}

export function getExplorerBlockUrl(
  chainId: number,
  blockNumber: number
): string {
  const explorers: { [key: number]: string } = {
    1: 'https://eth.blockscout.com/block/',
    137: 'https://polygon.blockscout.com/block/',
    42161: 'https://arbitrum.blockscout.com/block/',
    10: 'https://explorer.optimism.io/block/',
    56: 'https://bscscan.com/block/',
    43114: 'https://snowtrace.io/block/',
    8453: 'https://base.blockscout.com/block/',
    324: 'https://zksync.blockscout.com/block/',
    100: 'https://gnosis.blockscout.com/block/',
    130: 'https://unichain.blockscout.com/block/',
    146: 'https://sonicscan.org/block/',
    59144: 'https://lineascan.build/block/',
  };

  const baseUrl = explorers[chainId] || 'https://etherscan.io/block/';
  return `${baseUrl}${blockNumber}`;
}
