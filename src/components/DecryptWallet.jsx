import { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';

function DecryptWallet() {
  const [password, setPassword] = useState('');
  const [decryptedData, setDecryptedData] = useState(null);
  const [fileName, setFileName] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null); 

  const decryptWalletData = (ciphertext, password) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const decryptedContent = decryptWalletData(content, password);
          const walletData = JSON.parse(decryptedContent);
          setDecryptedData(walletData);
        } catch (error) {
          console.error("Error decrypting wallet data:", error);
          setErrorMessage("Failed to decrypt. Check your password.");
          setDecryptedData(null);
        } finally {
          fileInputRef.current.value = '';
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='container'>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="fileInputContainer">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileRead}
          className="fileInput"
        />
        <button onClick={() => fileInputRef.current.click()} className="customFileInputButton" disabled={!password}>
          Upload Wallet File
        </button>
        {fileName && <p><strong>Selected file: </strong><em>{fileName}</em></p>}
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {decryptedData && (
          <div className='wallet-info'>
          <p><strong>Address: </strong><br/><em>{decryptedData.address}</em></p>
          <p><strong>Private Key: </strong><br/><em>{decryptedData.privateKey}</em></p>
          <p><strong>Mnemonic Phrase: </strong><br/><em>{decryptedData.words}</em></p>
        </div>
      )}
    </div>
  );
}

export default DecryptWallet;
