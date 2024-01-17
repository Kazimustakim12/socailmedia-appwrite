import Loader from "@/components/shared/Loader";
import { useGetAllUsers } from "@/lib/react-query/queryAndMutations";

const AllUsers = () => {
  const { data: allUSersList, isFetching: allUserListFetching } =
    useGetAllUsers();
  console.log(allUSersList, "users");

  if (allUserListFetching) return <Loader />;

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">All Users</h2>
      </div>
    </div>
  );
};

export default AllUsers;
