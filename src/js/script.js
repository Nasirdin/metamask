// modal ----------------------------------\
const modalClose = document.getElementById('close');
const modal = document.getElementById('modal');
const connectWallet = document.getElementById('connectWallet');

connectWallet.addEventListener('click', () => {
    modal.style.display = 'block';
})

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
})



const apiKey = 'pk_test_F7F84FB9AF538E92'
const fm = new Fortmatic(apiKey);
window.web3 = new Web3(fm.getProvider());

//  MetaMask ----------------------------
        
window.userWalletAddress = null;

const loginBtn = document.getElementById('loginBtn');
const fortmaticBtn = document.getElementById('fortmaticBtn');
const userWallet = document.getElementById('userWallet');
const sendM = document.getElementById('sendM');
const sendF = document.getElementById('sendF');
const formM = document.getElementById('formM');
const formF = document.getElementById('formF');
const inputM = document.getElementById('inputM');
const inputF = document.getElementById('inputF');
const getAcc = localStorage.getItem('accountMetaMask');
const getAccFort = localStorage.getItem('accountFortmatic');
const walletBalance = document.getElementById('walletBalance');
const network = document.getElementById('network');
const formT = document.getElementById('formT');

if(getAcc !== null) {
    loginMetamaskBtn()
} else if(getAcc === null) {
    loginBtn.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
    if(!window.ethereum) {
        loginBtn.innerText = 'MetaMask in not installed';
        loginBtn.style.background = "#999999";
        loginBtn.style.color = '#fff';
        return false
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
        console.error(e.message)
        return
    })
    if(!accounts) { return }

    window.userWalletAddress = accounts[0]
    console.log(window.userWalletAddress);
    localStorage.setItem('accountMetaMask', accounts)
    loginMetamaskBtn()
}

function loginMetamaskBtn() {
    const getAccM = localStorage.getItem('accountMetaMask');
    window.userWalletAddress = getAccM;
    console.log(window.userWalletAddress);
    const mSplit = window.userWalletAddress.split('');
    const mNewAcc = `${mSplit.slice(0, 7)}...${mSplit[mSplit.length - 1]}`
    const acc = mNewAcc.split(',').join('');
    userWallet.innerText = acc
    userWallet.style.display = 'block';
    loginBtn.innerText = 'Sign out of MetaMask';
    fortmaticBtn.style.display = 'none';
    connectWallet.innerText = 'Sign out';
    connectWallet.style.marginRight = '20px';
    formM.style.display = 'flex';
    formT.style.display = 'flex';

    walletBalance.style.display = 'block';
    loginBtn.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        loginBtn.addEventListener('click', signOutOfMetaMask)
        modal.style.display = 'none';
        web3.eth.getBalance(getAccM)
        .then((e) => {
            walletBalance.innerText = `${e / 10 ** 18} ETH`
        });
        web3.eth.net.getNetworkType()
        .then((e) => {
            network.innerText = e
        });
    }, 200)
} 



function signOutOfMetaMask() {
    window.userWalletAddress = null;
    userWallet.innerText = '';
    userWallet.style.display = 'none';
    loginBtn.innerText = 'Login with MetaMask';
    fortmaticBtn.style.display = 'block';
    connectWallet.innerText = 'Connect Wallet';
    formM.style.display = 'none';
    formT.style.display = 'none';
    network.innerText = '';
    connectWallet.style.marginRight = '0'
    loginBtn.removeEventListener('click', signOutOfMetaMask)
    localStorage.removeItem('accountMetaMask')
    walletBalance.style.display = 'none';
    walletBalance.innerText = 'loading...';
    setTimeout(() => {
        loginBtn.addEventListener('click', loginWithMetaMask)
    }, 100)
}

// Fortmatic -------------------------------------------------

if(getAccFort !== null) {
    loginFormaticBtn()
} else if (getAccFort === null) {
    fortmaticBtn.addEventListener('click', loginWithFortmatic)
}

async function loginWithFortmatic() {
    fortmaticBtn.innerText = 'Initializing...';
    setTimeout(() => {
        fortmaticBtn.innerText = 'Login with Fortmatic';
    }, 1000)
    web3.currentProvider.enable();

    web3.eth.getAccounts((error, accounts) => {
        if(error) throw error;
        localStorage.setItem('accountFortmatic', accounts[0]);
        loginFormaticBtn()
    })
}

function loginFormaticBtn () {
    const getAccFortF = localStorage.getItem('accountFortmatic');
    fortmaticBtn.style.display = 'block';
    fortmaticBtn.innerText = 'Sign out of Fortmatic';
    loginBtn.style.display = 'none';
    connectWallet.innerText = 'Sign out';
    connectWallet.style.marginRight = '20px';
    const fSplit = getAccFortF.split('');
    const fNewAcc = `${fSplit.slice(0, 7)}...${fSplit[fSplit.length - 1]}`;
    const acc = fNewAcc.split(',').join('');
    userWallet.innerText = acc;
    userWallet.style.display = 'block';
    formF.style.display = 'flex';
    formT.style.display = 'flex';
    walletBalance.style.display = 'block';
    fortmaticBtn.removeEventListener('click', loginWithFortmatic)
    setTimeout(() => {
        fortmaticBtn.addEventListener('click', signOutOfFortmatic)
        modal.style.display = 'none';
        web3.eth.getBalance(getAccFortF)
        .then((e) => {
            walletBalance.innerText = `${e / 10 ** 18} ETH`
        });
        web3.eth.net.getNetworkType()
        .then((e) => {
            network.innerText = e
        });
    }, 200)
}

