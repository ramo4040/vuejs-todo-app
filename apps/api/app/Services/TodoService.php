<?php

namespace App\Services;

use App\Repositories\TodoRepository;
use App\Models\Todo;
use App\Models\User;

class TodoService
{

    public function __construct(protected TodoRepository $todoRepository) {}

    public function getTodosByCategory($category)
    {
        return $this->todoRepository->getTodosByCategory($category);
    }

    public function createTodo(User $user, $data)
    {
        return $this->todoRepository->createTodo($user, $data);
    }

    public function updateTodo(Todo $todo, $data)
    {
        return $this->todoRepository->updateTodo($todo, $data);
    }

    public function deleteTodo(Todo $todo)
    {
        return $this->todoRepository->deleteTodo($todo);
    }
}
