window.cartController = function($scope, $http, $location) {
    var api_cart = "http://localhost:3000/cart/";
    var api_pro = "http://localhost:3000/products/";
    var id_user = localStorage.getItem("id");

    $scope.Tong = 0;
    $scope.tontai = false;
    $scope.khongtontai = true;


    if (id_user) {

        $http.get(api_cart + "?id_user=" + id_user).then(function(response) {
            $scope.Cart_list = response.data;
            if (response.data.length  > 0) {
                $scope.tontai = true;
                $scope.khongtontai = false;
            }
        
            $scope.Cart_list.forEach(function(item) {
                $http.get(api_pro + item.id_pro).then(function(productResponse) {
                    item.productInfo = productResponse.data;
                    item.totalPrice = item.productInfo.price - (item.productInfo.price * item.productInfo.sale / 100);
                    item.price_tong = item.totalPrice * item.so_luong
                    $scope.Tong += item.price_tong;
                });
            });
        });
    } else {
        console.error('id_user không tồn tại trong localStorage');
    }

    $scope.updateCart = function() {

        $scope.Cart_list.forEach(function(item) {
            $http.patch(api_cart + item.id, angular.copy(item)).then(() => {

            })
        });

    }
    $scope.xoaCart = function(id) {
        let c = confirm("Bạn Muốn  Xóa Sản Phẩm Này  Chứ ? ");
        if (c) {
            $http.delete(api_cart + id).then(() => {
                alert("Xóa Thành Công ");
                $location.path("/cart")
            });
        }
    }
    $scope.xoaAllCart = function() {
        let c = confirm("Bạn Muốn  Xóa Tất Cả  ? ");
        if (c) {

            $scope.Cart_list.forEach(function(item) {
                $http.delete(api_cart + item.id).then(function() {

                });
            });


        }
    }
};