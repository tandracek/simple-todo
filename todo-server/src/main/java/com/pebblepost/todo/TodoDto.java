package com.pebblepost.todo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TodoDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    public TodoDto() {}

    public TodoDto(Long id) {
        this.id = id;
    }

    public static TodoDto fromEntity(Todo todo) {
        return TodoDto.builder().build();
    }

    public static Todo toEntity(TodoDto dto) {
        return Todo.builder().build();
    }

    private static Builder builder() {
        return new Builder();
    }

    private static class Builder {

        public TodoDto build() {
            return new TodoDto();
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
