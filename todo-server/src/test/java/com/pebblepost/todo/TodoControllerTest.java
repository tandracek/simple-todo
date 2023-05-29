package com.pebblepost.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TodoRepository todoRepository;

    @BeforeEach
    public void beforeEach() {
        todoRepository.deleteAll();
    }

    @Test
    void create() throws Exception {
        TodoDto todo = TodoDto.builder()
            .text("TODO")
            .completed(false)
            .build();
        RequestBuilder postRequest = MockMvcRequestBuilders.post("/todos")
            .content(toJsonString(todo))
            .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(postRequest)
            .andExpect(status().isCreated())
            .andExpect(MockMvcResultMatchers.jsonPath("$.text").value("TODO"));

        List<Todo> todos = todoRepository.findAll();
        assertEquals(1, todos.size());
    }

    @Test
    void getAll() throws Exception {
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

        RequestBuilder getRequest = MockMvcRequestBuilders.get("/todos");
        mockMvc.perform(getRequest)
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());

        List<Todo> todos = todoRepository.findAll();
        assertEquals(2, todos.size());
    }

    @Test
    void getOne() throws Exception {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        RequestBuilder getRequest = MockMvcRequestBuilders.get("/todos/" + savedTodo.getId());
        mockMvc.perform(getRequest)
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.text").value("Test1"));

        List<Todo> todos = todoRepository.findAll();
        assertEquals(1, todos.size());
    }

    @Test
    void put() throws Exception {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        TodoDto update = TodoDto.builder()
            .text("Test Update")
            .completed(true)
            .build();

        RequestBuilder putRequest = MockMvcRequestBuilders.put("/todos/" + savedTodo.getId())
            .content(toJsonString(update))
            .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(putRequest)
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.text").value("Test Update"));

        Todo things = todoRepository.findById(savedTodo.getId()).orElseThrow();
        assertEquals(true, things.getCompleted());
    }

    @Test
    void delete() throws Exception {
        Todo todo1 = Todo.builder()
            .text("Test1")
            .completed(false)
            .build();
        Todo savedTodo = todoRepository.save(todo1);

        RequestBuilder deleteRequest = MockMvcRequestBuilders.delete("/todos/" + savedTodo.getId());
        mockMvc.perform(deleteRequest)
            .andExpect(status().isOk());
    }

    private static String toJsonString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
