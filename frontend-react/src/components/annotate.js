import React, { Component } from 'react';
import ReactImageAnnotate from "react-image-annotate";
import '../style/annotate.css';

class Annotate extends Component {

    state = {
        data: [],
        uploaded: false
    }

  fileSelectedHandler = event => {
    var images = [];
    let files = event.target.files;
    var img = new Image();
    for (let i = 0; i < files.length; i++) {
        img.src = URL.createObjectURL(files[i]);
        images.push({src: img.src, name: files[i].name});  
    }

    this.setState({data: this.state.data.concat(images)});
    this.setState({uploaded: true});
  }    

      render() {
        let { data } = this.state;
        let { uploaded } = this.state;
        if(uploaded){
          return (
              <div className="border">
                  <form className="selectForm" onSubmit={this._handleSubmit}>
                    <input type="file" id="file" multiple={true} accept="image/*" className="fileInputButton" onChange={this.fileSelectedHandler} />
                    <label htmlFor="file" className="fileLabel">
                      Add Images
                    </label>
                  </form>
                <div className="imageDisplay">
                  <ReactImageAnnotate
                    images= {data}
                    key = {data}
                    regionClsList={[]}
                    enabledTools="create-polygon, create-box"
                    onExit={output => {
                      console.log(JSON.stringify(output.images));
                    }}
                  />

                </div>
                
              </div>
          );}
        else{
            return (
                <div className="border">
         
                  <div className="imageDisplay">
      
                    <form className="selectForm" onSubmit={this._handleSubmit}>
                        <input type="file" id="file" multiple={true} accept="image/*" className="fileInputButton" onChange={this.fileSelectedHandler} />
                        <label htmlFor="file" className="fileLabel">
                            Upload Images
                        </label>
                    </form>

                  </div>
                
                </div>
            )  
        }
      }
}

export default Annotate;
