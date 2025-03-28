"use client";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl } from "aws-amplify/storage";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";

import { useEffect, useState } from "react";

const client = generateClient<Schema>();

const blog = () => {
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]);

  // storage
  

  // storage

  function listPosts() {
    client.subscriptions.onAddPost().subscribe({
      next: (newPost) => {
        setPosts((prevPosts) => {
          const existingIndex = prevPosts.findIndex(
            (post) => post.id === newPost.id
          );

          if (existingIndex !== -1) {
            // If post exists, replace it with the updated post
            const updatedPosts = [...prevPosts];
            updatedPosts[existingIndex] = newPost;
            return updatedPosts;
          }

          return [...prevPosts, newPost];
        });
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });
  }

  useEffect(() => {
    listPosts();
  }, []);

  async function createPost() {
    const { data, errors } = await client.mutations.addPost({
      id: window.prompt("id of post"),
      title: window.prompt("title of post"),
      content: window.prompt("post content"),
      author: window.prompt("author name") || "",
    });
    console.log(data, errors);
  }

  async function createAuthor() {
    const { data, errors } = await client.mutations.addAuthor({
      id: window.prompt("id of author") || "",
      name: window.prompt("name of author") || "",
      email: window.prompt("author email"),
      phone: window.prompt("author phone"),
    });
    console.log(data, errors);
  }

  async function getAuthor() {
    const { data, errors } = await client.queries.getAuthor({
      id: window.prompt("Author id to fetch") || "",
    });
    console.log(data, errors);
  }
  async function getPost() {
    const { data, errors } = await client.queries.getPost({
      id: window.prompt("TPost id to fetch") || "",
    });
    console.log(data, errors);
  }
  async function getPostByAuthor() {
    const { data, errors } = await client.queries.allPostsByAuthor({
      author: window.prompt("ownerId") || "",
    });
    console.log(data, errors);
  }

  async function transactgetitem() {
    const { data, errors } = await client.queries.TransactGetItem({
      postId: window.prompt("postId") || "",
      authorId: window.prompt("authorId") || "",
    });
    console.log(data, errors);
  }

  async function updatePostAndAuthor() {
    const { data, errors } = await client.mutations.updatePostAndAuthor({
      postId: window.prompt("postId") || "",
      authorId: window.prompt("authorId") || "",
      title: window.prompt("title") || "",
      content: window.prompt("content") || "",
      oldTitle: window.prompt("oldTitle") || "",
      authorName: window.prompt("authorName") || "",
    });
    console.log(data, errors);
  }

  async function updateAuthor() {
    const { data, errors } = await client.mutations.updateAuthor({
      id: window.prompt("id to update") || "",
      name: window.prompt("name to update"),
      email: window.prompt("email to update"),
      phone: window.prompt("Enter phone"),
    });
  }
  async function updatePost() {
    const { data, errors } = await client.mutations.updatePost({
      id: window.prompt("id to update") || "",
      title: window.prompt("title to update") || "",
      author: window.prompt("author who update") || "",
      content: window.prompt("Enter updated content") || "",
      url: window.prompt("url to update") || "",
      expectedVersion: Number(window.prompt("Expected version")) || 1,
    });
  }

  async function deleteAuthor() {
    const { data, errors } = await client.mutations.deleteAuthor({
      id: window.prompt(" id to delete") || "",
    });
    console.log(data, errors);
  }
  async function deletePost() {
    const { data, errors } = await client.mutations.deletePost({
      id: window.prompt(" id to delete") || "",
      expectedVersion: Number(window.prompt("Expected version")),
    });
    console.log(data, errors);
  }

  return (
    <div className="">
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} :- {post.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <main>
     
      <button onClick={createPost}>+ Post</button>
      <button onClick={createAuthor}>+ Author</button>
      <button onClick={getPost}>+ getPost</button>
      <button onClick={getAuthor}>+ getAuthor</button>
      <button onClick={updatePost}>+ updatePost</button>
      <button onClick={updateAuthor}>+ updateAuthor</button>
      <button onClick={deletePost}>+ deletePost</button>
      <button onClick={deleteAuthor}>+ deleteAuthor</button>
      <button onClick={getPostByAuthor}>+ Query</button>
      <button onClick={updatePostAndAuthor}>TransactWriteItem</button>
      <button onClick={transactgetitem}>TransactGetItem</button>
     
      </main>
    </div>
  );
};

export default blog;
