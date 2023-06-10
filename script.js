fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(data => {
        const coinsData = data.data;

        // BTC
        const btcData = coinsData.find(coin => coin.symbol === 'BTC');
        if (btcData) {
            document.getElementById('btc__price').textContent = btcData.price_usd;
            document.getElementById('btc__percent').textContent = btcData.percent_change_24h;
        }

        // ETH
        const ethData = coinsData.find(coin => coin.symbol === 'ETH');
        if (ethData) {
            document.getElementById('eth__price').textContent = ethData.price_usd;
            document.getElementById('eth__percent').textContent = ethData.percent_change_24h;
        }

        // XRP
        const xrpData = coinsData.find(coin => coin.symbol === 'XRP');
        if (xrpData) {
            document.getElementById('xrp__price').textContent = xrpData.price_usd;
            document.getElementById('xrp__percent').textContent = xrpData.percent_change_24h;
        }

        // LTC
        const ltcData = coinsData.find(coin => coin.symbol === 'LTC');
        if (ltcData) {
            document.getElementById('ltc__price').textContent = ltcData.price_usd;
            document.getElementById('ltc__percent').textContent = ltcData.percent_change_24h;
        }

        // BCH
        const bchData = coinsData.find(coin => coin.symbol === 'BCH');
        if (bchData) {
            document.getElementById('bch__price').textContent = bchData.price_usd;
            document.getElementById('bch__percent').textContent = bchData.percent_change_24h;
        }

        const coinsList = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH'];

        coinsData.forEach(coin => {
            if (coinsList.includes(coin.symbol)) {
                const { symbol, percent_change_24h } = coin;
                const percentDiv = document.getElementById(symbol.toLowerCase()).querySelector(".crypto__percent");
                if (percentDiv && parseFloat(percent_change_24h) < 0) {
                    percentDiv.classList.add('crypto__percent--negative');
                }
            }
        });
    })
    .catch(error => console.error(error));


const emailInput = document.getElementById('email');
const emailMessages = document.querySelector('input#email ~ .field__messages');
const passwordInput = document.getElementById('password');
const passwordRequirements = document.querySelectorAll('input#password ~ .field__messages li');

document.getElementById('email').addEventListener('input', function () {
    if (emailInput.validity.valueMissing) {
        emailMessages.classList.add('field__messages--hidden');
        emailInput.classList.remove('valid');
        emailInput.classList.remove('invalid');
    } else if (emailInput.validity.typeMismatch) {
        emailMessages.classList.remove('field__messages--hidden');
        emailMessages.classList.add('invalid');
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
    } else {
        emailMessages.classList.remove('invalid');
        emailMessages.classList.add('field__messages--hidden');
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }

    allValid();
});

passwordInput.addEventListener('keyup', function () {
    const passwordValue = passwordInput.value;

    if (passwordInput.validity.valueMissing) {
        resetRequirements();
    }

    passwordRequirements.forEach(function (requirement) {
        const requirementId = requirement.id;

        if (checkRequirement(requirementId, passwordValue)) {
            requirement.classList.remove('invalid');
            requirement.classList.add('valid');
        } else {
            requirement.classList.remove('valid');
            requirement.classList.add('invalid');
        }
    });

    if (areAllRequirementsMet()) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    } else {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    }

    allValid();
});

function resetRequirements() {
    passwordRequirements.forEach(function (requirement) {
        requirement.classList.remove('valid');
        requirement.classList.remove('invalid');
    });
}

function checkRequirement(requirementId, passwordValue) {
    if (requirementId === '8-5') {
        return passwordValue.length >= 8 && passwordValue.length <= 15;
    } else if (requirementId === '1-or-more-numbers') {
        return /\d/.test(passwordValue);
    } else if (requirementId === '1-or-more-lowercase') {
        return /[a-z]/.test(passwordValue);
    } else if (requirementId === '1-or-more-uppercase') {
        return /[A-Z]/.test(passwordValue);
    } else if (requirementId === '1-or-more-special') {
        return /[#\[\]()@$&*!?|,.^/\+_-]/.test(passwordValue);
    }

    return false;
}

function areAllRequirementsMet() {
    let allRequirementsMet = true;

    passwordRequirements.forEach(function (requirement) {
        if (!requirement.classList.contains('valid')) {
            allRequirementsMet = false;
        }
    });

    return allRequirementsMet;
}

const formButton = document.querySelector('.form__button button[type="button"]');

function allValid() {
    if (emailInput.classList.contains('valid') && passwordInput.classList.contains('valid')) {
        formButton.disabled = false;
    } else {
        formButton.disabled = true;
    }
}

formButton.addEventListener("click", function () {
    document.querySelector('.form__success').classList.remove('form__success--hidden');
});

jQuery = $;

$('#events__carousel').slick({
    infinite: true,
    arrows: true,
    prevArrow: '<span class="prev"><i class="fa-solid fa-chevron-left"></i></span>',
    nextArrow: '<span class="next"><i class="fa-solid fa-chevron-right"></i></span>',
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
    ]
});