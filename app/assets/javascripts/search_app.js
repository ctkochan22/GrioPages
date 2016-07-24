$(document).ready(function(){
  console.log("Connected");
  Search.form_listener();
  Display.list_listener();
})

//SEARCH IIFE
//Handles all actions that deal with searching
var Search = (function(){
  return{

    //*Places listener on Search Form
    form_listener: function(){
      $("#search_container").on("submit", "#search_form", function(event){
        event.preventDefault();
        var formData = $("input[name='search']").serialize();
        Search.request_search(formData);
      })
    },

    //*Makes an AJAX request to search#find
    //Input: string -- serialized data of search form input
    //Return: NONE -- Expects an html template of results
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

    //Takes html template and injects into left container
    html_results: function(responsePackage){
      $("#results_container").html(responsePackage);
    }
  }
}())

//DISPLAY IIFE Module
//Handles all things to do with diplaying contact
var Display = (function(){
  return {

    //Places listener on names of search results
    list_listener: function(){
      $("#results_container").on("click", "a", function(event){
        event.preventDefault();
        var contact_id = $(this).attr("data-id");
        Display.request_contact_template(contact_id);
      })
    },

    //Makes an AJAX request to search#display
    //Input: string -- id associated with name
    //Return: NONE -- Expects an html template of contact
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
        Display.html_contact(response);
      })
    },

    //Takes Contact html template, injects into container
    html_contact: function(responsePackage){
      $("#show_container").html(responsePackage);
    }
  };
}())