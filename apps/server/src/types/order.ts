import { Types } from 'mongoose';

import { Order as IOrder } from 'shared-types';

export type Order = IOrder<Types.ObjectId>;
