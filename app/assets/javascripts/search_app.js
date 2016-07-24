$(document).ready(function(){
  console.log("Connected");
  Search.form_listener();
})

var Search = (function(){
  return{
    form_listener: function(){
      $("#search_container").on("submit", "#search_form", function(event){
        event.preventDefault();
        var formData = $("input[name='search']").serialize();
        Search.request_search(formData);
      })
    },
    request_search: function(formData){
      var ajaxFind =
        $.ajax({
          type: "POST",
          url: "search/find",
          data: formData,
          dataType: "HTML"
        });

      ajaxFind.done(function(response){
        console.log(response);
      })
    }
  }
}())