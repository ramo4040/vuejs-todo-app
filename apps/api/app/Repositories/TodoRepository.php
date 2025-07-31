<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TodoRepository
{
    public function getTodosByCategory($category)
    {
        return $category->todos()->orderBy('created_at', 'desc')->get();
    }

    public function createTodo($data)
    {
        $todo =  Auth::user()->todos()->create($data);
        $todo->load('category');
        return $todo;
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
