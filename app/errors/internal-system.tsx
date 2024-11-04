import { TriangleAlert } from "lucide-react";
import ErrorWrapper from "~/components/error-wrapper";

function ErrorInternalSystem() {
  return (
    <ErrorWrapper
      description="系统出错啦"
      icon={<TriangleAlert className="size-16" />}
    />
  );
};

export default ErrorInternalSystem;
