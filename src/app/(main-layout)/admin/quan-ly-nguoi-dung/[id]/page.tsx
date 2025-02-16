import { UserForm } from "@/components/features/user/components/Form";
import { UserAPIQueryKey } from "@/components/features/user/configs";
import { getDetailUser } from "@/components/features/user/services";
import { PageWithPrefetchQuery } from "@/components/shared/layouts";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <PageWithPrefetchQuery
      queryFn={getDetailUser(params.id)}
      queryKey={[UserAPIQueryKey.GET_USERS, params.id]}
    >
      <UserForm />
    </PageWithPrefetchQuery>
  );
};

export default Page;
