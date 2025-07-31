<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    use AuthorizesRequests;


    public function __construct(protected CategoryService $categoryService) {}

    /**
     * Display a listing of the user's categories.
     */
    public function index()
    {
        $categories = $this->categoryService->getCategoriesWithTodosCount(Auth::user());
        return ApiResponse::success(
            'Categories retrieved successfully',
            200,
            $categories
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(Category::validationRules());
        $category = $this->categoryService->createCategory(Auth::user(), $validated);
        return ApiResponse::success(
            'Category created successfully',
            201,
            $category
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);
        $validated = $request->validate(Category::validationRules());
        $category = $this->categoryService->updateCategory($category, $validated);
        return ApiResponse::success(
            'Category updated successfully',
            200,
            $category
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);
        $this->categoryService->deleteCategory($category);
        return ApiResponse::success(
            'Category deleted successfully',
            200
        );
    }
}
