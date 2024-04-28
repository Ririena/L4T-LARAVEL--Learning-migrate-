<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Mengirim pesan baru.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        try {

            $user = User::findOrFail($request->receiver_id);


            $message = new Message([
                'receiver_id' => $user->id,
                'title' => $user->title,
                'message' => $request->message,
            ]);

            $message->save();

            return response()->json([
                'status' => true,
                'message' => 'Message sent successfully.',
                'data' => $message,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to send message.',
            ], 500);
        }
    }

    public function getTitle(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
        ]);

        try {
            $user = auth()->user();

            return response()->json([
                "status" => true,
                "message" => "Success",
                "title" => $user->title,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                "status" => false,
                "message" => "User not found.",
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "Failed to get user title.",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    public function getAllMessage(Request $request)
    {
        try {

            $request->validate([
                'receiver_id' => 'required|exists:users,id',
            ]);
            $user = User::findOrFail($request->receiver_id);

            $messages = Message::where('receiver_id', $user->id)->get();

            return response()->json([
                'status' => true,
                'message' => 'Messages retrieved successfully.',
                'data' => $messages,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve messages.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getOne(Request $request, $message_id)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
        ]);
        try {

            $message = Message::findOrFail($message_id);


            $user = User::findOrFail($request->receiver_id);
            if ($user->id !== $message->receiver_id) {
                return response()->json([
                    'status' => false,
                    'message' => 'You are not authorized to access this message.',
                ], 403);
            }

            return response()->json([
                'status' => true,
                'message' => 'Message retrieved successfully.',
                'data' => $message,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Message not found.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve message.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
