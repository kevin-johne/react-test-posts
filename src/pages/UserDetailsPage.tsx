import { Spin } from "antd";
import { useUser } from "../context/UserContext";

export default function UserDetailsPage() {
  const { data: userDetails } = useUser();

  return (
    <>
      {userDetails === null ? (
        <Spin />
      ) : (
        <div>
          <p>
            <b>Name:</b> {userDetails.name}
          </p>
          <p>
            <b>Email:</b> {userDetails.email}
          </p>
          <p>
            <b>Phone:</b> {userDetails.phone}
          </p>
          <p>
            <b>Website:</b> {userDetails.website}
          </p>
        </div>
      )}
    </>
  );
}
