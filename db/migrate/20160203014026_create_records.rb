class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.string :title
      t.date :date
      t.decimal :amount, precision: 8, scale: 2

      t.timestamps null: false
    end
  end
end
