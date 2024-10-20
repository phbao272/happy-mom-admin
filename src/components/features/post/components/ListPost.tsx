import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { columns, PostAPIQueryKey } from "../configs";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";

export const ListPost = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/posts"}
          endpointResourceAPI={"/posts"}
          name={PostAPIQueryKey.GET_POSTS}
          columns={columns}
          data={[]}
          seeDetail
          hasCreate={false}
          hasSearch={false}
          enableRowSelection={false}
          {...disableOptions}
        />
      </TableContextProvider>
    </div>
  );
};
