//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e)
{
  //Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
  // console.log(siteName);
  // console.log(siteUrl);

  if(!validateForm(siteName, siteUrl))
    return;
  //We want to submit this to local storage - Local Storage only stores string
  var bookmark =
  {
    name: siteName,
    url: siteUrl
  }
  // console.log(bookmark);

  /*
  //HTML5 Local Storage operations
  localStorage.setItem('test', 'Hello World');

  //To get stuff from console
  console.log(localStorage.getItem('test'));

  //To remove item from localStorage
  localStorage.removeItem('test');
  */

  //JS comparison operators -
  //http://www.c-point.com/javascript_tutorial/jsgrpComparison.htm

  var bookmarks = [];

  //localStorage.getItem('bookmarks') can also be written as localStorage.bookmarks
  if(localStorage.getItem('bookmarks') === null) //
  {
      //Key does not exist
      //Initialize array for it
      //[{"name": "Site1", "url":"Url1"}, {},.... ]
      bookmarks.push(bookmark);
  }
  else
  {
      bookmarks = JSON.parse(localStorage.bookmarks);
      bookmarks.push(bookmark);
  }

  //We need to convert the JSON array into a string, since local storage only accepts strings
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Update the UI
  fetchBookmarks();

  //Clear the form
  document.getElementById('myForm').reset();

  //Prevent form from submitting
  e.preventDefault();
}

function fetchBookmarks()
{
  var bookmarks = JSON.parse(localStorage.bookmarks);

  //This is the HTML div where we want to set the result
  var results = document.getElementById('bookmarksResults');

  results.innerHTML = '';
  for(var i=0; i<bookmarks.length; i++)
  {
    var bookmark = bookmarks[i];
    var name = bookmark.name;
    var url = bookmark.url;

    // results.innerHTML += bookmark.name + "<br/>" + bookmark.url + "<br/><br/>";
    results.innerHTML +=  '<div class="well">' +
                          '<h3>' + name +
                          ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
                          ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
                          '</h3>' +
                          '</div>'
  }

  //To set the HTML of the div
  // results.innerHTML = result;
}

function deleteBookmark(url)
{
  var bookmarks = JSON.parse(localStorage.bookmarks);

  for(var i=0; i<bookmarks.length; i++)
  {
    if(url == bookmarks[i].url)
    {
      bookmarks.splice(i,1);
    }
  }

  //Update the change (if any) to the local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Update the UI
  fetchBookmarks();
}

function validateForm(siteName, siteUrl)
{
  if(!siteName || !siteUrl)
  {
    alert("Please fill in the fields");
    return false;
  }

  //Check for url regex
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex))
  {
      alert("Please enter a valid url");
      return false;
  }
  return true;
}
