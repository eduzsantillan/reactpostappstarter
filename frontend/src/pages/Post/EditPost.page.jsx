import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function EditPostPage() {
  const navigate = useNavigate();
  const post = useLoaderData();
  const form = useForm({
    initialValues: {
      title: post.title,
      category: post.category,
      content: post.content,
      image: post.image,
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.put(`${DOMAIN}/api/posts/${post.id}`, values);
    console.log(res);
    if (res?.status === 200) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 px-4 rounded shadow-md drop-shadow"
          >
            Update
          </Button>
        </Group>
      </form>
    </Box>
  );
}
