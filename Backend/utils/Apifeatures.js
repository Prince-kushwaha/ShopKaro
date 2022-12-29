class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    // console.log(this.query);
    // console.log(this.query._conditions);
    return this;
  }

  filter() {
    const key = [
      "keyword",
      "limit",
      "page",
      "max_price",
      "min_price",
      "rating",
    ];
    const priceObject = {
      price: {
        $gte: this.queryStr.min_price || 0,
        $lte: this.queryStr.max_price || 50000,
      },
    };

    const rating = this.queryStr.rating
      ? {
          rating: {
            $gte: this.queryStr.rating,
          },
        }
      : {};

    let queryCopy = { ...this.queryStr };
    key.forEach((value) => delete queryCopy[value]);

    //filter by price  or category or rating
    this.query.find({ ...queryCopy });
    this.query.find({ ...priceObject });
    this.query.find({ ...rating });
    return this;
  }

  pagination(resultPerPage = 5) {
    const currentPage = this.queryStr.page || 1;
    const skip = (currentPage - 1) * resultPerPage;
    this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
