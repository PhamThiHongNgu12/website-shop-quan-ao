<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use Illuminate\Support\Str;

class MemberController extends Controller
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
    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            try {
                $data = new Member();
                $data->username = $req->input('username');
                $data->name = $req->input('name');
                $data->email = $req->input('email');
                $data->phone = $req->input('phone');
                $data->password = bcrypt($req->input('password'));
                $data->save();
                 return  BaseResponse::withData($data);
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
    }
    public function login(Request $req)
    {
        $data = ['username' => $req->username, 'password' => $req->password];
        if ((auth('member')->attempt($data))) {
            $member = auth('member')->user();
            $member->tokens()->delete();
            $token = $member->createToken('ApiToken')->plainTextToken;
            $authToken = explode('|', $token)[1];

            $data = [
                'id' => $member->id, 'username' => $member->username,
                'fullName' => $member->name, 'token' => $authToken
            ];
            return BaseResponse::withData($data);
        } else {
            return BaseResponse::error(1, "Wrong user name or password");
        }
    }
    public function profile(Request $req)
    {
        $member = $req->user();
        return BaseResponse::withData($member);
    }
}