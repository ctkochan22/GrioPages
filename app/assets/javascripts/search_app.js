$(document).ready(function(){
  console.log("Connected");
  Search.form_listener();
  Display.list_listener();
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
        Search.html_results(response);
      })
    },

    html_results: function(responsePackage){
      $("#results_container").html(responsePackage);
    }
  }
}())

var Display = (function(){
  return {
    list_listener: function(){
      $("#results_container").on("click", "a", function(event){
        event.preventDefault();
        var contact_id = $(this).attr("data-id");
        Display.request_contact_template(contact_id);
      })
    },
    request_contact_template: function(id){
      var packageData = {id: id};
      var ajaxDisplay =
        $.ajax({
          type: "POST",
          url: "search/display",
          data: packageData,
          dataType: "HTML"
        });

      ajaxDisplay.done(function(response){
        console.log(response);
      })
    }
  };
}())