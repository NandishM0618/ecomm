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
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCpy = { ...this.queryStr };
    const remfields = ["keyword", "page", "limit"];
    remfields.forEach((key) => {
      delete queryCpy[key];
    });
    let queryStr = JSON.stringify(queryCpy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currPage = Number(this.queryStr.page) || 1;

    const skip = resPerPage * (currPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
