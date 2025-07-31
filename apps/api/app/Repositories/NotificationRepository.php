<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;

class NotificationRepository
{
    public function getUnreadCount()
    {
        return Auth::user()->unreadNotifications()->count();
    }

    public function getNotificationsPaginated($perPage = 10)
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();

        $notifications = $user->notifications()->cursorPaginate($perPage);
        $notifications->getCollection()->transform(function ($notification) {
            return [
                'id' => $notification->id,
                'data' => $notification->data,
                'created_at' => $notification->created_at,
            ];
        });
        return $notifications;
    }
}
