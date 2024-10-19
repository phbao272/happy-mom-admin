import { GroupForm } from "@/components/features/group/components/GroupForm";
import { GroupAPIQueryKey } from "@/components/features/group/configs";
import { getDetailGroup } from "@/components/features/group/services";
import { PageWithPrefetchQuery } from "@/components/shared/layouts";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <PageWithPrefetchQuery
      queryFn={getDetailGroup(params.id)}
      queryKey={[GroupAPIQueryKey.GET_GROUP, params.id]}
    >
      <GroupForm />
    </PageWithPrefetchQuery>
  );
};

export default Page;
