import { gql } from 'graphql-request';

// Session management
export const checkTokenValidity = gql`
    query checkTokenValidity {
        session {
            accountId
        }
    }
`;

// Products
// There are more products queries here
// https://developers.swell.is/frontend-api/products
export const getAllProducts = gql`
    query getAllProducts {
        products(limit: 25, page: 1) {
            results {
                id
                name
                slug
                price
                currency
                categories {
                    name
                }
                images {
                    caption
                    file {
                        url
                        width
                        height
                    }
                }
                options {
                    id
                    attributeId
                    name
                    inputType
                    active
                    required
                    variant
                    values {
                        id
                        name
                        price
                        description
                    }
                }
            }
        }
    }
`;

export const getProductsByCategory = gql`
    query getProductsByCategory($category: String!) {
        getProductsByCategory(slug: $category) {
            usd: products(_currency: "USD") {
                id
                name
                price
                currency
                categories {
                    name
                }
            }
        }
    }
`;

export const getProductById = gql`
    query getProductById($id: String!) {
        productById(id: $id, _currency: "USD") {
            id
            name
            slug
            price
            currency
            categories {
                name
            }
        }
    }
`;

export const searchProducts = gql`
    query searchProducts($query: String!) {
        products(search: $query, limit: 25, page: 1) {
            results {
                id
                name
                currency
                slug
                price
                categories {
                    name
                }
            }
        }
    }
`;

// Categories
export const getAllCategories = gql`
    query getCategories {
        categories(limit: 10, page: 1) {
            results {
                name
            }
        }
    }
`;

// Cart
export const getCart = gql`
    query getCart {
        cart {
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
                }
            }
        }
    }
`;

// Orders
export const getOrderDetails = gql`
    query {
        cart {
            dateCreated
            checkoutId
            orderId
            accountId
            account {
                name
                email
                group
            }
            items {
                product {
                    id
                    name
                    price
                }
                quantity
                price
            }
            grandTotal
            taxTotal
            discountTotal
        }
    }
`;
