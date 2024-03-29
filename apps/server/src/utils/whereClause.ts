import { Query } from 'mongoose';

type bigQueryType = {
  search?: string;
  limit?: string;
  page?: string;
  lt?: string;
  gt?: string;
};

/**
 * Class for filtering and pagination for product model find
 * base - @mongoose {Product.find()}
 * bigQuery - Request query object
 */
export class WhereClause<T> {
  base: Query<T[], T>;
  bigQuery: bigQueryType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;

  constructor(base: Query<T[], T>, bigQuery: bigQueryType) {
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
    return this;
  }

  pager(resultPerPage: number) {
    let currentPage = 1;

    if (this.bigQuery.page) {
      currentPage = Number(this.bigQuery.page);
    }

    // Skip formula
    const skip = resultPerPage * (currentPage - 1);
    this.base = this.base.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default WhereClause;
