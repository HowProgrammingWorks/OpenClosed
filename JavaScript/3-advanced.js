'use strict';

class PaymentService {
  constructor(type, active) {
    this.type = type;
    this.active = active;
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
    super(type, true);
  }

  processPayment({ to, amount, check = true }, callback) {
    if (this.active) {
      super.processPayment({ to, amount, check }, callback);
    } else {
      callback(new Error('Service is not active'));
    }
  }

  async pay(options) {
    const { promise, resolve, reject } = Promise.withResolvers();
    super.processPayment(options, (error) => {
      if (error) reject(error);
      else resolve();
    });
    return promise;
  }
}

// Usage

const main = async () => {
  const bank = new Bank('wire');
  console.log(bank);
  try {
    await bank.pay({ to: 'contractor', amount: 1000 });
    console.log('Success!');
  } catch (error) {
    console.error(error);
  }
};

main();
