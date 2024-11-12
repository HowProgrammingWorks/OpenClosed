'use strict';

class PaymentService {
  constructor(type) {
    this.type = type;
  }

  processPayment(to, amount) {
    if (this.type === 'card') {
      console.log(`Card payment: ${amount} to ${to}`);
    } else if (this.type === 'paypal') {
      console.log(`Paypal payment: ${amount} to ${to}`);
    } else if (this.type === 'wire') {
      console.log(`Wire transfer: ${amount} to ${to}`);
    } else {
      throw new Error('Unsupported payment type');
    }
  }
}

// Usage

const bank = new PaymentService('card');
console.log(bank);
bank.processPayment('contractor', 1000);
