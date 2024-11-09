import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { columns } from "./configs/columns";

export const ListMission = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/management-notifications"}
          // endpointResourceAPI={"/groups"}
          hasCreate
          name={"notifications"}
          columns={columns}
          data={[]}
          seeDetail={false}
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
