import { FormLayout } from "@/components/form/FormLayout";
import { PageTitle } from "@/components/layout/PageTitle";

export const Home = () => {
  return (
    <div className="py-4 w-full flex flex-col">
      <PageTitle title="Zealy" subTitle="Zealy interview task" />
      <FormLayout />
    </div>
  );
};
