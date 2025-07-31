<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use App\Services\AuthService;

class AuthController extends Controller
{

    public function __construct(protected AuthService $authService) {}

    public function register(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10448',
        ]);

        $result = $this->authService->register($data);

        return ApiResponse::success(
            'User registered successfully',
            201,
            $result
        );
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        $result = $this->authService->login($credentials);

        if (!$result) {
            return ApiResponse::unauthorized('Invalid credentials');
        }

        return ApiResponse::success(
            'Login successful',
            200,
            $result
        );
    }

    public function me()
    {
        $user = $this->authService->me();
        return ApiResponse::success(
            'User profile retrieved successfully',
            200,
            $user
        );
    }

    public function logout()
    {
        $this->authService->logout();
        return ApiResponse::success('Successfully logged out');
    }

    public function refresh()
    {
        $result = $this->authService->refresh();

        return ApiResponse::success(
            'Token refreshed successfully',
            200,
            $result
        );
    }
}
