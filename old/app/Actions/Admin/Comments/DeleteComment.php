<?php

namespace App\Actions\Admin\Comments;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;

class DeleteComment
{
    public function __invoke(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return redirect()->route('admin.comments.index');
    }
}
