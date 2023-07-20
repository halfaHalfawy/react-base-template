import { memo } from "react";
import Spinner from "./spinner";

const SpinnerButton = memo(
  (props: {
    type?: "submit" | "button" | "reset",
    isBusy: boolean,
    lable: string,
    className:string,
    onClick?: () => void;
  }) => {
    return (
      <button disabled={props.isBusy}
        type={props.type ?? "button"}
        onClick={props.onClick}
        className={
          "h-10 transition-all duration-500 " + props.className
        }
      >
       {props.isBusy ? <Spinner className="mx-auto "/> : props.lable}
      </button>
    );
  }
);

export default SpinnerButton;
