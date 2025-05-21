import React, { useState } from 'react';
import { generateMnemonic, getEthereumWallet, getSolanaWallet } from './utils/walletUtils';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [ethWallets, setEthWallets] = useState([]);
  const [solWallets, setSolWallets] = useState([]);
  const [showEthKeys, setShowEthKeys] = useState({});
  const [showSolKeys, setShowSolKeys] = useState({});

  const createWallets = async () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);

    const eth = [];
    const sol = [];
    for (let i = 0; i < 3; i++) {
      const ethWallet = await getEthereumWallet(newMnemonic, i);
      const solWallet = await getSolanaWallet(newMnemonic, i);
      eth.push(ethWallet);
      sol.push(solWallet);
    }
    setEthWallets(eth);
    setSolWallets(sol);
    setShowEthKeys({});
    setShowSolKeys({});
  };

  const toggleKey = (type, index) => {
    if (type === 'eth') {
      setShowEthKeys(prev => ({ ...prev, [index]: !prev[index] }));
    } else {
      setShowSolKeys(prev => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="bg-[url('https://plus.unsplash.com/premium_photo-1700823214919-534b727a5bc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGV4dHVyZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')] w-full text-white font-sans">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Multi-Chain Wallet Generator</h1>
        <div className="flex justify-center">
          <button
            onClick={createWallets}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Generate Mnemonic & Wallets
          </button>
        </div>

        {mnemonic && (
          <>
            <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h2 className="font-semibold text-lg mb-2">🧠 Mnemonic Phrase</h2>
              <p className="break-words text-gray-200">{mnemonic}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-black"> Ethereum Wallets</h2>
              {ethWallets.map((w, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 mb-4">
                  <p className="text-sm break-words"><span className="font-semibold">Address:</span> {w.address}</p>
                  <p className="text-sm mt-2 break-words">
                    <span className="font-semibold">Private Key:</span>{" "}
                    {showEthKeys[i] ? w.privateKey : "**********************"}
                  </p>
                  <button
                    className="text-xs mt-2 text-blue-400 hover:underline"
                    onClick={() => toggleKey('eth', i)}
                  >
                    {showEthKeys[i] ? "Hide" : "Show"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-black"> Solana Wallets</h2>
              {solWallets.map((w, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 mb-4">
                  <p className="text-sm break-words"><span className="font-semibold">Address:</span> {w.address}</p>
                  <p className="text-sm mt-2 break-words">
                    <span className="font-semibold">Secret Key:</span>{" "}
                    {showSolKeys[i] ? w.secretKey : "***********************"}
                  </p>
                  <button
                    className="text-xs mt-2 text-white-400 hover:underline"
                    onClick={() => toggleKey('sol', i)}
                  >
                    {showSolKeys[i] ? "Hide" : "Show"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
