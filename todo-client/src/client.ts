import {Todo, TodoTemplate} from "./types";

const url = "http://localhost:8080";

export default {
  async getAllTodos(): Promise<Todo[]> {
    return getJson(`${url}/todos`);
  },

  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    return putJson(`${url}/todos/${id}`, todo);
  },

  async createTodo(todo: TodoTemplate): Promise<Todo> {
    return postJson(`${url}/todos`, todo);
  },

  async deleteTodo(id: number): Promise<void> {
    return deleteItem(`${url}/todos/${id}`);
  }
}

async function getJson(url) {
  return (await performRequest(url, {})).json();
}

async function putJson(url, body) {
  const request = {
    method: "PUT",
    body: JSON.stringify(body)
  };

  return (await performRequest(url, request)).json();
}

async function postJson(url, body) {
  const request = {
    method: "POST",
    body: JSON.stringify(body)
  };

  return (await performRequest(url, request)).json();
}

async function deleteItem(url) {
  performRequest(url, {method: "DELETE"});
}

async function performRequest(url, request) {
  const response = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    },
    ...request
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}