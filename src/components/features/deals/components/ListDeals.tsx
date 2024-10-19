import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { columns, DealsAPIQueryKey } from "../configs";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";

export const ListDeals = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/deals?type=ALL"}
          endpointResourceAPI={"/deals?type=ALL"}
          name={DealsAPIQueryKey.GET_DEALS}
          columns={columns}
          data={[]}
          seeDetail
          hasCreate
          hasDelete={false}
          enableRowSelection={false}
          {...disableOptions}
        />
      </TableContextProvider>
    </div>
  );
};
