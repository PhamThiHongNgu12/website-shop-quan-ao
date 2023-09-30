<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Throwable;

class CartController extends Controller
{
    public function index($id = null)
    {
        if ($id == null) {
            return Cart::orderBy('CategoryName', 'asc')->get();
        } else {
            $data = Cart::find($id);
            if ($data) {
                return $data;
            } else {
                return response()->json(['message' => 'Data not found.'], 404);
            }
        }
    }

    public function create(Request $req)
    {
        try {
            $data = new Cart();
            $data->CategoryName = $req->input('CategoryName');
            $data->save();
            return $data;
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function update($id, Request $req)
    {
        $data = Cart::find($id);
        if ($data) {
            try {
                $data->CategoryName = $req->input('CategoryName');
                $data->save();
                return $data;
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    public function delete($id)
    {
        $data = Cart::find($id);
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
