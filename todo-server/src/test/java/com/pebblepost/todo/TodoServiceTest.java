package com.pebblepost.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.opentest4j.AssertionFailedError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javassist.NotFoundException;

@DataJpaTest
class TodoServiceTest {

    @Autowired
    TodoRepository todoRepository;

    TodoService todoService;

    @BeforeEach
    public void beforeEach() {
        todoService = new TodoService(todoRepository);
    }

    @Test
    void createTodo() {
        Todo todo = Todo.builder()
            .text("Test")
            .completed(false)
            .build();
        Todo createdTodo = todoService.createTodo(todo);

        assertEquals(todo.getText(), createdTodo.getText());
        assertNotNull(todo.getCreatedAt());
        assertNotNull(todo.getModifiedAt());
    }

    @Test
    void getTodos() {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();

        Todo todo2 = Todo.builder()
            .text("Test2")
            .completed(false)
            .build();
        todoRepository.save(todo1);
        todoRepository.save(todo2);

        List<Todo> todos = todoService.getTodos();
        assertEquals(2, todos.size());

        Todo savedTodo1 = findTodoByText(todos, todo1.getText());
        assertNotNull(savedTodo1);

        Todo savedTodo2 = findTodoByText(todos, todo2.getText());
        assertNotNull(savedTodo2);
    }

    @Test
    void getTodo() throws NotFoundException {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        Todo retrievedTodo = todoService.getTodo(savedTodo.getId());
        assertEquals(retrievedTodo.getText(), todo1.getText());

        try {
            todoService.getTodo(50L);
            throw new AssertionFailedError("getTodo failed to throw a NotFoundException");
        } catch (NotFoundException e) {} 
    }

    @Test
    void updateTodo() throws NotFoundException {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        Todo update = Todo.builder()
            .text("Test1 Update")
            .completed(true)
            .build();
        Todo updatedTodo = todoService.updateTodo(savedTodo.getId(), update);

        assertEquals(updatedTodo.getText(), update.getText());
        assertEquals(updatedTodo.getCompleted(), update.getCompleted());
        assertNotEquals(updatedTodo.getCreatedAt(), updatedTodo.getModifiedAt());
    }

    @Test
    void deleteTodo() {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        todoService.deleteTodo(savedTodo.getId());

        assertEquals(0, todoRepository.count());
    }

    private Todo findTodoByText(List<Todo> todos, String text) {
        return todos.stream()
            .filter(todo -> todo.getText().equals(text))
            .findFirst()
            .orElse(null);
    }
}
