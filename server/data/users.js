const users = [
  {
    id: 1,
    first_name: 'Sam',
    last_name: 'Smith',
    email: 'samsmith@gmail.com',
    phone_number: '0784446352',
    address: 'Kigali',
    password: '$2a$10$NDpN.Uiy83CNOb1gfnHM6eOQCCn06kmDTx08xgA3hF7Im0YADCCm.',
    is_admin: false,
    is_blacklisted: false
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith@gmail.com',
    phone_number: '0788888888',
    address: 'kigali',
    password: '$2a$10$dWNDA8uMJ44JULH2uHOib.kjkbEH/L8titKet6M9igLNEX9QxWWum',
    is_admin: true,
    is_blacklisted: false
  }
];

module.exports = users;
