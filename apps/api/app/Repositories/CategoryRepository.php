<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\User;

class CategoryRepository
{
    public function getUserCategoriesWithTodosCount(User $user)
    {
        return $user->categories()->withCount('todos')->orderBy('todos_count', 'desc')->get();
    }

    public function createCategory(User $user, $data)
    {
        return $user->categories()->create($data)->loadCount('todos');
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