function signOutOfFortmatic() {
    window.userWalletAddress = null;
    userWallet.innerText = ''
    userWallet.style.display = 'none'
    fortmaticBtn.innerText = 'Login with Fortmatic';
    loginBtn.style.display = 'block';
    connectWallet.innerText = 'Connect Wallet';
    formF.style.display = 'none';
    formT.style.display = 'none';
    network.innerText = '';
    connectWallet.style.marginRight = '0';
    fortmaticBtn.removeEventListener('click', signOutOfFortmatic)
    localStorage.removeItem('accountFortmatic');
    walletBalance.style.display = 'none';
    walletBalance.innerText = 'loading...';
    setTimeout(() => {
        fortmaticBtn.addEventListener('click', loginWithFortmatic)
    }, 100)
} 


// Send MetaMask ----------------------------

async function sendTransitionMetaMask(e) {
    sendM.innerText = 'Initializing...';
    e.preventDefault();
    const balanceM = e.target.children[0].value;
    const balanceValue = (balanceM * 10 ** 18).toString(16);
    const address = e.target.children[1].value;
    const toAddress = `${address}`;
    ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: `${getAcc}`,
                    to: `${toAddress}`,
                    value: `${balanceValue}`,
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => {
            modalInfo.style.top = '20px'
            modalInfo.innerText = `${error.message}`
            setTimeout(() => {
                modalInfo.style.top = '-100px'
            }, 2000)
            setTimeout(() => {
                modalInfo.innerText = ``
            }, 2500)
        });
        await setTimeout(() => {
            sendM.innerText = 'Send'
        }, 200)
}

formM.addEventListener('submit', sendTransitionMetaMask)

//  Send Fortmatic --------------------------------------------

const modalInfo = document.getElementById('modalInfo');
const modalInfoText = document.getElementById('moadlInfoText');

async function sendTransitionFortmatic(e) {
    sendF.innerText = 'Initializing...';
    e.preventDefault();
    const balanceF = e.target.children[0].value;
    const balanceValue = (balanceF * 10 ** 18).toString(16);
    const address = e.target.children[1].value;
    const toAddress = `${address}`;
    if(toAddress.length < 42) {
        modalInfo.style.top = '20px'
                modalInfo.innerText = 'Invalid "to" address'
                sendF.innerText = 'Send';
                setTimeout(() => {
                    modalInfo.style.top = '-100px'
                }, 2000)
                setTimeout(() => {
                    modalInfo.innerText = ``
                }, 2500)
    }
    await web3.eth.getAccounts((error, accounts) => {
        if (error) throw error;
        console.log(accounts[0].length);
        const txnParams = {
            from: accounts[0],
            to: `${toAddress}`,
            value: `0x${balanceValue}`
        }

        web3.eth.sendTransaction(txnParams, (error) => {
            if (error) {
                modalInfo.style.top = '20px'
                modalInfo.innerText = `${error.message}`
                setTimeout(() => {
                    modalInfo.style.top = '-100px'
                }, 2000)
                setTimeout(() => {
                    modalInfo.innerText = ``
                }, 2500)
            };
        });
    });
    await setTimeout(() => {
        sendF.innerText = 'Send'
    }, 200)
}

formF.addEventListener('click', sendTransitionFortmatic)


const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{ "name": "", "type": "string" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_spender", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_from", "type": "address" },
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transferFrom",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "name": "", "type": "uint8" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{ "name": "", "type": "string" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        { "name": "_owner", "type": "address" },
        { "name": "_spender", "type": "address" }
      ],
      "name": "allowance",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    { "payable": true, "stateMutability": "payable", "type": "fallback" },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "owner", "type": "address" },
        { "indexed": true, "name": "spender", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "from", "type": "address" },
        { "indexed": true, "name": "to", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Transfer",
      "type": "event"
    }
]







// fortmatic -----------------------------
formT.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = (e.target.children[1].value);
    const tokenAddress = e.target.children[2].value;
    const to = e.target.children[3].value;
    const acc = () => {
        if(getAcc !== null){
            return getAcc
        } else if(getAccFort !== null) {
            return getAccFort
        }
    }
    const from = acc()
    
    if(getAcc !== null){
        const transactionParameters = {
            nonce: '0x00',
            to: to,
            from: from,
            value: `${(amount * 10 ** 18).toString(16)}`,
            data: tokenAddress,
            chainId: '0x3',
          };
          
          const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
      txHash()
    } else if(getAccFort !== null){
        sendToken(from, to, amount, tokenAddress)
    }
})


const sendToken = async (from, to, amount, tokenAddress) => {
    const contract = new web3.eth.Contract(abi, tokenAddress);
    const decimals = await contract.methods.decimals(). call();
    const unitAmount = amount * 10 **decimals
    return await contract.methods.transfer(to, unitAmount).send({
        from
    })
}