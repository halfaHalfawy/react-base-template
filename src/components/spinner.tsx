import { AiOutlineLoading } from "react-icons/ai";
const Spinner = (props:{className?:string}) => {
  return (
    <AiOutlineLoading
      className={
        "rounded-full w-7 h-7 animate-spin border-2 border-gray-500 " +
        props.className
      }
    />
  );
};

export default Spinner;
