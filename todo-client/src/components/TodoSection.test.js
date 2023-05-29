import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Client from '../client';
import TodoSection from './TodoSection';
import assert from 'assert';

describe("TodoSection", () => {
    const client = new Client("mockme");
    test("Create TODO", async () => {
        jest.spyOn(client, "createTodo")
            .mockImplementation(todoTemplate => (Promise.resolve({...todoTemplate, id: 1, createdAt: "", modifiedAt: ""})));

        const todoSection = render(<TodoSection client={client} />);
        const createInput = screen.getByRole("textbox", {id: "create-input"});
        fireEvent.change(createInput, {target: {value: "Test TODO"}});
        const createButton = screen.getByRole("button", {id: "create-button"});
        fireEvent.click(createButton);

        await waitFor(() => {
            const counter = screen.getByTitle("counter");

            screen.getByText("Test TODO");
            expect(counter.innerHTML).toBe("TODOS: 1");
        });
    });
});
