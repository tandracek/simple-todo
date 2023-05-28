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

    public Todo createTodo(Todo newTodo) {
        return todoRepository.save(newTodo);
    }

    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodo(Long id) throws NotFoundException {
        return todoRepository.findById(id)
                             .orElseThrow(() -> new NotFoundException("Unable to find TODO with id " + id + "."));
    }

    // TODO Make transactional
    public Todo updateTodo(Long id, Todo updatedTodo) throws NotFoundException {
        Todo todo = getTodo(id);
        todo.setText(updatedTodo.getText());
        todo.setCompleted(updatedTodo.getCompleted());
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
