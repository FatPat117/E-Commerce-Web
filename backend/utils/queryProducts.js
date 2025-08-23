class QueryProducts {
        products = [];
        query = {};
        constructor(query, products) {
                this.query = query;
                this.products = products;
        }

        categoryQuery() {
                this.products = this.query.category
                        ? this.products.filter((product) => product.name == this.query.category)
                        : this.products;
                return this;
        }

        ratingQuery() {
                this.products = this.query.rating
                        ? this.products.filter((product) => parseInt(product.rating) <= parseInt(this.query.rating))
                        : this.products;
                return this;
        }

        priceQuery() {
                this.products = this.query.price
                        ? this.products.filter(
                                  (product) =>
                                          product.price >= parseInt(this.query.lowPrice) &&
                                          product.price <= parseInt(this.query.highPrice)
                          )
                        : this.products;
                return this;
        }

        sortByPriceQuery() {
                if (this.query.sortByPrice === "low-to-high") {
                        this.products = this.products.sort((a, b) => a.price - b.price);
                } else if (this.query.sortByPrice === "high-to-low") {
                        this.products = this.products.sort((a, b) => b.price - a.price);
                }
                return this;
        }

        skipQuery() {
                let { pageNumber, perPage } = this.query;
                const skipPage = parseInt(pageNumber - 1) * parseInt(perPage);
                const skipProduct = [];
                for (let i = skipPage; i < this.products.length; i++) {
                        skipProduct.push(this.products[i]);
                }
                this.products = skipProduct;
                return this;
        }

        limitQuery() {
                let { perPage } = this.query;
                if (this.products.length > perPage) {
                        this.products = this.products.slice(0, parseInt(perPage));
                }
                return this;
        }

        getProducts() {
                return this.products;
        }
        getTotalProducts() {
                return this.products.length;
        }
}

export default QueryProducts;
