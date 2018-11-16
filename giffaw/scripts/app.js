const key = "IEMssn5VfSFBjdzp5eMwREfbtAv4rAzY";
let offset = 0;
let savedVal;

$("form").on("submit", function(e) {
  e.preventDefault();
  let search = $(".gif-input").val();
  if (savedVal == search) {
    offset += 25;
  } else {
    offset = 0;
  }
  const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${search}&limit=25&offset=${offset}&rating=G&lang=en`;
  $.ajax({
    url: giphyURL,
    method: "GET",
    success: function(response) {
      console.log(response);
      $(".gif-gallery").empty();
      response.data.forEach(function(gif) {
        $(".gif-gallery").append(`<img src="${gif.images.original.url}">`);
      });
      //   $(".gif-gallery").append(response);
    }
  });
  savedVal = search;
});
