'use strict';

class PaymentService {
  processPayment(to, amount) {
    const data = { instance: this, payment: { to, amount } };
    throw new Error('Abstract method: ' + JSON.stringify(data));
  }
}

class Paypal extends PaymentService {
  type = 'paypal';

  processPayment(to, amount) {
    console.log('Paypal payment:');
    console.log(`${amount} to ${to} by ${this.type}`);
  }
}

// Usage

const paypal = new Paypal();
console.log(paypal);
paypal.processPayment('contractor', 1000);
