<?php

use App\Actions\Admin\Comments\CreateComment;
use App\Actions\Admin\Comments\DeleteComment;
use App\Actions\Admin\Comments\GetCommentsCount;
use App\Actions\Admin\Comments\ShowCommentsPage;
use App\Actions\Admin\Settings\DeleteProfile;
use App\Actions\Admin\Settings\ShowPasswordPage;
use App\Actions\Admin\Settings\ShowProfilePage;
use App\Actions\Admin\Settings\UpdatePassword;
use App\Actions\Admin\Settings\UpdateProfile;
use App\Actions\Admin\ShowOverviewPage;
use App\Actions\ShowWelcomePage;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowWelcomePage::class)->name('home');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', ShowOverviewPage::class)->name('overview');
    Route::get('/comments', ShowCommentsPage::class)->name('comments.index');
    Route::get('/comments/count', GetCommentsCount::class)->name('comments.count');
    Route::post('/comments', CreateComment::class)->name('comments.store');
    Route::delete('/comments/{comment}', DeleteComment::class)->name('comments.destroy');
});

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', ShowProfilePage::class)->name('profile.edit');
    Route::patch('settings/profile', UpdateProfile::class)->name('profile.update');
    Route::delete('settings/profile', DeleteProfile::class)->name('profile.destroy');

    Route::get('settings/password', ShowPasswordPage::class)->name('user-password.edit');

    Route::put('settings/password', UpdatePassword::class)
        ->middleware('throttle:6,1')
        ->name('user-password.update');
});
