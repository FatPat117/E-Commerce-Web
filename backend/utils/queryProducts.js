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
                                          product.price >= this.query.price[0] && product.price <= this.query.price[1]
                          )
                        : this.products;
        }
}

export default QueryProducts;
