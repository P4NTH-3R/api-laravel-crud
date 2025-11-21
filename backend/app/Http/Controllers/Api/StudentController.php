<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();

        return response()->json(['status' => 200, 'students' => $students]);
    }

    public function store(Request $request)
    {
        $student = Student::create($request->all());

        return response()->json(['status' => 200, 'message' => 'Student Created Successfully']);
    }

    public function show($id)
    {
        $student = Student::find($id);

        return response()->json(['status' => 200, 'student' => $student]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        $student->update($request->all());

        return response()->json(['status' => 200, 'message' => 'Student Updated Successfully']);
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        $student->delete();

        return response()->json(['status' => 200, 'message' => 'Student Deleted Successfully']);
    }
}
