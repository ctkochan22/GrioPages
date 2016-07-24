class SearchController < ApplicationController

  def index
  end

  def find
    search_term = params["search"]
    if !(search_term.match(/[a-zA-Z]/))
      puts ("search phone numbers only")
      clean_search_term = search_term.gsub(/[\D]/,'')
      @results = Contact.where("phone REGEXP :search", search: search_term)
    elsif !(search_term.match(/\d/))
      puts ("search names only")
      @results = Contact.where("name REGEXP :search", search: search_term)
    else
      puts("search line1 and line2")
      @results = Contact.where("line1 REGEXP :search OR line2 REGEXP :search", search: search_term)
    end
    puts @results
  end
end
