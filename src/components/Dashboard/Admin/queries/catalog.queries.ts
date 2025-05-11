// =====================
// SERVICES
// =====================

export const ALL_SERVICES_QUERY = `
    query AllServices {
        services {
            id
            name
            description
            price
        }
    }
`;

export const SERVICE_BY_ID_QUERY = `
    query ServiceById($id: ID!) {
        service(id: $id) {
            id
            name
            description
            price
        }
    }
`;

// =====================
// PRODUCTS
// =====================

export const ALL_PRODUCTS_QUERY = `
    query AllProducts {
        products {
            id
            name
            description
            price
        }
    }
`;

export const PRODUCT_BY_ID_QUERY = `
    query ProductById($id: ID!) {
        product(id: $id) {
            id
            name
            description
            price
        }
    }
`;