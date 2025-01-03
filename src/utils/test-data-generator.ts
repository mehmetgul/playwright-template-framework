import { faker } from '@faker-js/faker';

export function generateOrderData() {
  const numItems = faker.number.int({ min: 1, max: 5 });
  const items = [];
  for (let i = 0; i < numItems; i++) {
    items.push({
      productId: faker.string.uuid(),
      productName: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: parseFloat(faker.commerce.price()),
    });
  }

  return {
    orderId: faker.string.uuid(),
    customer: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    },
    items: items,
    shippingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer']),
    orderDate: faker.date.past(),
    totalAmount: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  };
}

export function generateReviewData() {
    return {
      productId: faker.string.uuid(),
      reviewerName: faker.person.fullName(),
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.paragraph(),
      reviewDate: faker.date.past(),
    };
  }
  

// You can add more specialized data generation functions here as needed.