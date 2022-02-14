// Modal -----------------------------------------
const signBtn  = document.getElementById('signUp');
const signOut  = document.getElementById('signOut');
const modal    = document.getElementById('close');
const closeBtn = document.getElementById('closeBtn');

signBtn.addEventListener('click', () => {
    modal.style.display = 'block'
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
});





// ID -------------------------------------------
const network           = document.getElementById('network'); 
const userBalance       = document.getElementById('userBalance');
const userAccount       = document.getElementById('userAccount');
const btnSignFort       = document.getElementById('btnSignFort');
const btnSignMeta       = document.getElementById('btnSignMeta');
const metamask          = document.getElementById('metamask');
const fortmatic         = document.getElementById('fortmatic');
const sendMeta          = document.getElementById('sendMeta');
const sendFort          = document.getElementById('sendFort');
const transactionMeta   = document.getElementById('transactionMeta');
const transactionFort   = document.getElementById('transactionFort');
const sendTokenBtnMeta  = document.getElementById('sendTokenBtnMeta');
const sendTokenBtnFort  = document.getElementById('sendTokenBtnFort');
const sendTokenMeta     = document.getElementById('sendTokenMeta'); 
const sendTokenFort     = document.getElementById('sendTokenFort'); 

// localStorage -------------------
const getAccountsMeta = localStorage.getItem('accountMeta');
const getAccountsFort = localStorage.getItem('accountFort');

// Login Metamask --------------------------------
    if(getAccountsMeta !== null){
        loginMetamask()
    } else if(getAccountsMeta === null){
        btnSignMeta.addEventListener('click', loginWithMetaMask)
    }
    
    async function loginWithMetaMask(){
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        .catch((e) => {
            console.error(e.message)
            return
        });
        if(!accounts) {return};
        localStorage.setItem('accountMeta', accounts);
        loginMetamask()
    }
    
    function loginMetamask() {
        let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        let accounts = localStorage.getItem('accountMeta');
        userAccount.style.display = 'block';
        userBalance.style.display = 'block';
        const accountsSplit = accounts.split('');
        const accountSlice = `${accountsSplit.slice(0, 7)}...${accountsSplit[accountsSplit.length - 1]}`;
        userAccount.innerText = `${accountSlice.split(',').join('')}`;
        metamask.style.display = 'block';
        signBtn.style.display = 'none';
        signOut.style.display = 'block';
        network.style.display = 'block';
        setTimeout(() => {
            signOut.addEventListener('click', signOutOfWallet);
            modal.style.display = 'none';
            web3.eth.getBalance(accounts)
            .then(e => {
                userBalance.innerText = `${e / 10 ** 18} ETH`
            });
            web3.eth.net.getNetworkType().then(e => {
                network.innerText = e;
            });
        }, 200);
    }

// send Transaction ---------------------- 

async function sendTransitionMetaMask(e) {
    sendMeta.innerText = 'Initializing...';
    e.preventDefault();
    const balanceMeta = e.target.children[1].value;
    const balanceValue = (balanceMeta * 10 ** 18).toString(16);
    const address = e.target.children[2].value;
    const toAddress = address;
    ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: `${getAccountsMeta}`,
                    to: `${toAddress}`,
                    value: `${balanceValue}`,
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => {
            e.target.children[2].value = `${error.message}`
        });
        await setTimeout(() => {
            sendMeta.innerText = 'Send'
        }, 200)
}

transactionMeta.addEventListener('submit', sendTransitionMetaMask);

