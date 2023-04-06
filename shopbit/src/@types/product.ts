export interface productsInterface {
    products: {
        results: [
            {
                id: string;
                name: string;
                slug: string;
                currency: string;
                categories: [{
                    name: string;
                }]
                images: [
                    {
                        file: {
                            url: string;
                            width: number;
                            height: number;
                        };
                    }
                ];
                price: number;
            }
        ];
    };
}

export interface productInterface {
    product: {
        id: string;
        name: string;
        slug: string;
        currency: string;
        categories: [{
            name: string;
        }]
        images: [
            {
                file: {
                    url: string;
                    width: number;
                    height: number;
                };
            }
        ];
        price: number;
    };
}
