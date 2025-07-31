<?php

namespace App\Services;

use App\Repositories\NotificationRepository;

class NotificationService
{
    public function __construct(protected NotificationRepository $notificationRepository) {}

    public function getUnreadCount()
    {
        return $this->notificationRepository->getUnreadCount();
    }

    public function getNotificationsPaginated($perPage = 10)
    {
        return $this->notificationRepository->getNotificationsPaginated($perPage);
    }
}
