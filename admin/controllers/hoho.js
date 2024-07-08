$scope.addCart = function() {
        $scope.data_cart = {
            id_pro: id,
            so_luong: $scope.sl,
            id_user: localStorage.getItem("id")
        };
        var api_cart = "http://localhost:3000/cart/"
        if (localStorage.getItem("id") == undefined) {
            alert("Bạn Phải Đăng Nhập ")
        } else {
            $http.get(api_cart).then(function(response) {
                $scope.cart = response.data;
                if (check_cart()) {
                    let updatedQuantity = $scope.sl_new + $scope.sl;
                    console.log(updatedQuantity);
                    // Gửi yêu cầu PATCH để cập nhật số lượng sản phẩm
                    $http.patch(api_cart + $scope.id_cart, { so_luong: updatedQuantity }).then(function(response) {
                      
                    })
                } else {
                    $http.post(api_cart , angular.copy( $scope.data_cart)).then(function(response) {
                        alert("Thêm Vào Giỏ Thành Công");
                    }).catch(function(error) {
                        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
                    });
                }
            });
        }
    }

    function check_cart() {
        if (!$scope.cart) {
            return false;
        }
        let kq = false;
        $scope.cart.forEach(val => {
            if (val.id_pro == id) {
                $scope.id_cart = val.id;
                $scope.sl_new = val.so_luong;
                kq = true;
            }
        })
        return kq;
    }