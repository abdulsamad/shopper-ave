import { Order } from 'shared-types';

const commonClasses = 'rounded-full inline-block px-2 py-1 text-sm';

export const statusTags: Record<Order['orderStatus'], React.ReactNode> = {
  processing: <span className={`${commonClasses} bg-yellow-200`}>Processing</span>,
  dispatched: <span className={`${commonClasses} bg-yellow-200`}>Dispatched</span>,
  delivered: <span className={`${commonClasses} bg-success text-white`}>Delivered</span>,
  out_for_delivery: (
    <span className={`${commonClasses} bg-green-500 text-white`}>Out of Delivery</span>
  ),
  canceled: <span className={`${commonClasses} bg-danger text-white`}>canceled</span>,
};
