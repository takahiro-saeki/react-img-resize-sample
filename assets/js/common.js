import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Dropzone from 'react-dropzone';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      files: [],
      name: null,
      path: null,
      open: false,
    };
    this._cropImage = this._cropImage.bind(this);
    this._onChange = this._onChange.bind(this);
    this._useDefaultImage = this._useDefaultImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  onDrop(e) {
    let name;
    let path;
    let prev;
    e.map(file => {
      name = file.name;
      path = file.name;
      prev = file.preview
    })
  this.setState({
    files: e,
    name: name,
    path: path,
    src: prev
    })
  }

  _cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  _onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _useDefaultImage() {
    this.setState({ src });
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={MuiUserProfile}>
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
          <div>
            <Dropzone ref="dropzone" onDrop={this.onDrop}>
              {this.state.files.map((file) => <img src={file.preview}
              style={{
                width: '100%',
                height: 'auto'
              }} key={file.preview}/> )}
            </Dropzone>
            <div style={{ width: '100%' }}>
              <input type="file" onChange={this._onChange} />
              <button onClick={this._useDefaultImage}>Use default img</button>
              <br />
              <br />
              <Cropper
                style={{ height: 400, width: '100%' }}
                aspectRatio={16 / 16}
                preview=".img-preview"
                guides={true}
                src={this.state.src}
                ref="cropper"
                crop={this._crop}
              />
            </div>
            <div>
              <div className="box" style={{ width: '50%', float: 'right' }}>
                <h1 style={{ display: 'inline-block' }}>
                  Crop
                  <button onClick={ this._cropImage } style={{ float: 'right' }}>
                    Crop Image
                  </button>
                </h1>
                <img style={{ width: '100%' }} src={this.state.cropResult} />
              </div>
            </div>
            <br style={{ clear: 'both' }} />
            <img src={this.state.cropResult} style={{
                width: '100%',
                height: 'auto'
              }} />
          </div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}
/*
export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      files: [],
      name: null,
      path: null
    };
    this._cropImage = this._cropImage.bind(this);
    this._onChange = this._onChange.bind(this);
    this._useDefaultImage = this._useDefaultImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(e) {
    let name;
    let path;
    let prev;
    e.map(file => {
      name = file.name;
      path = file.name;
      prev = file.preview
    })
  this.setState({
    files: e,
    name: name,
    path: path,
    src: prev
    })
  }

  _cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  _onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _useDefaultImage() {
    this.setState({ src });
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
          {this.state.files.map((file) => <img src={file.preview}
          style={{
            width: '100%',
            height: 'auto'
          }} key={file.preview}/> )}
        </Dropzone>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this._onChange} />
          <button onClick={this._useDefaultImage}>Use default img</button>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 16}
            preview=".img-preview"
            guides={true}
            src={this.state.src}
            ref="cropper"
            crop={this._crop}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1 style={{ display: 'inline-block' }}>
              Crop
              <button onClick={ this._cropImage } style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: '100%' }} src={this.state.cropResult} />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
        <img src={this.state.cropResult} style={{
            width: '100%',
            height: 'auto'
          }} />
      </div>

    );
  }
}
*/
ReactDOM.render(
  <DialogExampleSimple />,
  document.getElementById('app')
)
