import { AiOutlineQuestion } from "react-icons/ai";
const NotFoundPage = () => {
  return (
    <div className="h-[100vh] flex items-center">
      <div className="m-auto p-10 flex flex-col justify-items-center rounded-xl ">
        <AiOutlineQuestion />
        <p>Nothing found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
