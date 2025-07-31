<?php

namespace App\Events;

use App\Models\Todo;
use App\Notifications\TaskCreatedNotification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TodoCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $desc;

    public function __construct(public Todo $todo)
    {
        $title = $todo->title;
        $category = $todo->category->name;
        $this->desc = 'Title: ' . mb_substr($title, 0, 50) . (mb_strlen($title) > 50 ? '...' : '') . ' | Category: ' . $category;
        $todo->user->notify(new TaskCreatedNotification($this->desc));
    }

    public function broadcastOn()
    {
        return new Channel('todos');
    }

    public function broadcastAs()
    {
        return 'task.created';
    }

    public function broadcastWith()
    {

        return [
            'description' => $this->desc,
            'message' => 'Todo created successfully',
        ];
    }
}
