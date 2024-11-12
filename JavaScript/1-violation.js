'use strict';

class PaymentService {
  constructor(type) {
    this.type = type;
  }

  processPayment({ to, amount, check }, callback) {
    if (check) {
      if (typeof amount !== 'number') {
        callback(new Error('Amount expected to be number'));
      }
      if (amount <= 0) {
        callback(new Error('Amount should be greater than zero'));
      }
    }
    console.log(`Payment: ${amount} to ${to} by ${this.type}`);
    callback(null);
  }
}

class Bank extends PaymentService {
  constructor() {
    super();
    this.active = true;
  }

  async processPayment({ to, amount }) {
    const { promise, resolve, reject } = Promise.withResolvers();
    if (this.active) {
      super.processPayment({ to, amount }, resolve);
    } else {
      reject(new Error('Service is not active'));
    }
    return promise;
  }
}

// Usage

const service = new PaymentService('wire');
console.log(service);
service.processPayment(
  { to: 'contractor', amount: 1000, check: true },
  (error) => {
    if (error) console.error(error);
    else console.log('Success!\n');
  },
);

const bank = new Bank();
console.log(bank);
bank
  .processPayment({ to: 'contractor', amount: 1000, check: true })
  .catch((error) => {
    if (error) console.error(error);
    else console.log('Success!');
  });
