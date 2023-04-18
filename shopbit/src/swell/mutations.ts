import { gql } from 'graphql-request';

// Account
export const createAccount = gql`
  mutation createAccount($firstName: String!, $email: String!, $password: String!, $emailOptin: Boolean) {
    createAccount(firstName: $firstName, email: $email, password: $password, emailOptin: $emailOptin }
    ) {
      firstName
      email
      emailOptin
    }
  }
`;

export const login = gql`
    mutation login($email: String!, $password: String!) {
        loginAccount(email: $email, password: $password) {
            __typename
           

        }
    }
`;

export const logout = gql`
    mutation logout {
        logoutAccount {
            success
        }
    }
`;

// password reset url not ready
// set up heroku server before using
export const sendAccountRecovery = gql`
    mutation sendAccountRecovery($email: String!, $passwordResetUrl: String!) {
        sendAccountRecovery(
            email: $email
            passwordResetUrl: "https://example.com/password-reset?key={reset_key}"
        ) {
            success
        }
    }
`;

// Password reset key is obtained from sendAccountRecovery email
export const recoverAccount = gql`
    mutation recoverAccount($password: String!, $passwordResetKey: String!) {
        recoverAccount(password: $password, passwordResetKey: $passwordResetKey) {
            success
        }
    }
`;

// Cart
export const addToCart = gql`
    mutation addToCart($productId: String!, $quantity: Number!, $name: String!, $value: String) {
        addCartItem(
            input: {
                productId: $productId
                quantity: $quantity
                options: { name: $name, value: $value }
            }
        ) {
            checkoutUrl
            grandTotal
            items {
                id
                quantity
                price
                discountTotal
                taxTotal
                product {
                    id
                    name
                    currency
                    options {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const updateCartItem = gql`
    mutation updateCartItem($itemId: String!, $quantity: Number!) {
        updateCartItem(itemId: $itemId, input: { quantity: $quantity }) {
            checkoutUrl
            grandTotal
            items {
                id
                quantity
                price
                discountTotal
                taxTotal
                product {
                    id
                    name
                    currency
                    options {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const removeCartItem = gql`
    mutation removeCartItem($itemId: String!) {
        deleteCartItem(itemId: $itemId) {
            checkoutUrl
            grandTotal
            items {
                id
                quantity
                price
                discountTotal
                taxTotal
                product {
                    id
                    name
                    currency
                    options {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const updateCartBilling = gql`
    mutation updateCartBilling(
        $name: String!
        $address1: String!
        $city: String!
        $state: String!
        $zip: String!
        $country: String!
        $phone: String
        $token: String!
    ) {
        updateCart(
            input: {
                billing: {
                    name: $name
                    address1: $address1
                    city: $city
                    state: $state
                    zip: $zip
                    country: $country
                    phone: $phone
                    card: { token: $token }
                }
            }
        ) {
            billing {
                name
                address1
                city
                state
                zip
                country
                phone
                card {
                    token
                }
            }
        }
    }
`;

export const updateCartShipping = gql`
    mutation updateCartShipping($name: String!, $city: String!, $state: String!, $zip: String!) {
        updateCart(input: { shipping: { name: $name, city: $city, state: $state, zip: $zip } }) {
            shipping {
                name
                city
            }
        }
    }
`;

// Orders
export const submitCartOrder = gql`
    mutation {
        submitCartOrder {
            id
            accountId
            items {
                product {
                    id
                    name
                    price
                }
                quantity
                taxTotal
                priceTotal
                discountTotal
            }
        }
    }
`;