// ERC20 ------------------------------
const abiErc = [
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

//  Send Token Metamask --------------------------------------
sendTokenMeta.addEventListener('submit', async (e) => {
    e.preventDefault();
    let amount = (e.target.children[1].value);
    let tokenAddress = e.target.children[2].value;
    let to = e.target.children[3].value;
    let from = getAccountsMeta;
    sendTokenBtnMeta.innerText = 'Initializing...';
    sendTokenM(from, to, amount, tokenAddress);
})


const sendTokenM = async (from, to, amount, tokenAddress) => {
    let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    let contract = new web3.eth.Contract(abiErc, tokenAddress);
    let decimals = await contract.methods.decimals(). call();
    let unitAmount = amount * 10 **decimals;
    sendTokenBtnMeta.innerText = 'Send';
    return await contract.methods.transfer(to, unitAmount).send({
        from
    });
}
// Login Fortmatic ----------------------------

let apiKey = 'pk_test_F7F84FB9AF538E92'
let fm = new Fortmatic(apiKey);
window.web3 = new Web3(fm.getProvider());

if(getAccountsFort !== null){
    loginFortmatic()
}else if(getAccountsFort === null) {
    btnSignFort.addEventListener('click', loginWithFortmatic)
}

async function loginWithFortmatic() {
    btnSignFort.innerText = 'Initializing...';
    setTimeout(() => {
        btnSignFort.innerText = 'Fortmatic';
    }, 2000)
    web3.currentProvider.enable();

    web3.eth.getAccounts((error, accounts) => {
        if(error) throw error;
        localStorage.setItem('accountFort', accounts[0]);
        loginFortmatic()
    })
}

function loginFortmatic() {
    let accountsFort = localStorage.getItem('accountFort');
    userAccount.style.display = 'block';
    userBalance.style.display = 'block';
    const accountsSplit = accountsFort.split('');
    const accountSlice = `${accountsSplit.slice(0, 7)}...${accountsSplit[accountsSplit.length - 1]}`;
    userAccount.innerText = `${accountSlice.split(',').join('')}`;
    fortmatic.style.display = 'block';
    signBtn.style.display = 'none';
    signOut.style.display = 'block';
    network.style.display = 'block';
    setTimeout(() => {
        signOut.addEventListener('click', signOutOfWallet);
        modal.style.display = 'none';
        web3.eth.getBalance(accountsFort)
        .then(e => {
            userBalance.innerText = `${e / 10 ** 18} ETH`
        });
        web3.eth.net.getNetworkType().then(e => {
            network.innerText = e;
        });
    }, 200);
}

// send Transaction ---------------------- 

async function sendTransitionFortmatic(e) {
    sendFort.innerText = 'Initializing...';
    e.preventDefault();
    const balanceFort = e.target.children[1].value;
    const balanceValue = (balanceFort * 10 ** 18).toString(16);
    const address = e.target.children[2].value;
    const toAddress = `${address}`;
    if(toAddress.length < 42) {
        e.target.children[2].value = 'Invalid "to" address';
        sendFort.innerText = 'Send';
    }
    await web3.eth.getAccounts((error, accounts) => {
        if (error) throw error;
        const txnParams = {
            from: accounts[0],
            to: `${toAddress}`,
            value: `0x${balanceValue}`
        }

        web3.eth.sendTransaction(txnParams, (error) => {
            if (error) {
                e.target.children[2].value = `${error.message}`;
            };
        });
    });
    await setTimeout(() => {
        sendFort.innerText = 'Send'
    }, 200)
}
    
transactionFort.addEventListener('submit', sendTransitionFortmatic)
    
//  Send Token Fortmatic --------------------------------------

sendTokenFort.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = (e.target.children[1].value);
    const tokenAddress = e.target.children[2].value;
    const to = e.target.children[3].value;
    const from = getAccountsFort;
    sendTokenF(from, to, amount, tokenAddress);
    sendTokenBtnFort.innerText = 'Initializing...';
})


const sendTokenF = async (from, to, amount, tokenAddress) => {
    const contract = new web3.eth.Contract(abiErc, tokenAddress);
    const decimals = await contract.methods.decimals(). call();
    const unitAmount = amount * 10 **decimals;
    sendTokenBtnFort.innerText = 'Send';
    return await contract.methods.transfer(to, unitAmount).send({
        from
    })
}

// sign Out 

function signOutOfWallet() {
        userAccount.style.display = 'none';
        userBalance.style.display = 'none';
        metamask.style.display = 'none';
        fortmatic.style.display = 'none';
        signBtn.style.display = 'block';
        signOut.style.display = 'none';
        userAccount.style.display = 'none';
        network.style.display = 'none';
        network.innerText = '......';
        localStorage.removeItem('accountMeta');
        localStorage.removeItem('accountFort');
};