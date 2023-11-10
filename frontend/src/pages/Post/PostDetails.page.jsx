import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

function PostDetailsPage() {
  const post = useLoaderData();
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/edit/${post.id}`);
  };

  return (
    <>
      <div className="bg-white px-5 sm:flex">
        <div className="sm:w-1/2 lg:ml-32 pr-10">
          <p>{post.author.split("@")[0]}</p>
          <p>{post.title}</p>
          <p>{post.category}</p>
          <p>{post.content}</p>
          {user.id === post.userId && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="sm:w-1/2 sm:overflow-hidden sm:rounded-lg lg:mr-32">
          <img
            src={post.image}
            alt="post image"
            className=" object-cover object-center w-100 h-100"
          />
        </div>
      </div>

      {/* <div>
        <p>{newParament.author}</p>
        <p>{newParament.title}</p>
        <p>{newParament.category}</p>
        <p>{newParament.content}</p>
        <img src={newParament.image} alt="post image" />
      </div> */}
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
