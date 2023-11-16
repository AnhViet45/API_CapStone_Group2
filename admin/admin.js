var idEdit = null;
var productsList = []; 

// 1. gọi api lấy danh sách sp từ server
function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      productsList = res.data;
      renderProductList(productsList);
      console.log("productsList", productsList);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });
}

fetchProductList();

// 2. xoá 1 sp trên server
function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      // gọi lại api lấy ds sp mới nhất từ server sau khi xoá thành công
      fetchProductList();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

// 3. add new product 
function createProduct() {
  var product = getDataForm();

  // Check validation of input field
  var isValid;
  isValid = checkEmpty(product.name, "tbName");
  isValid &= checkEmpty(product.price, "tbPrice");
  isValid &= checkEmpty(product.screen, "tbScreen");
  isValid &= checkEmpty(product.backCamera, "tbBackCam");
  isValid &= checkEmpty(product.frontCamera, "tbFrontCam");
  isValid &= checkEmpty(product.img, "tbLink");
  isValid &= checkEmpty(product.desc, "tbDesc");
  isValid &= checkBrand(product.type, "tbBrand"); 

  if (isValid) {
    axios({
      url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
      method: "POST",
      data: product,
    })
      .then(function (res) {
        fetchProductList();

        // reset form sau khi thêm thành công
        document.getElementById("myForm").reset();
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }
  
}

// 4. edit product 
function editProduct(id) {
  // show modal when pressing Edit button
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  myModal.show(); 

  // Hide "Add Phone" button and display "update" button  when edit product
  document.getElementById("btnUpdate").style.display = "block";
  document.getElementById("btnAddPhone").style.display = "none";

  idEdit = id; 

  axios({
    url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${id}`,
    method: "GET"
  }).then((res) => {
    document.getElementById("name").value = res.data.name; 
    document.getElementById("price").value = res.data.price; 
    document.getElementById("screen").value = res.data.screen; 
    document.getElementById("backCam").value = res.data.backCamera; 
    document.getElementById("frontCam").value = res.data.frontCamera; 
    document.getElementById("link").value = res.data.img; 
    document.getElementById("desc").value = res.data.desc; 
    document.getElementById("brand").value = res.data.type; 

  }).catch((err) => {
    console.log("err", err);
  });
}

// 5. update product
function updateProduct() {
  var updatedPhone = getDataForm();

  // Check validation of input field
  var isValid = true;
  isValid &= checkEmpty(updatedPhone.name, "tbName");
  isValid &= checkEmpty(updatedPhone.price, "tbPrice");
  isValid &= checkEmpty(updatedPhone.screen, "tbScreen");
  isValid &= checkEmpty(updatedPhone.backCamera, "tbBackCam");
  isValid &= checkEmpty(updatedPhone.frontCamera, "tbFrontCam");
  isValid &= checkEmpty(updatedPhone.img, "tbLink");
  isValid &= checkEmpty(updatedPhone.desc, "tbDesc");
  isValid &= checkBrand(updatedPhone.type, "tbBrand");

  if (isValid) {
    axios({
      url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${idEdit}`,
      method: "PUT",
      data: updatedPhone
    }).then((result) => {
      console.log(result.data);
      
      // clear the form 
      document.getElementById("myForm").reset();

      fetchProductList();
    }).catch((err) => {
      console.log(err);
    });
  }


}

// 6. sort product by price 
function sortProductsAscending() {
  console.log("Sorting products ascending");
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      AsSorting(res.data);
      console.log(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });

}

function sortProductsDescending() {
  console.log("Sorting products Descending");
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      DesSorting(res.data);
      console.log(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });

}

// 7. Search products by name
function searchByName() {
  // get input value
  var inputValue = document.getElementById("inputSearch").value.toUpperCase();
  // get all rows of tbody  
  var trBody = document.getElementById("tblDanhSachSP").getElementsByTagName("tr");

  for (var i = 0; i < trBody.length; i++) {
    // dom to column name of table 
    var tdName = trBody[i].getElementsByTagName("td")[1];

    if (tdName) {
      // get text value of tdName
      var txtName = tdName.innerText;
      
      if (txtName.toUpperCase().indexOf(inputValue) > -1) {
        trBody[i].style.display = "";
      } else {
        trBody[i].style.display = "none";
      }
    }
  }
}