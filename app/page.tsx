"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const { user, signOut } = useAuthenticator();

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
    const { data, errors } = await client.queries.scanItems({
      // owner: window.prompt("ownerId") || "f1035dca-90d1-70a3-4ce2-4742e7b7d086::f1035dca-90d1-70a3-4ce2-4742e7b7d086",
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
    });
    console.log(data, errors);
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
            {todo.content}
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
      <button onClick={createPost}>+ Post</button>
      <button onClick={createAuthor}>+ Author</button>
      <button onClick={getPost}>+ getPost</button>
      <button onClick={getAuthor}>+ getAuthor</button>
      <button onClick={updatePost}>+ updatePost</button>
      <button onClick={updateAuthor}>+ updateAuthor</button>
      <button onClick={deletePost}>+ deletePost</button>
      <button onClick={deleteAuthor}>+ deleteAuthor</button>
      <button onClick={getPostByAuthor}>+ Query</button>

      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
