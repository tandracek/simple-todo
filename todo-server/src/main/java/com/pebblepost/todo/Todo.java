package com.pebblepost.todo;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private boolean completed;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant modifiedAt;

    public Todo() {}

    public Todo(Long id, String text, boolean completed, Instant createdAt, Instant modifiedAt) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCompleted() {
        return this.completed;
    }

    public boolean getCompleted() {
        return this.completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return this.modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", text='" + getText() + "'" +
            ", completed='" + isCompleted() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            "}";
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

        public Todo build() {
            return new Todo(id, text, completed, createdAt, modifiedAt);
        }
    }

}
