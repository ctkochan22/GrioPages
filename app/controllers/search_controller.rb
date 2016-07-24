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

    render :file => "/search/_results.html.erb", layout: false
  end

  def display
    contact_id = params["id"].to_i
    @contact = Contact.find_by(id: contact_id)
    render :file => "/search/_contact.html.erb", layout: false
  end
end
