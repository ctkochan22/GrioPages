class SearchController < ApplicationController

  def index
  end

  # FIND route takes search term and queries the database based on type of input
  # INPUT: Expects a params with a search terms
  # RETURN html template -- Results in a list
  def find
    search_term = params["search"]

    if !(search_term.match(/[a-zA-Z]/))
      #Only has digits -- Searches Phone
      clean_search_term = search_term.gsub(/[\D]/,'')
      @results = Contact.where("phone REGEXP :search", search: search_term)

    elsif !(search_term.match(/\d/))
      #Only has ASCII characters -- Searches Names
      @results = Contact.where("name REGEXP :search", search: search_term)

    else
      #Searches Address
      @results = Contact.where("line1 REGEXP :search OR line2 REGEXP :search", search: search_term)
    end

    render :file => "/search/_results.html.erb", layout: false
  end


  # DISPLAY route queries database with contact id
  # INPUT Expects a params with target contact id
  # RETURN html template -- contact with info
  def display
    contact_id = params["id"].to_i
    @contact = Contact.find_by(id: contact_id)
    render :file => "/search/_contact.html.erb", layout: false
  end
end
