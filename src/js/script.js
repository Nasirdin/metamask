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

if(getAcc !== null) {
    function loginMetamaskBtn() {
        window.userWalletAddress = getAcc;
        const mSplit = window.userWalletAddress.split('');
        const mNewAcc = `${mSplit[0] + mSplit[1] + mSplit[2] + mSplit[3] + mSplit[4] + mSplit[5] + mSplit[6]}...${mSplit[mSplit.length - 1]}`
        userWallet.innerText = mNewAcc
        userWallet.style.display = 'block';
        loginBtn.innerText = 'Sign out of MetaMask';
        fortmaticBtn.style.display = 'none';
        connectWallet.innerText = 'Sign out';
        connectWallet.style.marginRight = '20px'
        formM.style.display = 'flex';
        loginBtn.removeEventListener('click', loginWithMetaMask)
        setTimeout(() => {
            loginBtn.addEventListener('click', signOutOfMetaMask)
        }, 200)
    }

    window.addEventListener('DOMContentLoaded', () => {
        loginMetamaskBtn()
    })
}

if(getAcc === null){
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
    const mSplit = window.userWalletAddress.split('');
    const mNewAcc = `${mSplit[0] + mSplit[1] + mSplit[2] + mSplit[3] + mSplit[4] + mSplit[5] + mSplit[6]}...${mSplit[mSplit.length - 1]}`
    userWallet.innerText = mNewAcc;
    userWallet.style.display = 'block';
    loginBtn.innerText = 'Sign out of MetaMask';
    fortmaticBtn.style.display = 'none';
    connectWallet.innerText = 'Sign out';
    connectWallet.style.marginRight = '20px'
    formM.style.display = 'flex';
    loginBtn.removeEventListener('click', loginWithMetaMask);
    setTimeout(() => {
        loginBtn.addEventListener('click', signOutOfMetaMask);
        modal.style.display = 'none';
        localStorage.setItem('accountMetaMask', accounts)
        location.reload()
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
    loginBtn.removeEventListener('click', signOutOfMetaMask)
    localStorage.removeItem('accountMetaMask')
    setTimeout(() => {
        loginBtn.addEventListener('click', loginWithMetaMask)
    }, 100)
}

// Fortmatic -------------------------------------------------
const apiKey = 'pk_test_F7F84FB9AF538E92'
const fm = new Fortmatic(apiKey);
window.web3 = new Web3(fm.getProvider());
function loginFormaticBtn () {
    fortmaticBtn.addEventListener('click', loginWithFortmatic)
}

if(getAccFort !== null) {
    fortmaticBtn.style.display = 'block';
    fortmaticBtn.innerText = 'Sign out of Fortmatic';
    loginBtn.style.display = 'none';
    connectWallet.innerText = 'Sign out'
    connectWallet.style.marginRight = '20px'
    const fSplit = getAccFort.split('');
    const fNewAcc = `${fSplit[0] + fSplit[1] + fSplit[2] + fSplit[3] + fSplit[4] + fSplit[5] + fSplit[6]}...${fSplit[fSplit.length - 1]}`
    userWallet.innerText = `${fNewAcc}`;
    userWallet.style.display = 'block';
    formF.style.display = 'flex';
    fortmaticBtn.removeEventListener('click', loginWithFortmatic)
    setTimeout(() => {
        fortmaticBtn.addEventListener('click', signOutOfFortmatic)
    }, 200)
}

async function loginWithFortmatic() {
    fortmaticBtn.innerText = 'Initializing...';
    setTimeout(() => {
        fortmaticBtn.innerText = 'Login with Fortmatic';
    }, 1000)
    web3.currentProvider.enable();

    web3.eth.getAccounts((error, accounts) => {
        if(error) throw error;
        fortmaticBtn.style.display = 'block';
        fortmaticBtn.innerText = 'Sign out of Fortmatic';
        loginBtn.style.display = 'none';
        connectWallet.innerText = 'Sign out';
        connectWallet.style.marginRight = '20px'
        const fSplit = accounts[0].split('');
        const fNewAcc = `${fSplit[0] + fSplit[1] + fSplit[2] + fSplit[3] + fSplit[4] + fSplit[5] + fSplit[6]}...${fSplit[fSplit.length - 1]}`
        userWallet.innerText = `${fNewAcc}`;
        userWallet.style.display = 'block'
        formF.style.display = 'flex';
        fortmaticBtn.removeEventListener('click', loginWithFortmatic);
        setTimeout(() => {
            fortmaticBtn.addEventListener('click', signOutOfFortmatic);
            modal.style.display = 'none';
            localStorage.setItem('accountFortmatic', accounts[0]);
            location.reload()
        }, 200)
    })
}

function signOutOfFortmatic() {
    window.userWalletAddress = null;
    userWallet.innerText = ''
    userWallet.style.display = 'none'
    fortmaticBtn.innerText = 'Login with Fortmatic';
    loginBtn.style.display = 'block';
    connectWallet.innerText = 'Connect Wallet';
    formF.style.display = 'none';
    fortmaticBtn.removeEventListener('click', signOutOfFortmatic)
    localStorage.removeItem('accountFortmatic');
    setTimeout(() => {
        fortmaticBtn.addEventListener('click', loginWithFortmatic)
    }, 100)
} 

window.addEventListener('DOMContentLoaded', () => {
    loginFormaticBtn()
})



// Send MetaMask ----------------------------

// const balanceM = document.getElementById('balanceM');
// const balanceValue = balanceM.target.value;
// console.log(balanceValue);

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

formF.addEventListener('submit', sendTransitionFortmatic)