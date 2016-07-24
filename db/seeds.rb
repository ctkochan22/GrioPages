# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Scrubs phone number string of any non-digit characters
#Input: string
#Return: string
def clean_phone(number)
  return number.gsub(/[\D]/,'')
end

json = ActiveSupport::JSON.decode(File.read("db/data.json"))

json.each do |contact|
  to_clean = contact
  to_clean["phone"] = clean_phone(contact["phone"])
  Contact.create(to_clean)
end