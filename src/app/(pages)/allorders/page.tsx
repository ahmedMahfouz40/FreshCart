import Container from "@/app/_components/Container/Container";
import OrderCard from "@/app/_components/OrderCard/OrderCard";
import OrdersEmpty from "@/app/_components/OrdersEmpty/OrdersEmpty";
import { getUserOrders } from "@/actions/orders.action";
import Link from "next/link";
import { BsFillBox2Fill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

const Orders = async () => {
  const orders = await getUserOrders();

  return (
    <div className="py-5">
      <Container>
        {orders.length > 0 && (
          <div className="space-y-6 my-10">
            <p className="text-sm leading-5 ">
              <Link
                href={"/"}
                className="opacity-70 hover:text-primary hover:opacity-100"
              >
                Home /
              </Link>
              <span> My Orders</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-b from-primary-500 to-primary-600 text-white">
                  <BsFillBox2Fill />
                </div>
                <div>
                  <h1 className="text-2xl text-heading font-bold leading-9">
                    My Orders
                  </h1>
                  <p className="leading-5 text-sm text-[#6A7282]">
                    Track and manage your {orders?.length ?? 0} orders
                  </p>
                </div>
              </div>
              <Link
                href={"/"}
                className="text-primary text-sm leading-5 flex items-center gap-2 hover:bg-primary-50 transition-colors hover:text-primary-800 p-2 rounded-xl"
              >
                <FaShoppingBag /> Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Cards */}
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <OrdersEmpty />
        )}
      </Container>
    </div>
  );
};

export default Orders;
