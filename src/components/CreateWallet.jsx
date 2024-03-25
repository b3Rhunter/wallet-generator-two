import { useState } from 'react';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';

function CreateWallet() {
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const encryptWalletData = (data, password) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        return ciphertext;
    };

    const createWallet = async () => {

        if (passwordStrength !== 'Weak') {
            alert('Please use a stronger password.');
            return;
        }

        const wallet = ethers.Wallet.createRandom();
        setWalletAddress(wallet.address);

        const encryptedData = encryptWalletData({
            address: wallet.address,
            privateKey: wallet.privateKey,
            words: wallet.mnemonic.phrase,
        }, password);

        const blob = new Blob([encryptedData], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = href;
        link.download = "ethereum-wallet.txt";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const checkPasswordStrength = (password) => {
        let strength = '';
        if (password.length > 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            strength = 'Strong';
        } else if (password.length >= 8) {
            strength = 'Medium';
        } else {
            strength = 'Weak';
        }
        setPasswordStrength(strength);
    };

    return (
        <div className='container'>
            <p>Please write down your password and keep it somewhere safe. Without it, you will not be able to access your wallets encrypted data.</p>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                }}
            />
            <p>Password Strength: {passwordStrength}</p>
            <button onClick={createWallet}>Create and Download Wallet</button>
            {walletAddress && (
                <>
                    <h3>Your Wallet Address:</h3>
                    <p>{walletAddress}</p>
                </>
            )}
        </div>
    );
}

export default CreateWallet;
