import { CircleHelp } from "lucide-react";
import ErrorWrapper from "~/components/error-wrapper";

function NotFound() {
  return (
    <ErrorWrapper
      description="没有找到页面哦"
      icon={<CircleHelp className="size-16" />}
    />
  );
};

export default NotFound;
