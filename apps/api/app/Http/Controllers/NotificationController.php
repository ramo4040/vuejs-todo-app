<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(protected NotificationService $notificationService) {}

    public function unreadCount(): JsonResponse
    {
        $count = $this->notificationService->getUnreadCount();
        return ApiResponse::success(
            'Todos retrieved successfully',
            200,
            ['unread_count' => $count]
        );
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 10);

        $notifications = $this->notificationService->getNotificationsPaginated($perPage);
        return ApiResponse::success(
            'Todos retrieved successfully',
            200,
            $notifications
        );
    }
}
