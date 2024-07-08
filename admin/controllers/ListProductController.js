window.ListProductController = function ($scope,$http,$location) {
    var productUrl = "http://localhost:3000/product/"
    

    //call api
    $http.get(productUrl).then((res)=>{
       $scope.ListProducts = res.data;  
    }).catch(function (error) {
        console.log("Lỗi API");
    })
    //object sản phẩm
    $scope.data = {
        name:"",
        image: "",
        price: "",
        nguongoc: "",
        category: "",
        mota: "",
        taikhoan: localStorage.getItem("name")
    }
    
   // thêm sản phẩm
    $scope.submit = () => {
       if(checkEmpty()){
        $http.post(productUrl, angular.copy($scope.data)).then((res)=>{
            console.log(res.data);

            alert("Them thanh cong");   
        }).catch(function (error) {
            console.log("Lỗi API", error);
        })
       }
    }

        // $scope.submit = () => {
        //     if (checkEmpty()) {
        //         $http.get('http://localhost:3000/users')
        //             .then((response) => {
        //                 // Giả sử dữ liệu người dùng được trả về dưới dạng mảng users
        //                 var users = response.data;
        
        //                 var loggedInUser = users.find(user => user.role === '1');
        
        //                 if (loggedInUser) {
        //                     // Thêm thông tin tài khoản vào dữ liệu sản phẩm
        //                     $scope.data.createdBy = {
        //                         id: loggedInUser.id,
        //                         username: loggedInUser.username,
        //                         name: loggedInUser.name,
        //                         role: loggedInUser.role
        //                     };

        //                     $http.post(productUrl, angular.copy($scope.data))
        //                         .then((res) => {
        //                             console.log(res.data);
        
        //                             $scope.createdByName = loggedInUser.name; // Lưu tên người đăng bài vào biến createdByName
        
        //                             alert("Thêm sản phẩm thành công, được tạo bởi: " + $scope.createdByName);
        //                         })
        //                         .catch(function (error) {
        //                             console.log("Lỗi API", error);
        //                             alert("Đã xảy ra lỗi khi thêm sản phẩm");
        //                         });
        //                 } else {
        //                     // Xử lý khi không tìm thấy người dùng đăng nhập
        //                     console.log("Không tìm thấy người dùng đăng nhập");
        //                     alert("Vui lòng đăng nhập để thực hiện hành động này");
        //                 }
        //             })
        //             .catch(function (error) {
        //                 console.log("Lỗi API", error);
        //                 alert("Đã xảy ra lỗi khi lấy thông tin người dùng");
        //             });
        //     }
        // };
        
    


    //xóa sản phẩm
    $scope.delete = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            $http.delete(productUrl + id)
            .then((res) => {
                $scope.ListProducts = $scope.ListProducts.filter(product => product._id !== id);
                alert("Xóa thành công");
            }).catch(function (error) {
                console.log("Lỗi API", error);
            });
        }
    };

    //sửa
    $scope.idUpdate = '';
    $scope.updateProduct = (id) =>{
        $http.get(productUrl + id)
        .then(function (response) {
            $scope.data = response.data
            $scope.idUpdate = id
        })
        .catch(function (error) {
            console.log("Lỗi API");
        });
    }
    
    $scope.confirmUpdate = () =>{
        if(checkEmpty()){
            $http.patch(productUrl + $scope.idUpdate, angular.copy($scope.data))
            .then(function (response) {
                alert("Sửa Thành Công");
            })
            .catch(function (error) {
                console.log("Lỗi API");
            });

        }
    }

    //validate form
    $scope.validate = {
        name:false,
        image: false,
        price: false,
        nguongoc: false,
        category: false,
        mota: false
    }
    function checkEmpty(){
        $scope.validate.name = $scope.data.name == "" ? true : false;
        $scope.validate.image = $scope.data.image == "" ? true : false;
        $scope.validate.price = $scope.data.price == "" ? true : false;
        $scope.validate.nguongoc = $scope.data.nguongoc == "" ? true : false;
        $scope.validate.category = $scope.data.category == "" ? true : false;
        $scope.validate.mota = $scope.data.mota == "" ? true : false;
       
        if(!$scope.validate.name && !$scope.validate.image && !$scope.validate.price && !$scope.validate.nguongoc && !$scope.validate.category && !$scope.validate.mota){
            return true
        } else {
            return false
        }
    }


//cart
    // $scope.themgiohang = function (sp) {
    //     var index = myCart.findIndex(p => p.id == sp.id);
    //     if(index >= 0){
    //         myCart[index].soluong++;
    //     } else{
    //         var spInCart = { id: sp.id,name: sp.name,price:sp.price,image:sp.image,soluong: 1};
    //         myCart.push(spInCart);
    //     }
    //     console.log(myCart);
    // }

    var myCart = "http://localhost:3000/myCart/"

   

    $scope.themgiohang = function(sp){
       

        if(!localStorage.getItem("id")){
            alert("Bạn cần phải đăng nhập");
            $window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
        }else {
          //  $http.get(myCart).then((res)=>{
                // var myCartData = res.data
                // var index = myCartData.findIndex(p => p.id == sp.id); // Tìm kiếm trong dữ liệu
                // if (index >= 0) {
                // // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
                //  myCartData[index].soluong++;
                 

              //  } else {    
                        $scope.data = {
                            id: sp.id,
                            name: sp.name,
                            price:sp.price,
                            image: sp.image,
                            soluong:1 ,
                            id_user: localStorage.getItem("id")
                        };           
                        $http.post(myCart, angular.copy($scope.data))
                        .then(()=>{
                            alert("Thêm thành công")
                        })
           // }
          //   })

        }
    }

        $scope.tong = 0;
        //get cart list
        if(!localStorage.getItem("id")){
            alert("Bạn cần phải đăng nhập");
            $window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
        }else{   

            $http.get(myCart).then((res)=>{
                $scope.listCart = res.data

                //viết tính tổng
                $scope.listCart.forEach(function(item){
                    $scope.tong += item.price
                })
                    
                

            }).catch(function (error) {
                console.log("Lỗi API");
            })
        }

        //delete cart
        $scope.deleteCart = function(id) {
            let c = confirm("Bạn Muốn Xóa ? ");
            if (c) {
                $http.delete(myCart + id).then(() => {
                    alert("Xóa Thành Công");
                    $location.path("/myCart")
                });
            }
        }


        $scope.xoaAllCart = function() {
            let c = confirm("Bạn Muốn Xóa Tất Cả ?");
            if (c) {
    
                $scope.listCart.forEach(function(item) {
                    $http.delete(myCart + item.id).then(function() {
                        alert("Xóa thành công")
                    });
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
