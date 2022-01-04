let rotate = document.getElementById("rotate");
rotate.addEventListener("click", function () {
  let img = document.getElementById("img");
  let list = img.classList;
  console.log(list);
  if (list.contains("rotated")) {
    list.remove("rotated");
    list.add("rotate");
  } else {
    list.remove("rotate");
    list.add("rotated");
  }
});
