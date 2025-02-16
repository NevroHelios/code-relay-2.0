export interface NFT {
  tokenURI: string;
  creator: string;
  description?: string;
  title?: string;
  isClaimed: boolean;
  validity : Date;
}

export interface CreateNFTRequest {
  tokenURI: string;
  creator: string;
  title: string;
  description?: string;
}

export interface ClaimNFTRequest {
  tokenId: number;
  claimer: string;
}

export type NFTStatus = 'available' | 'claimed' | 'pending';