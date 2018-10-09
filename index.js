//listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmarks);

function saveBookmarks(event) {
  event.preventDefault();
  //get form val
  const siteName = document.getElementById("siteName").value;
  const siteUrl = document.getElementById("siteUrl").value;
  //   console.log(siteName);

  //validate url input
  if (!_validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };
  //local storage test
  //   localStorage.setItem("bookmarks", JSON.stringify(bookmark));
  if (localStorage.getItem("bookmarks") === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add bookmark to array
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  _fetchBookmarks();

  //reset the form after adding a bookmark
  document.getElementById("myForm").reset();
}

_validateForm = (siteName, siteUrl) => {
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteName || !siteUrl) {
    alert("please fill in the form");
    return false;
  }

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
};

_fetchBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //   console.log(bookmarks);

  //get output id
  const bookmarkResults = document.getElementById("bookmarkResults");

  //build output
  bookmarkResults.innerHTML = "";
  bookmarks.forEach(element => {
    const name = element.name;
    const url = element.url;
    bookmarkResults.innerHTML +=
      '<div class="wells">' +
      "<h3>" +
      name +
      ' <a class="btn btn-primary" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onclick=\"_deleteBookmarks('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  });
};

_deleteBookmarks = url => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //remove index of bookmarks array with matching url
  bookmarks.forEach((element, index, obj) => {
    if (element.url === url) {
      obj.splice(index, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //refetch bookmarks
  _fetchBookmarks();
};
