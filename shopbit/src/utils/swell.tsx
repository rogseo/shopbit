// require('dotenv').config();

// const swell = require('swell-node').init(process.env.STORE_ID, process.env.SECRET_KEY);

// module.exports = swell;

// SwellService = {
//     // Query
//     getAccount: async (req:Object) => {
//         const response = await swell.get(`/accounts/${req.id}`);
//         return response;
//     },
//     getAllAccounts: async (req) => {
//         // Modify options to filter accounts
//         const response = await swell.get('/accounts', {
//             // Options here
//         });
//     },

//     // Mutation
//     createAccount: async (req) => {
//         // More arguments are available for this request
//         const response = await swell.post('/accounts', {
//             email: req.email,
//             first_name: req.firstName,
//             last_name: req.lastName,
//         });
//         return response;
//     },
//     updateAccount: async (req) => {
//         // More arguments are available for this request
//         const response = await swell.put(`/accounts/${req.id}`, {
//             email: req.email,
//             email_optin: req.emailOptin,
//             first_name: req.firstName,
//             last_name: req.lastName,
//         });
//         return response;
//     },
//     updateShipping: async (req) => {
//         const response = await swell.put(`/accounts/${req.id}`, {
//             // I might need to update this so that it will still work
//             // when some fields are undefined.
//             shipping: {
//                 address1: req.address1,
//                 address2: req.address2,
//                 city: req.city,
//                 country: req.country,
//                 first_name: req.firstName,
//                 last_name: req.lastName,
//                 phone: req.phone,
//                 state: req.state,
//                 zip: req.zip,
//             },
//         });
//         return response;
//     },
//     deleteAccount: async (req) => {
//         const response = await swell.delete(`/accounts/${req.id}`, {
//             id: req.id,
//         });
//         return response;
//     },

//     // Close Swell Server
//     close: () => {
//         swell.close();
//     },
// };
