export interface NFT {
  tokenId: number;
  tokenURI: string;
  creator: string;
  claimedBy: string | null;
  createdAt: Date;
  description?: string;
  title?: string;
  attributes?: {
    trait_type: string;
    value: string | number;
  }[];
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