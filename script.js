//  MetaMask ----------------------------
        
window.userWalletAddress = null;

const loginBtn = document.getElementById('loginBtn');
const fortmaticBtn = document.getElementById('fortmaticBtn');
const userWallet = document.getElementById('userWallet')
const getAcc = localStorage.getItem('accountMetaMask')
const getAccFort = localStorage.getItem('accountFortmatic')


if(!window.ethereum) {
    loginBtn.innerText = 'MetaMask in not installed';
    loginBtn.style.background = "#999999";
    loginBtn.style.color = '#fff';
    return false
}

if(getAcc !== null) {
    function loginMetamaskBtn() {
    
        window.userWalletAddress = getAcc;
        userWallet.innerText = window.userWalletAddress
        loginBtn.innerText = 'Sign out of MetaMask';
        fortmaticBtn.style.display = 'none';
    
        loginBtn.removeEventListener('click', loginWithMetaMask)
        setTimeout(() => {
            loginBtn.addEventListener('click', signOutOfMetaMask)
        }, 200)
    }
    loginMetamaskBtn()
}

if(getAcc === null){
    loginBtn.addEventListener('click', loginWithMetaMask)
}
async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
        console.error(e.message)
        return
    })
    if(!accounts) { return }
    localStorage.setItem('accountMetaMask', accounts)

    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginBtn.innerText = 'Sign out of MetaMask';
    fortmaticBtn.style.display = 'none';

    loginBtn.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        loginBtn.addEventListener('click', signOutOfMetaMask)
    }, 200)
}

function signOutOfMetaMask() {
    window.userWalletAddress = null;
    userWallet.innerText = '';
    loginBtn.innerText = 'Login with MetaMask';
    fortmaticBtn.style.display = 'block';
    localStorage.removeItem('accountMetaMask')
    loginBtn.removeEventListener('click', signOutOfMetaMask)
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
    userWallet.innerText = `${getAccFort}`;
    fortmaticBtn.removeEventListener('click', loginWithFortmatic)
        setTimeout(() => {
            fortmaticBtn.addEventListener('click', signOutOfFortmatic)
        }, 200)
}

async function loginWithFortmatic() {
    fortmaticBtn.innerText = 'Initializing...';
    
    web3.currentProvider.enable();

    web3.eth.getAccounts((error, accounts) => {
        if(error) throw error;
        fortmaticBtn.style.display = 'block';
        fortmaticBtn.innerText = 'Sign out of Fortmatic';
        loginBtn.style.display = 'none';
        userWallet.innerText = `${accounts[0]}`;
        localStorage.setItem('accountFortmatic', accounts[0]);

        fortmaticBtn.removeEventListener('click', loginWithFortmatic)
        setTimeout(() => {
            fortmaticBtn.addEventListener('click', signOutOfFortmatic)
        }, 200)
    })
}

function signOutOfFortmatic() {
    window.userWalletAddress = null;
    userWallet.innerText = ''
    fortmaticBtn.innerText = 'Login with Fortmatic';
    loginBtn.style.display = 'block';
    localStorage.removeItem('accountFortmatic')

    fortmaticBtn.removeEventListener('click', signOutOfFortmatic)
    setTimeout(() => {
        fortmaticBtn.addEventListener('click', loginWithFortmatic)
    }, 100)
} 

window.addEventListener('DOMContentLoaded', () => {
    loginMetamaskBtn()
    loginFormaticBtn()
})