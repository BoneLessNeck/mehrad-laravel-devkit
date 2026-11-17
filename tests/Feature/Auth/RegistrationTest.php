<?php

use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('registration validates duplicate email and password confirmation', function () {
    User::factory()->create(['email' => 'taken@example.com']);

    $response = $this->from('/register')->post('/register', [
        'name' => 'Another User',
        'email' => 'taken@example.com',
        'password' => 'password123',
        'password_confirmation' => 'mismatch123',
    ]);

    $response
        ->assertSessionHasErrors(['email', 'password'])
        ->assertRedirect('/register');

    $this->assertGuest();
});
