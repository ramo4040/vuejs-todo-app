<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the user's categories.
     */
    public function index()
    {
        $categories = Auth::user()->categories()->withCount('todos')->latest()->get();

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

        $category = Auth::user()->categories()->create($validated);

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

        $category->update($validated);

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

        $category->delete();

        return ApiResponse::success(
            'Category deleted successfully',
            200
        );
    }
}
