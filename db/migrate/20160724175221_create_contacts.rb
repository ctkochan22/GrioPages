class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :line1
      t.string :line2
      t.string :city
      t.string :state
      t.string :zip
      t.string :phone
      t.timestamps null: false
    end
  end
end
