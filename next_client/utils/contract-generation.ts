export function generateDummyContract(name: string, price: string): string {
    return `
      REAL ESTATE NFT CONTRACT
  
      Property Name: ${name}
      Property Value: ${price} ETH
  
      This is a dummy contract for the tokenization of the above-mentioned property.
      All rights and responsibilities are subject to local laws and regulations.
  
      Signed: ____________________
      Date: ${new Date().toLocaleDateString()}
    `
  }
  
  