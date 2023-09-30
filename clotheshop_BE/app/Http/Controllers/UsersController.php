<?php

namespace App\Http\Controllers;

use App\Http\BaseResponse;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;

class UsersController extends Controller
{
    private $rules = [
        'username' => 'required|min:3',
        'name' => 'required|min:2',
        'email' => 'email',
        'phone' => 'size:10'
    ];

    private $messages = [
        'username.required' => 'User name is required',
        'username.min' => "User name must at least 2 characters",
        'name.required' => 'Name is required',
        'name.min' => "Name must at least 2 characters",
        'email.email' => 'Email format is invalid',
        'phone.size' => 'Must be cell phone number'
    ];

    public function login(Request $req)
    {
        $data = ['username' => $req->username, 'password' => $req->password];
        if (auth()->attempt($data)) {
            $user = auth()->user();
            $token = hash('sha256', now() . Str::random(60));
            $user->forceFill(['api_token' =>  $token])->save();
            $data = [
                'id' => $user->id, 'username' => $user->username,
                'fullName' => $user->name, 'token' => $token
            ];
            return BaseResponse::withData($data);
        } else {
            return BaseResponse::error(1, "Wrong user name or password");
        }
    }
    public function index($id = null)
    {
        if ($id == null) {
            return User::orderBy('username', 'asc')->get();
        } else {
            $data = User::find($id);
            if ($data) {
                return $data;
            } else {
                return response()->json(['message' => 'Data not found.'], 404);
            }
        }
    }

    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            try {
                $data = new User();
                $data->username = $req->input('username');
                $data->name = $req->input('name');
                $data->email = $req->input('email');
                $data->phone = $req->input('phone');
                $data->password = bcrypt($req->input('password'));
                $data->Role = $req->input('Role');
                $data->save();
                return $data;
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
    }
    public function update($id, Request $req)
    {
        $data = User::find($id);
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            if ($data) {
                try {
                    $data->username = $req->input('username');
                    $data->name = $req->input('name');
                    $data->email = $req->input('email');
                    $data->phone = $req->input('phone');
                    $data->password = bcrypt($req->input('password'));
                    $data->Role = $req->input('Role');
                    $data->save();
                    return $data;
                } catch (Throwable $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }
            } else {
                return response()->json(['message' => 'Data not found'], 404);
            }
        }
    }

    public function delete($id)
    {
        $data = User::find($id);
        if ($data) {
            try {
                $data->delete();
                return $data;
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }
}
