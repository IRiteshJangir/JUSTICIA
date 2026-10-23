class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(fields = []) {
    if (this.queryString.search && fields.length > 0) {
      const regex = new RegExp(this.queryString.search, 'i');
      const searchConditions = fields.map(field => ({ [field]: regex }));
      
      this.query = this.query.find({ $or: searchConditions });
    } else if (this.queryString.keyword) {
       // fallback for specific keyword searches if needed
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'keyword'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  async paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || require('../config/constants').ITEMS_PER_PAGE;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    
    // We need to clone the query to get the total count without skip/limit
    const totalQuery = this.query.model.find(this.query.getQuery());
    const total = await totalQuery.countDocuments();
    const pages = Math.ceil(total / limit);

    return {
      query: this.query,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    };
  }
}

module.exports = APIFeatures;
