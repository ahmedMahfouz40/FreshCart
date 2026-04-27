"use client";
import AddAddressModal from "../../../../components/AddAddressModal/AddAddressModal";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchUserAddress } from "@/redux/slices/addressSlice";
import AddressCart from "@/components/AddressCart/AddressCart";
import AddressCardSkeleton from "@/app/_skeletons/AddressCartSkeleton";
import NoAddresses from "@/components/NoAddresses/NoAddresses";

const Address = () => {
  const { userAddresses, isLoading, hasFetched } = useAppSelector(
    (state) => state.userAddressReducer,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchUserAddress());
    }
  }, [dispatch, hasFetched]);

  if (isLoading || !userAddresses) return <AddressCardSkeleton />;
  if (userAddresses && userAddresses.length === 0) return <NoAddresses />;
  return (
    <div>
      {/* Addresses Header */}
      <div className="header flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="font-bold text-xl text-heading leading-7">
            My Addresses
          </h2>
          <p className="text-sm text-[#6A7282] leading-5">
            Manage your saved delivery addresses
          </p>
        </div>
        <div>
          <AddAddressModal buttonTitle="+ Add Address" />
        </div>
      </div>
      {/* Addresses */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Col ( Address ) */}

        {userAddresses.map((item) => (
          <AddressCart item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Address;
