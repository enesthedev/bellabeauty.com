<?php

namespace App\Actions\Admin;

use Inertia\Inertia;
use Inertia\Response;

class ShowOverviewPage
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/overview');
    }
}
