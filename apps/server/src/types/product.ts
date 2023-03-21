import { Types } from 'mongoose';

import { Product as IProduct } from 'shared-types';

export type Product = IProduct<Types.ObjectId>;
