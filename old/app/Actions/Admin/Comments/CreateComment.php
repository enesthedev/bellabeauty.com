<?php

namespace App\Actions\Admin\Comments;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CreateComment
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'author' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ]);

        $comment = Comment::create([
            'author' => $validated['author'],
            'content' => $validated['content'],
            'rating' => $validated['rating'],
        ]);

        if ($request->hasFile('avatar')) {
            $comment->addMediaFromRequest('avatar')
                ->toMediaCollection('avatar');
        }

        return redirect()->route('admin.comments.index');
    }
}
