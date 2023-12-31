// Button status

const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      
      if(status) {
        url.searchParams.set("status", status);
      }
      else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    })
  })
}

const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    }
    else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
  let url = new URL(window.location.href);
  buttonsPagination.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    })
  })
}

// preview an Image 
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}
// end preview an Image 