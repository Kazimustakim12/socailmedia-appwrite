import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5 ">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="assets/images/logo.svg"
            alt="logo"
            width={130}
            height={3245}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOutAccount()}
          >
            <img src="assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3 ">
            <img
              src={user.imageUrl || "assets/images/profile.png"}
              className="h-8 w-8 rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
