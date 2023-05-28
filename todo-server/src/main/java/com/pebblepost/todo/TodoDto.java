package com.pebblepost.todo;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TodoDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private final Long id;
    private final String text;
    private final boolean completed;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private final Instant createdAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private final Instant modifiedAt;

    public TodoDto(Long id, String text, boolean completed, Instant createdAt, Instant modifiedAt) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return this.text;
    }

    public boolean isCompleted() {
        return this.completed;
    }

    public boolean getCompleted() {
        return this.completed;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Instant getModifiedAt() {
        return this.modifiedAt;
    }

    public static TodoDto fromEntity(Todo todo) {
        return TodoDto.builder()
            .id(todo.getId())
            .text(todo.getText())
            .completed(todo.isCompleted())
            .createdAt(todo.getCreatedAt())
            .modifiedAt(todo.getModifiedAt())
            .build();
    }

    public Todo toEntity() {
        return Todo.builder()
            .id(getId())
            .text(getText())
            .completed(isCompleted())
            .createdAt(getCreatedAt())
            .modifiedAt(getModifiedAt())
            .build();
    }

    private static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String text;
        private boolean completed;
        private Instant createdAt;
        private Instant modifiedAt;

        public Builder id(Long val) {
            this.id = val;
            return this;
        }

        public Builder text(String val) {
            this.text = val;
            return this;
        }

        public Builder completed(boolean val) {
            this.completed = val;
            return this;
        }

        public Builder createdAt(Instant val) {
            this.createdAt = val;
            return this;
        }

        public Builder modifiedAt(Instant val) {
            this.modifiedAt = val;
            return this;
        }

        public TodoDto build() {
            return new TodoDto(id, text, completed, createdAt, modifiedAt);
        }
    }
}
