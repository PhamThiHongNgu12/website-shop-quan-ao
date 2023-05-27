<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Throwable;
use App\Http\BaseResponse;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    private $rules = [
        'CategoryName' => 'required|min:2'
    ];

    private $messages = [
        'CategoryName.required' => 'Category name is required',
        'CategoryName.min' => "Category name must at least 2 characters"
    ];




    public function index($id = null)
    {
        if ($id == null) {
            $data = Category::orderBy('CategoryName', 'asc')->get();
            return BaseResponse::withData($data);
        } else {
            $data = Category::find($id);
            if ($data) {
                return BaseResponse::withData($data);
            } else {
                return BaseResponse::error(404, 'Data not found');
            }
        }
    }

    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            try {
                $data = new Category();
                $data->CategoryName = $req->input('CategoryName');
                $data->save();
                return  BaseResponse::withData($data);
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
    }
    public function update($id, Request $req)
    {
        $data = Category::find($id);
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            if ($data) {
                try {
                    $data->CategoryName = $req->input('CategoryName');
                    $data->save();
                    return BaseResponse::withData($data);
                } catch (Throwable $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }
            } else {
                return BaseResponse::error(404, 'Data not found');
            }
        }
    }

    public function delete($id)
    {
        $data = Category::find($id);
        if ($data) {
            try {
                $data->delete();
                return BaseResponse::withData($data);
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        } else {
            return BaseResponse::error(404, 'Data not found');
        }
    }
}
