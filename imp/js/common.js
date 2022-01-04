function range(block, str) {
  let old = block.getElementsByTagName("span")[0];
  let input = block.getElementsByTagName("input")[0];
  old.innerHTML = input.value;
  let value = input.value;
  let img = document.getElementById("img");
  let styles = img.style.filter.split(" ");
  styles = styles.filter((cur) => !cur.startsWith(str));
  styles.push(str + "(" + value + ")");
  console.log(styles);
  img.style.filter = styles.join(" ");
}

let filters = [
  "brightness",
  "opacity",
  "saturate",
  "invert",
  "contrast",
  "grayscale",
  "sepia",
];

filters.forEach((cur) => {
  let block = document.getElementById(cur);
  block
    .getElementsByTagName("input")[0]
    .addEventListener("change", () => range(block, cur));
});
