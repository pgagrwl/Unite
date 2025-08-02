export function getExplorerUrlAddress(
  chainId: number,
  address: string
): string {
  const explorers: { [key: number]: string } = {
    1: 'https://eth.blockscout.com/address/',
    137: 'https://polygon.blockscout.com/address/',
    42161: 'https://arbitrum.blockscout.com/address/',
    10: 'https://explorer.optimism.io//address/',
    56: 'https://bscscan.com/address/',
    43114: 'https://snowtrace.io/address/',
    8453: 'https://base.blockscout.com/address/',
    324: 'https://zksync.blockscout.com//address/',
    100: 'https://gnosis.blockscout.com/address/',
    130: 'https://unichain.blockscout.com/address/',
    146: 'https://sonicscan.org/address/',
    59144: 'https://lineascan.build/address/',
    // Add more chains if needed
  };

  const baseUrl = explorers[chainId] || 'https://etherscan.io/address/';
  return `${baseUrl}${address}`;
}
