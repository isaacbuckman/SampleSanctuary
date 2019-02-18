class AddSampleToTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :sample, :integer
  end
end
