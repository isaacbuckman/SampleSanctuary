json.track do
  json.id @track.id
  json.title @track.title
  json.description @track.description
  json.uploader @track.user.email
  json.uploaderId @track.user.id
  json.uploaderPic asset_path(@track.user.image.url)
  json.imageUrl asset_path(@track.image.url)
  json.audioUrl asset_path(@track.audio.url)

  peaks = @track.audioPeaks ? @track.audioPeaks : []
  json.audioPeaks peaks 

  json.commentIds @track.comments.pluck(:id)

  test = current_user ? current_user.id : -1 
  json.liked @track.likes.pluck(:user_id).include?(test)


  likeid = @track.likes.find{|like| like.user_id == test}
  likeid = likeid.nil? ? -1 : likeid.id
  json.likeId likeid
end

json.comments do
  @track.comments.each do |comment|
    json.set! comment.id do 
      json.id comment.id 
      json.body comment.body
      json.user comment.user.email
      json.userId comment.user.id
      json.userPic asset_path(comment.user.image.url)  
    end 
  end
end

