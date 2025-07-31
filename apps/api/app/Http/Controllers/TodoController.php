<?php

namespace App\Http\Controllers;

use App\Events\TodoCreated;
use App\Http\Responses\ApiResponse;
use App\Models\Todo;
use App\Models\Category;
use App\Services\TodoService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TodoController extends Controller
{
    use AuthorizesRequests;


    public function __construct(protected TodoService $todoService) {}

    /**
     * Display a listing of todos for a specific category.
     */
    public function index(Category $category): JsonResponse
    {
        $this->authorize('view', $category);
        $todos = $this->todoService->getTodosByCategory($category);
        return ApiResponse::success(
            'Todos retrieved successfully',
            200,
            $todos
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            "is_completed" => 'boolean',
            'category_id' => [
                'required',
                'exists:categories,id',
                Rule::exists('categories', 'id')->where('user_id', Auth::user()->id)
            ],
        ]);

        $todo = $this->todoService->createTodo(Auth::user(), $data);

        event(new TodoCreated($todo));
        return ApiResponse::success(
            'Todo created successfully',
            201,
            $todo
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $this->authorize('update', $todo);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|boolean',
            'category_id' => [
                'sometimes',
                'required',
                'exists:categories,id',
                Rule::exists('categories', 'id')->where('user_id', Auth::user()->id)
            ],
        ]);

        $todo = $this->todoService->updateTodo($todo, $data);

        return ApiResponse::success(
            'Todo updated successfully',
            200,
            $todo
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo): JsonResponse
    {
        $this->authorize('delete', $todo);

        $this->todoService->deleteTodo($todo);

        return ApiResponse::success(
            'Todo deleted successfully',
            200
        );
    }
}
