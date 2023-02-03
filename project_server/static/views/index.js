const searchForm = document.getElementById("search-form");
const result = document.getElementById("result");
const body = document.getElementsByTagName("body")[0];

function create(url) {
  const img_element = document.createElement("img");
  img_element.src = url;
  img_element.className = "display_img";
  result.appendChild(img_element);
}

function displayResults(gifs) {
  result.innerHTML = "";
  console.log("ここは動いてる？");
  for (const ele of gifs) {
    create(ele);
  }
}

async function pushButton() {
  const inputword = document.getElementById("word").value;
  const inputnum = document.getElementById("num").value;
  // const data = await fetch(
  //   "http://localhost:3000/search/" + inputword + "/" + inputnum
  // ).then(res => res.json());

  const data = await fetch(
    `http://localhost:3000/search?word=${inputword}&num=${inputnum}`
  ).then(res => res.json());

  console.log("サーバーからレスポンス返ってきたよ");
  const ele = data["searchresult"];
  displayResults(ele);
  return data;
}

//searchForm.addEventListener("submit", pushButton);
