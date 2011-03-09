class CreateTaskListTemplates < ActiveRecord::Migration
  def self.up
    create_table :task_list_templates do |t|
      t.string :name
      t.references :organization
      t.integer :position
      t.string :raw_tasks

      t.timestamps
    end
  end

  def self.down
    drop_table :task_list_templates
  end
end
