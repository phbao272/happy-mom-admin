import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { columns, GroupAPIQueryKey } from "../configs";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";

export const ListGroup = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/groups"}
          endpointResourceAPI={"/groups"}
          name={GroupAPIQueryKey.GET_GROUPS}
          columns={columns}
          data={[]}
          seeDetail
          hasCreate
          enableRowSelection={false}
          {...disableOptions}
        />
      </TableContextProvider>
    </div>
  );
};
