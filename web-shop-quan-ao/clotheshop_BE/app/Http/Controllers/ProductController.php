<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Throwable;
use App\Http\BaseResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    private $rules = [
        'ProductName' => 'required|min:2',
        'CategoryID' => 'required',
        'Size' => 'required',
        'Quantity' => 'required',
        'Price' => 'required',
        'Color' => 'required',
        
    ];

    private $messages = [
        'ProductName.required' => 'Product name is required',
        'ProductName.min' => "Product name must at least 2 characters",
        'CategoryID.required' => "Category ID is required",
        'Size.required' => "Size is required",
        'Quantity.required' => "Quantity is required",
        'Price.required' => "Price is required",
    ];



    public function index($id = null)
    {
        if ($id == null) {
            $data = Product::with('category')->orderBy('ProductName', 'asc')->get();
            $data = $data->map(function ($item) {
                if ($item->Image) {
                    $item->Image = "http://localhost/clotheshop/public/data/images/" . $item->Image;
                }
                return $item;
            });
            return BaseResponse::withData($data);
        } else {
            $data = Product::with('category')->find($id);
            if ($data) {
                if ($data->Image) {
                    $data->Image = "http://localhost/clotheshop/public/data/images/" . $data->Image;
                }

                return BaseResponse::withData($data);
            } else {
                return BaseResponse::error(404, 'Data not found');
            }
        }
    }

    
    public function getByCategory($id, Request $req){
         // for paging
         $pagingQuery =Product::with('category')->orderBy('ProductName', 'asc')->where("CategoryID",$id);
         $pageNum = intval($req->query('page', '0'));
         $pageLength =  intval($req->query('pageLength', '5'));
         $q = $req->query('q', '');
         
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('ProductName', 'LIKE', "%$q%");
               
            });
           
        }
       
        
        $data = $pagingQuery->get();
        $data = $data->map(function ($item) {
            if ($item->Image) {
                $item->Image = "http://localhost/clotheshop/public/data/images/" . $item->Image;
            }
            return $item;
        });
        if ($pageLength > 0) {
            $pagingData = $data->forPage($pageNum + 1, $pageLength)->values();
            
        } else {
            $pagingData = $data;
           
           
        }
        if ($pageLength > 0) {
            $pagingInfo = [
                'page' => $pageNum,
                'pageLength' => $pageLength,
                'totalRecords' => $data->count(),
                'totalPages' => ceil($data->count()/$pageLength),
            ];
           
            
            return BaseResponse::withPaging($pagingInfo, $pagingData);
        } else {
            return BaseResponse::withData($pagingData);
        }
        return BaseResponse::withData($data);
        
    }
    public function create(Request $req)
    {
        $this->rules = array_merge(
            $this->rules,
            [
                'Image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]
        );
        $this->messages = array_merge($this->messages, [
            'Image.required' => 'Image is required.',
            'Image.image' => 'Should be an image.',
            'Image.mimes' => 'Image extension should be: jpeg,png,jpg,gif,svg.',
            'Image.max' => 'Image max is 2M.'
        ]);

        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            try {
                $data = new Product();
                $data->CategoryID = $req->input('CategoryID');
                $data->Size = $req->input('Size');
                $data->ProductName = $req->input('ProductName');
                $data->Quantity = $req->input('Quantity');
                $data->Price = $req->input('Price');
                $data->Color = $req->input('Color');
                $data->save();
                if ($req->hasFile('Image')) {
                    $filename = pathinfo($req->Image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName =  $data->ProductID . '_' . $filename . '_' . time() . '.' . $req->Image->extension();
                    $req->Image->move(public_path('data/images'), $imageName);
                    // update DB
                    $data->Image = $imageName;
                    $data->save();
                }
                return BaseResponse::withData($data);
            } catch (Throwable $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
    }
    public function update($id, Request $req)
    {
        $data = Product::find($id);
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if ($validator->fails()) {
            return BaseResponse::error(400, $validator->messages()->toJson());
        } else {
            if ($data) {
                try {
                    $data->CategoryID = $req->input('CategoryID');
                    $data->Size = $req->input('Size');
                    $data->ProductName = $req->input('ProductName');
                    $data->Quantity = $req->input('Quantity');
                    $data->Price = $req->input('Price');
                    $data->Color = $req->input('Color');
                    $data->save();
                    if ($req->hasFile('Image')) {
                        if (!empty($data->Image)) {
                            if (File::exists(public_path('data/images/') . $data->Image))
                                File::delete(public_path('data/images/') . $data->Image);
                        }
                        $filename = pathinfo($req->Image->getClientOriginalName(), PATHINFO_FILENAME);
                        $imageName =  $data->ProductID . '_' . $filename . '_' . time() . '.' . $req->Image->extension();
                        $req->Image->move(public_path('data/images'), $imageName);
                        // update DB
                        $data->Image = $imageName;
                        $data->save();
                    }
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
        $data = Product::find($id);
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