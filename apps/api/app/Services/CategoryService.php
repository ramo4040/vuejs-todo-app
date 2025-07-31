<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use App\Models\User;
use App\Models\Category;

class CategoryService
{

    public function __construct(protected CategoryRepository $categoryRepository) {}

    public function getCategoriesWithTodosCount()
    {
        return $this->categoryRepository->getUserCategoriesWithTodosCount();
    }

    public function createCategory($data)
    {
        return $this->categoryRepository->createCategory($data);
    }

    public function updateCategory(Category $category, $data)
    {
        return $this->categoryRepository->updateCategory($category, $data);
    }

    public function deleteCategory(Category $category)
    {
        return $this->categoryRepository->deleteCategory($category);
    }
}
