import { memo, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../features/auth/auth.slice";
interface Props{
  
  turnPath: string;
  case: "loggedIn" | "loggedOut";
  children: JSX.Element;

}
// eslint-disable-next-line react/display-name
const ProtectedRoute = memo<Props>((props: Props) => {
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!auth.user && props.case == "loggedOut") {
      navigate(props.turnPath, { replace: true });
    } else if (auth.user && props.case == "loggedIn") {
      navigate(props.turnPath, { replace: true });
    }
  }, [auth, navigate, props]);
  return props.children;
});
export default ProtectedRoute;