import {Todo, TodoTemplate} from "./types";

export default class Client {
  url: string

  constructor(url: string) {
    this.url = url;
  }

  async getAllTodos(): Promise<Todo[]> {
    return getJson(`${this.url}/todos`);
  }

  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    return putJson(`${this.url}/todos/${id}`, todo);
  }

  async createTodo(todo: TodoTemplate): Promise<Todo> {
    return postJson(`${this.url}/todos`, todo);
  }

  async deleteTodo(id: number): Promise<void> {
    return deleteItem(`${this.url}/todos/${id}`);
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