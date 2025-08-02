// src/app/services/wallet.service.ts
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public provider: ethers.BrowserProvider | null = null;
  public signer: ethers.Signer | null = null;
  public address: string | null = null;

  async connect(): Promise<string | null> {
    if (!(window as any).ethereum) {
      alert('MetaMask is not installed!');
      return null;
    }

    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    this.address = await this.signer.getAddress();
    return this.address;
  }
}
