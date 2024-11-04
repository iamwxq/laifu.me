import { LockKeyhole } from "lucide-react";
import ErrorWrapper from "~/components/error-wrapper";

function Unauthorized() {
  return (
    <ErrorWrapper
      description="你暂时没有权限访问这篇文章哦"
      icon={<LockKeyhole className="size-16" />}
    />
  );
};

export default Unauthorized;
