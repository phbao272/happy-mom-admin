import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import React from "react";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { ArticleAPIQueryKey, columns } from "../configs";

export const ListArticle = () => {
  return (
    <div>
      <TableContextProvider>
        <ReactTable
          endpointAPI={"/articles"}
          endpointResourceAPI={"/articles"}
          name={ArticleAPIQueryKey.GET_ARTICLES}
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
