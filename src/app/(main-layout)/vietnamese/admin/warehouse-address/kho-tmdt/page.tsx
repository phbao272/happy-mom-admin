import { WarehouseAddress } from "@/components/features/warehouse-address";
import React from "react";

const Page = () => {
  return (
    <div>
      <WarehouseAddress isEdit warehouseCode="TMDT" />
    </div>
  );
};

export default Page;
