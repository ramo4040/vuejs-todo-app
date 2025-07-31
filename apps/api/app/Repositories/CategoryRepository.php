<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CategoryRepository
{
    public function getUserCategoriesWithTodosCount()
    {
        return Auth::user()->categories()->withCount('todos')->orderBy('todos_count', 'desc')->get();
    }

    public function createCategory($data)
    {
        return Auth::user()->categories()->create($data)->loadCount('todos');
    }

    public function updateCategory(Category $category, $data)
    {
        $category->update($data);
        return $category->fresh()->loadCount('todos');
    }

    public function deleteCategory(Category $category)
    {
        return $category->delete();
    }
}
