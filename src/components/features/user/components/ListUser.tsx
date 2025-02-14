import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { UserAPIQueryKey, columnsUser } from "../configs";

export const ListUser = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/users"}
          endpointResourceAPI={"/users"}
          name={UserAPIQueryKey.GET_USERS}
          columns={columnsUser}
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
