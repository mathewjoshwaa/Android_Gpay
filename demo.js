const canMakePaymentCache = 'canMakePaymentCache';

async function checkCanMakePayment(request) {
    if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
        return JSON.parse(sessionStorage[canMakePaymentCache]);
    }

    try {
        const result = request.canMakePayment ? await request.canMakePayment() : true;

        sessionStorage[canMakePaymentCache] = JSON.stringify(result);
        return result;
    } catch (err) {
        console.log('Error calling canMakePayment: ' + err);
        throw err;
    }
}

function onBuyClicked() {
    if (!window.PaymentRequest) {
        console.log('Web payments are not supported in this browser.');
        return;
    }

    const supportedInstruments = [
        {
            supportedMethods: ['https://tez.google.com/pay'],
            data: {
                pa: 'vaseegrahveda@kvb',
                pn: 'Vaseegrah Veda',
                tr: '14095501839116',
                url: 'https://google.com',
                mc: '5799',
                tn: 'Purchase in Merchant',
                originatingPlatform: 'IOS_APP',
            },
        }
    ];

    const details = {
        total: {
            label: 'Total',
            amount: {
                currency: 'INR',
                value: '10.01',
            },
        },
        displayItems: [{
            label: 'Original Amount',
            amount: {
                currency: 'INR',
                value: '10.01',
            },
        }],
    };

    let request = null;
    try {
        request = new PaymentRequest(supportedInstruments, details);
    } catch (e) {
        console.log('Payment Request Error: ' + e.message);
        return;
    }
    if (!request) {
        console.log('Web payments are not supported in this browser.');
        return;
    }

    checkCanMakePayment(request)
        .then((result) => {
            showPaymentUI(request, result);
        })
        .catch((err) => {
            console.log('Error calling checkCanMakePayment: ' + err);
        });
}

function showPaymentUI(request, canMakePayment) {
    if (!canMakePayment) {
        handleNotReadyToPay();
        return;
    }

    let paymentTimeout = window.setTimeout(function () {
        window.clearTimeout(paymentTimeout);
        request.abort()
            .then(function () {
                console.log('Payment timed out after 20 minutes.');
            })
            .catch(function () {
                console.log('Unable to abort, user is in the process of paying.');
            });
    }, 20 * 60 * 1000);

    request.show()
        .then(function (instrument) {
            window.clearTimeout(paymentTimeout);
            processResponse(instrument);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function handleNotReadyToPay() {
    alert('Google Pay is not ready to pay.');
}

function processResponse(instrument) {
    var instrumentString = instrumentToJsonString(instrument);
    console.log(instrumentString);

    fetch('/buy', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: instrumentString,
    })
        .then(function (buyResult) {
            if (buyResult.ok) {
                return buyResult.json();
            }
            console.log('Error sending instrument to server.');
        })
        .then(function (buyResultJson) {
            completePayment(instrument, buyResultJson.status, buyResultJson.message);
        })
        .catch(function (err) {
            console.log('Unable to process payment. ' + err);
        });
}

function completePayment(instrument, result, msg) {
    instrument.complete(result)
        .then(function () {
            console.log('Payment succeeds.');
            console.log(msg);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function instrumentToJsonString(paymentResponse) {
    var paymentResponseDictionary = {
        methodName: paymentResponse.methodName,
        details: paymentResponse.details,
        shippingAddress: addressToJsonString(paymentResponse.shippingAddress),
        shippingOption: paymentResponse.shippingOption,
        payerName: paymentResponse.payerName,
        payerPhone: paymentResponse.payerPhone,
        payerEmail: paymentResponse.payerEmail,
    };
    return JSON.stringify(paymentResponseDictionary, undefined, 2);
}

// Provided code snippet
async function initiateMerchantPayment() {
    const requestData = {
        "merchantInfo": {
            "googleMerchantId": "BCR2DN6TWO37HOR3"
        },
        "userInfo": {
            "phoneNumber": "+919597667724"
        },
        "merchantTransactionDetails": {
            "transactionId": "1284ASSP",
            "amountPayable": {
                "currencyCode": "INR",
                "units": 10,
                "nanos": 0
            },
            "description": "Sample description",
            "upiPaymentDetails": {
                "vpa": "vaseegrahveda@kvb"
            },
            "gst": {
                "gstin": "33BJEPV2043L1Z3",
                "gstBreakUp": {
                    "gst": {
                        "currencyCode": "INR",
                        "units": 5,
                        "nanos": 0
                    },
                    "cgst": {
                        "currencyCode": "INR",
                        "units": 4,
                        "nanos": 0
                    },
                    "sgst": {
                        "currencyCode": "INR",
                        "units": 3,
                        "nanos": 0
                    },
                    "igst": {
                        "currencyCode": "INR",
                        "units": 1,
                        "nanos": 0
                    },
                    "cess": {
                        "currencyCode": "INR",
                        "units": 1,
                        "nanos": 0
                    }
                }
            },
            "invoice": {
                "invoiceNumber": "Invoice456",
                "invoiceTime": "2017-02-15T10:50:30Z"
            }
        },
        "expiryTime": "2017-02-15T10:50:30Z",
        "originatingPlatform": "IOS_APP"
    };

    fetch('https://nbupayments.googleapis.com/v1/merchantPayments:initiate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

