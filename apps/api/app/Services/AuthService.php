<?php

namespace App\Services;

use App\Repositories\AuthRepository;
use App\Repositories\UserRepository;

class AuthService
{
    public function __construct(protected AuthRepository $authRepository, protected UserRepository $userRepository) {}

    public function register(array $data)
    {

        if (isset($data['image'])) {
            $imagePath = $data['image']->store('images', 'public');
            $data['image'] = $imagePath;
        }
        return $this->authRepository->register($data);
    }

    public function login(array $credentials)
    {
        return $this->authRepository->login($credentials);
    }

    public function me()
    {
        return $this->userRepository->getUser();
    }

    public function logout()
    {
        $this->authRepository->logout();
    }

    public function refresh()
    {
        return $this->authRepository->refresh();
    }
}
