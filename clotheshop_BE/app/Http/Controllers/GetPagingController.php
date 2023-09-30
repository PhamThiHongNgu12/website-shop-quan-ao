<?php

namespace App\Http\Controllers;

use App\Http\BaseResponse;
use Illuminate\Http\Request;
use App\Models\Product;

class GetPagingController extends Controller
{
    public function getPaging(Request $req)
    {
        // for paging
        $pageNum = intval($req->query('page', '0'));
        $pageLength =  intval($req->query('pageLength', '5'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'ProductName';
        
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns) > 1) {
                $sortDir = $sortColumns[1];
            }
        }
        
        $pagingQuery = Product::with('category')->orderBy($sortColumn, $sortDir);
       
      
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('ProductName', 'LIKE', "%$q%")
                ->orWhere('CategoryID', 'LIKE', "%$q%");
               
            });
            // $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
            //     $query->where('CategoryName', 'LIKE', "%$q%");
               
            // });
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
    }
}