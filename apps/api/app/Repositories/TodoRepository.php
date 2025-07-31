<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Models\User;

class TodoRepository
{
    public function getTodosByCategory($category)
    {
        return $category->todos()->orderBy('created_at', 'desc')->get();
    }

    public function createTodo(User $user, $data)
    {
        $user =  $user->todos()->create($data);
        $user->load('category');
        return $user;
    }

    public function updateTodo(Todo $todo, $data)
    {
        $todo->update($data);
        return $todo->fresh();
    }

    public function deleteTodo(Todo $todo)
    {
        return $todo->delete();
    }
}
