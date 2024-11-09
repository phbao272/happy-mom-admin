import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { columns } from "./configs/columns";

export const ListEvent = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/management-notifications"}
          // endpointResourceAPI={"/groups"}
          name={"notifications"}
          columns={columns}
          data={[]}
          seeDetail={false}
          hasCreate
          enableRowSelection={false}
          {...disableOptions}
          enableRowActions={false}
          // enableColumnActions={false}
          // enableEditing={false}
        />
      </TableContextProvider>
    </div>
  );
};
