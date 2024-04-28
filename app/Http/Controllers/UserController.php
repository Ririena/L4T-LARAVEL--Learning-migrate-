<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            "full_name" => 'required',
            "bio" => 'required|max:100',
            "username" => 'required|min:3|alpha_dash|unique:users,username',
            "password" => 'required|min:6'
        ]);

        $user =  User::create([
            "full_name" => $request->full_name,
            "bio" => $request->bio,
            "username" => $request->username,
            "password" => Hash::make($request->password)
        ]);

        return response()->json([
            "status" => true,
            "message" => "User Registered Successfully",
            "user" => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|min:3',
            "password" => 'required'
        ]);

        $token = JWTAuth::attempt([
            "username" => $request->username,
            "password" => $request->password
        ]);

        if (!empty($token)) {
            return response()->json([
                "status" => true,
                "message" => "User Logged In Succesfully",
                "token" => $token
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Invalid Password Or Email",
            ], 401);
        }
    }

    public function profile()
    {
        $userdata = auth()->user();



        return response()->json([
            "status" => true,
            "message" => "ProfileData",
            "data" => $userdata
        ]);
    }
    public function logout(Request $request)
    {
        if (!auth()->check()) {
            return response()->json([
                "message" => "Unauthenticated."
            ], 401);
        } else {
            auth()->logout();

            return response()->json([
                "message" => "Logout success"
            ], 200);
        }
    }

    public function title(Request $request)
    {
        try {
            $user = auth()->user();
            $request->validate([
                'title' => 'required|string|max:255'
            ]);

            $user->title = $request->input('title');
            $user->save();

            return response()->json([
                "status" => true,
                "newTitle" => $user->title,
                "message" => "Title Updated Successfully"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "Failed to update title. Please try again."
            ], 500);
        }
    }

    public function getTitle(Request $request)
    {
        try {
            $user = auth()->user();

            if ($user) {
                $title = $user->title;

                return response()->json([
                    'status' => true,
                    'title' => $title,
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found.'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch user title.',
            ], 500);
        }
    }

}
