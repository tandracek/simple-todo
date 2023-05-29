import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Client from '../client';
import TodoSection from './TodoSection';

describe("TodoSection", () => {
  const client = new Client("mockme");
  test("Create and update", async () => {
    jest.spyOn(client, "createTodo")
      .mockImplementation(todoTemplate => (Promise.resolve({...todoTemplate, id: 1, createdAt: "", modifiedAt: ""})));

    jest.spyOn(client, "updateTodo")
      .mockImplementation((id, todo) => {
          expect(id).toBe(1);
          return Promise.resolve(todo);
      });

    const todoSection = render(<TodoSection client={client} />);
    const createInput = todoSection.getByRole("textbox", {id: "create-input"});
    fireEvent.change(createInput, {target: {value: "Test TODO"}});
    const createButton = todoSection.getByRole("button", {id: "create-button"});
    fireEvent.click(createButton);

    await waitFor(() => {
      const counter = todoSection.getByTitle("counter");

      todoSection.getByText("Test TODO");
      expect(counter.innerHTML).toBe("TODOS: 1");
    });

    let completedCheckbox = todoSection.getByRole("checkbox", {id: "completed-1"});
    fireEvent.click(completedCheckbox);

    await waitFor(async () => {
      completedCheckbox = await todoSection.getByRole("checkbox", {id: "completed-1"});
      expect(completedCheckbox.checked).toBe(true);
    });
  });
});
