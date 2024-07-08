window.ListUser = function ($scope,$http) {
    var productUrlUser = "http://localhost:3000/users/"


    //call api
    $http.get(productUrlUser).then((res)=>{
        $scope.ListUser = res.data
    }).catch(function (error) {
        console.log("Lỗi API", error);
    })

    $scope.deleteUser = (id) =>{
        if(confirm("Are you sure you want to delete")){
            $http.delete(productUrlUser + id)
            .then((res)=>{
                $scope.ListUser = $scope.ListUser.filter(user => user._id !== id);
                alert("Xóa thành công");
            }).catch(function (error) {
                console.log("Lỗi API", error);
            });
        }
    }

     //lọc sự kiện click
     $scope.columName = "";
     $scope.reverse = true;
     $scope.sortData = function (tenCot) {
         if ($scope.columName != tenCot) {
         $scope.columName = tenCot;
         $scope.reverse = true;
         } else {
         $scope.reverse = !$scope.reverse;
         }
     };
}