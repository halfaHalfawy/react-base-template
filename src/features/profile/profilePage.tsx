import { useDispatch, useSelector } from "react-redux";
import { authSelector, logOut } from "../auth/auth.slice";
import {
    AiFillBank,
  AiFillProfile,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";

const ProfilePage = () => {
  const auth = useSelector(authSelector);
  const diapatch = useDispatch();
  return (
    <div className="h-full flex ">
      <div className="flex mx-auto">
        <div className="mx-10 flex flex-col">
          <div className="flex items-center">
            <AiOutlineUser className="h-10 w-10 mr-10" />
            <h1 className="text-4xl">{auth.user?.name}</h1>
          </div>
          <div className=" flex flex-col gap-5 my-10">
            <div className="flex gap-5 rounded-2xl items-center shadow-inner shadow-gray-500 p-3">
              <AiOutlineMail />
              {auth.user?.email}
            </div>
            <div className="flex gap-5 rounded-2xl items-center shadow-inner shadow-gray-500 p-3">
              <AiFillProfile />
              {auth.user?.role}
            </div>
            <button
              onClick={() => {
                diapatch(logOut());
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <AiFillBank className="h-[100px] w-auto" />
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
