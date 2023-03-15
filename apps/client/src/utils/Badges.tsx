import { User, Order } from 'shared-types';

const commonStatusClasses = 'rounded-full inline-block px-2 py-1 text-sm';

export const statusBadges: Record<Order['orderStatus'], React.ReactNode> = {
  processing: <span className={`${commonStatusClasses} bg-yellow-200`}>Processing</span>,
  dispatched: <span className={`${commonStatusClasses} bg-yellow-200`}>Dispatched</span>,
  delivered: <span className={`${commonStatusClasses} bg-success text-white`}>Delivered</span>,
  out_for_delivery: (
    <span className={`${commonStatusClasses} bg-green-500 text-white`}>Out of Delivery</span>
  ),
  canceled: <span className={`${commonStatusClasses} bg-danger text-white`}>canceled</span>,
};

export const roleBadges: Record<User['role'], React.ReactNode> = {
  admin: <span className="bg-danger rounded-xl py-1 px-2 uppercase text-white">Admin</span>,
  user: <span className="bg-primary rounded-xl py-1 px-2 uppercase text-white">User</span>,
  manager: <span className="rounded-xl bg-blue-500 py-1 px-2 uppercase text-white">Manager</span>,
};
