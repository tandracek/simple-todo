package com.pebblepost.todo;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    Todo createTodo(Todo newTodo) {
        return null; // TODO
    }

    public List<Todo> getTodos() {
        return null; // TODO
    }

    public Todo getTodo(Long id) throws NotFoundException {
        return null; // TODO
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        return null; // TODO
    }

    public void deleteTodo(Long id) {
        // TODO
    }

}
