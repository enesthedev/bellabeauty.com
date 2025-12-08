<?php

namespace App\Actions\Admin\Comments;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class GetCommentsCount extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'count' => Comment::count(),
        ]);
    }
}
