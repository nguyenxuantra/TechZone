

API KPI tổng quan 
endpoint: /admin/statistics/overview
method: GEt

response mẫu trả về: 
{
    "code": 200,
    "message": "Lấy KPI tổng quan thành công",
    "result": {
        "totalUsers": 2,
        "totalOrders": 0,
        "totalRevenue": 0,
        "totalProducts": 10,
        "newUsersToday": 1,
        "ordersToday": 0,
        "revenueToday": 0
    }
}


API thống kê theo thời gian
endpoint: /admin/statistics/time
method: GEt

request param: 
 @RequestParam(value = "fromDate", required = false) String fromDate,
            @RequestParam(value = "toDate", required = false) String toDate,
            @RequestParam(value = "groupBy", defaultValue = "DAY") String groupBy
groupBy value : DAY, MONTH, YEAR
fromDate và toDate có định dạng: yyyy-MM-dd 
response mẫu trả về: 
{
    "code": 200,
    "message": "Lấy thống kê theo thời gian thành công",
    "result": [
		{ "date": "2025-01-01", "revenue": 5000000 },
  		{ "date": "2025-01-02", "revenue": 7200000 },
 		 { "date": "2025-01-03", "revenue": 6300000 }

	]
}
 

yêu cầu: Tạo giao quản lý thống kê bên admin và đấu nối hai api này 
+ tạo Một trang quản lý thống kê bên admin 
+ API KPI tổng quan tạo giao diện kiểu overview
+ API thống kê theo thời gian tạo biểu đồ

-tạo giao diện phù hợp với website thời trang nam
