'use strict';

class PaymentService {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  processPayment(to, amount) {
    this.paymentProcessor.pay(to, amount);
  }
}

class WireTransfer {
  type = 'wire';

  pay(to, amount) {
    console.log('Wire transfer');
    console.log(`${amount} to ${to} by ${this.type}`);
  }
}

// Usage

const processor = new WireTransfer();
const bank = new PaymentService(processor);
console.log(bank);
bank.processPayment('contractor', 1000);
