import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useEffect } from "react";

import { useState } from "react";

export const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts`);
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <PacmanLoader color="#4338CA" size={100} />
      ) : (
        <SimpleGrid cols={3}>
          {posts.map((post) => (
            <ArticleCardImage key={post.title} {...post} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};
