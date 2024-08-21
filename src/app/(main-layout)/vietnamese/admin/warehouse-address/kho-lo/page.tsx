import { WarehouseAddress } from "@/components/features/warehouse-address";
import React from "react";

const Page = () => {
  return (
    <div>
      <WarehouseAddress isEdit warehouseCode="LO" />
    </div>
  );
};

export default Page;
