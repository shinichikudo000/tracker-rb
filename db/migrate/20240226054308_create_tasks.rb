class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.date :due_date
      t.boolean :completed
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
