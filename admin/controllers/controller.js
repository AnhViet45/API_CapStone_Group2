function renderProductList(productArr) {
  var contentHTML = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    var trString = `
      <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <img src=${product.img} alt="..." style="width: 50px" />
                  </td>
                  <td>${product.desc}</td>
                  <td>
                    <button
                    onclick=editProduct(${product.id})
                    class="btn btn-warning mx-1">Edit</button>
                    <button
                    onclick=deleteProduct(${product.id})
                    class="btn btn-danger">Delete</button>
                  </td>       
      </tr>
      `;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}

function getDataForm() {
  var ten = document.getElementById("name").value;
  var gia = document.getElementById("price").value;
  var manHinh = document.getElementById("screen").value; 
  var backCam = document.getElementById("backCam").value; 
  var frontCam = document.getElementById("frontCam").value; 
  var hinhAnh = document.getElementById("link").value;
  var moTa = document.getElementById("desc").value;
  var brand = document.getElementById("brand").value;

  return {
    name: ten,
    price: gia,
    screen: manHinh,
    backCamera: backCam,
    frontCamera: frontCam,
    img: hinhAnh,
    desc: moTa,
    type: brand
  };
}

function AsSorting(productArr) {
  var sortedArr = productArr.sort((a, b) => a.price - b.price);

  renderProductList(sortedArr);
}

function DesSorting(productArr) {
  var sortedArr = productArr.sort((a, b) => b.price - a.price);

  renderProductList(sortedArr); 
}

// reset form when click Close button 
function resetForm() {
  document.getElementById("myForm").reset();
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAddPhone").style.display = "block";
}