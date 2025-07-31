<?php

namespace App\Repositories;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthRepository
{
    public function register($data)
    {
        $user = User::create($data);
        $token = JWTAuth::fromUser($user);
        return [
            'access_token' => $token,
            'user' => $user,
        ];
    }

    public function login($credentials)
    {
        if (!$token = Auth::attempt($credentials)) {
            return false;
        }

        return [
            'access_token' => $token,
            'user' => Auth::user(),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ];
    }

    public function logout()
    {
        Auth::logout();
    }

    public function refresh()
    {
        return [
            'access_token' => Auth::refresh(),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ];
    }
}
