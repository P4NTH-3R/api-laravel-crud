<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_crud_endpoints()
    {
        $payload = [
            'name' => 'Feature Student',
            'course' => 'Science',
            'email' => 'feature@example.com',
            'phone' => '5551234567',
        ];

        // Create
        $create = $this->postJson('/api/students', $payload);
        $create->assertStatus(200)->assertJson(['status' => 200]);

        // Ensure created in database
        $this->assertDatabaseHas('students', ['email' => $payload['email']]);

        // List
        $list = $this->getJson('/api/students');
        $list->assertStatus(200)->assertJsonStructure(['status', 'students']);

        $id = $list->json('students.0.id');
        $this->assertNotNull($id);

        // Show
        $show = $this->getJson("/api/students/{$id}");
        $show->assertStatus(200)->assertJsonPath('student.email', $payload['email']);

        // Update
        $update = $this->putJson("/api/students/{$id}/edit", ['name' => 'Feature Updated']);
        $update->assertStatus(200)->assertJson(['status' => 200]);
        $this->assertDatabaseHas('students', ['id' => $id, 'name' => 'Feature Updated']);

        // Delete
        $delete = $this->deleteJson("/api/students/{$id}/delete");
        $delete->assertStatus(200)->assertJson(['status' => 200]);
        $this->assertDatabaseMissing('students', ['id' => $id]);
    }
}
