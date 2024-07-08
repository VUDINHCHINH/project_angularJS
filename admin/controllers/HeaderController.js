myApp.controller("header", function($scope) {

    if(!localStorage.getItem("id")){
        $scope.showHello = false;
        $scope.taiKhoanSuccess = false;
        $scope.taiKhoanFail = true;
    }else{
        $scope.showHello = true;
        $scope.taiKhoanSuccess = true;
        $scope.taiKhoanFail = false;
        $scope.nameAccount = localStorage.getItem("name");
    }

    
    $scope.logout = () =>{
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        window.location.href = "../login.html"
    }
});