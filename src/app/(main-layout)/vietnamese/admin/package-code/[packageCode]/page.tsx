import { ShipmentIntoPackage } from "@/components/features/vietnamese/admin/shipment-into-package";
import React from "react";

const Page = ({
  params: { packageCode },
}: {
  params: {
    packageCode: string;
  };
}) => {
  return (
    <>
      <ShipmentIntoPackage packageCode={packageCode} />
    </>
  );
};

export default Page;
