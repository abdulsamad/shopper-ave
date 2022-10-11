import mongoose from 'mongoose';

/**
 * base - {Product.find()}
 */
class WhereClause {
  base: any;
  bigQuery: any;

  constructor(base: any, bigQuery: any) {
    this.base = base;
    this.bigQuery = bigQuery;
  }

  search() {
    const keyword = this.bigQuery.search
      ? {
          name: {
            $regex: this.bigQuery.search,
            $options: 'i',
          },
        }
      : {};

    this.base = this.base.find({ ...keyword });
    return this;
  }

  filter() {
    const copyQuery = { ...this.bigQuery };

    delete copyQuery['search'];
    delete copyQuery['limit'];
    delete copyQuery['page'];

    // Convert big Query into a string => copyQ
    let stringOfCopyQuery = JSON.stringify(copyQuery);
    stringOfCopyQuery = stringOfCopyQuery.replace(/\b{gte|lte|gt|lt}\b/g, (m) => `$${m}`);

    const jsonOfCopyQ = JSON.parse(stringOfCopyQuery);

    this.base = this.base.find(jsonOfCopyQ);
  }

  pager(resultPerPage: number) {
    let currentPage = 1;

    if (this.bigQuery.page) {
      currentPage = this.bigQuery.page;
    }

    // Skip formula
    const skip = resultPerPage * (currentPage - 1);
    this.base = this.base.limit(resultPerPage).skip(skip);
    return this;
  }
}
