import { DealForm } from "@/components/features/deals/components/DealForm";
import { DealsAPIQueryKey } from "@/components/features/deals/configs";
import { getDetailDeal } from "@/components/features/deals/services";
import { PageWithPrefetchQuery } from "@/components/shared/layouts";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <PageWithPrefetchQuery
      queryFn={getDetailDeal(params.id)}
      queryKey={[DealsAPIQueryKey.GET_DEAL, params.id]}
    >
      <DealForm />
    </PageWithPrefetchQuery>
  );
};

export default Page;
