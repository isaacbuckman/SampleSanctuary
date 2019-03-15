import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Select from 'react-select';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.track;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    console.log("making options");
    this.options = this.props.tracks.map((sample) =>  //this should all be done in redux
        ({'value':sample.id, 'label': sample.title})
    );

    if (this.props.formType == 'update' && this.props.track.sample) {
      Object.assign(this.state, {'sample' : this.options.filter(option => option.value == this.props.track.sample)});
    } else if (this.props.formType == 'create' && this.props.match.params.id) {
      Object.assign(this.state, {'sample' : this.options.filter(option => option.value == this.props.match.params.id)});
    }
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  updateSelection(e) {
    this.setState({'sample' : e});
  }

  updateFile(type, e) {
    const typeFile = type.concat('File');
    const typeUrl = type.concat('Url');
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      return this.setState({ [typeFile]: file, [typeUrl]: fileReader.result });
    };
    file ? fileReader.readAsDataURL(file) :
      this.setState({ [typeUrl]: 'didnt work', [typeFile]: null });
  }


  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    formData.append("track[sample]", parseInt(this.state.sample.value));
    if (this.state.imageFile) formData.append("track[image]", this.state.imageFile);
    if (this.state.audioFile) formData.append("track[audio]", this.state.audioFile);
    this.props.action(formData, this.props.track.id).then(() => this.props.history.push('/tracks'));
  }

  generalDetailForm() {
    const selectSample = (this.props.match.path != '/tracks/new/sample') ? (
    <div>
      <p className='tdf-text'>Sample</p>
      <Select onChange={this.updateSelection} value={this.state.sample} options={this.options}/>
    </div>) : null;

    return (
    <div className="detail-submit">
      <div className='ds-image-box'>
        <img src={this.state.imageUrl}/>
        <label className='imageLabel'>Upload Image
          <input className="h-input" type="file" onChange={(e) => this.updateFile('image', e)}/>
        </label>
      </div>

      <div className='track-detail-form'>
        <p className='tdf-text tdf-required'>Title</p>
        <input className='txt-input'type="text" onChange={this.update('title')} value={this.state.title}/>
        {selectSample}
        <p className='tdf-text'>Description</p>
        <textarea className='txt-input txta active-ring' onChange={this.update('description')} value={this.state.description}></textarea>
        <input className="inputLabel" type="submit" value={`${this.props.formType}`} />
      </div>
    </div>);
  }

  render(){
  let detailSubmit, upload_container;

  if (this.state.audioUrl === null) {
    upload_container = 'audio-upload-container';
    detailSubmit = '';
  } else {
    upload_container = 'audio-upload-container auc-special';
    detailSubmit = this.generalDetailForm();
  }

    return (
      <div className='track-form-container'>
        <form onSubmit={this.handleSubmit} className='track-form'>
          <div className={upload_container}>
            <h1>Upload to SampleSearch</h1>
            <label className='inputLabel il-main active-ring'>Choose a file to upload
              <input className="h-input" type="file" onChange={(e) => this.updateFile('audio', e)}/>
            </label>
          </div>
          {detailSubmit}
        </form>
      </div>
    )
  }
}

export default withRouter(TrackForm);

// let detailSubmit, upload_container;
//
// if (this.state.audioFile === null) {
//   upload_container = 'audio-upload-container';
//   detailSubmit = '';
// } else {
//   upload_container = 'audio-upload-container auc-special';
//   detailSubmit = this.generalDetailForm();
// }
