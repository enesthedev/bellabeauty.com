<?php

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests cannot access comments page', function () {
    $this->get(route('admin.comments.index'))->assertRedirect(route('login'));
});

test('authenticated users can view comments page', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get(route('admin.comments.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/comments/index'));
});

test('authenticated users can create a comment', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('admin.comments.store'), [
        'author' => 'Test Author',
        'content' => 'This is a test comment content.',
        'rating' => 5,
    ]);

    $response->assertRedirect(route('admin.comments.index'));
    $this->assertDatabaseHas('comments', [
        'author' => 'Test Author',
        'content' => 'This is a test comment content.',
        'rating' => 5,
    ]);
});

test('authenticated users can create a comment with avatar', function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('admin.comments.store'), [
        'author' => 'Test Author',
        'content' => 'This is a test comment with avatar.',
        'rating' => 4,
        'avatar' => UploadedFile::fake()->image('avatar.jpg'),
    ]);

    $response->assertRedirect(route('admin.comments.index'));
    $comment = Comment::where('author', 'Test Author')->first();
    expect($comment)->not->toBeNull();
    expect($comment->getFirstMediaUrl('avatar'))->not->toBeEmpty();
});

test('authenticated users can delete a comment', function () {
    $this->actingAs(User::factory()->create());

    $comment = Comment::create([
        'author' => 'Delete Test',
        'content' => 'This comment will be deleted.',
        'rating' => 3,
    ]);

    $response = $this->delete(route('admin.comments.destroy', $comment));

    $response->assertRedirect(route('admin.comments.index'));
    $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
});

test('validation works for creating comments', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('admin.comments.store'), [
        'author' => '',
        'content' => '',
        'rating' => 10,
    ]);

    $response->assertSessionHasErrors(['author', 'content', 'rating']);
});

test('comments are displayed on welcome page', function () {
    Comment::create([
        'author' => 'Public Test',
        'content' => 'This is a public comment.',
        'rating' => 5,
        'is_active' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('comments', 1)
        ->where('comments.0.author', 'Public Test')
    );
});

test('inactive comments are not displayed on welcome page', function () {
    Comment::create([
        'author' => 'Inactive Test',
        'content' => 'This comment should not appear.',
        'rating' => 5,
        'is_active' => false,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->has('comments', 0));
});
