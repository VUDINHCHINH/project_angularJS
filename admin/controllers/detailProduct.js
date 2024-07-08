myApp.controller('detailProduct', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    
    var productId = $routeParams.id;

    $http.get("http://localhost:3000/product/" + productId)
        .then(function(response) {
            $scope.product = response.data;
        }, function(error) {
            console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        });
}]);
