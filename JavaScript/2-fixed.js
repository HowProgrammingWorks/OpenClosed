'use strict';

class PaymentService {
  constructor(type) {
    this.type = type;
  }

  processPayment({ to, amount, check }, callback) {
    if (check) {
      if (typeof amount !== 'number') {
        const error = new Error('Amount expected to be number');
        return void callback(error);
      }
      if (amount <= 0) {
        const error = new Error('Amount should be greater than 0');
        return void callback(error);
      }
    }
    console.log(`Payment: ${amount} to ${to} by ${this.type}`);
    return void callback(null);
  }
}

class Bank extends PaymentService {
  constructor(type) {
    super(type);
    this.active = true;
  }

  processPayment({ to, amount, check = true }, callback) {
    if (this.active) {
      super.processPayment({ to, amount, check }, callback);
    } else {
      callback(new Error('Service is not active'));
    }
  }
}

// Usage

const bank = new Bank('wire');
console.log(bank);
bank.processPayment({ to: 'contractor', amount: 1000 }, (error) => {
  if (error) console.error(error);
  else console.log('Success!');
});
