<?php

use App\Models\User;

test('welcome page can be rendered', function () {
    $this->get('/')->assertOk();
});

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/dashboard')->assertOk();
});
