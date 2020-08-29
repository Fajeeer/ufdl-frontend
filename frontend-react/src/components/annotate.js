import React, { Component } from 'react';
import ReactImageAnnotate from "react-image-annotate";
import '../style/annotate.css';

// TODO: this needs to be cleaned up
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

    this.setState({data: images});
    this.setState({uploaded: true});
  }    

      render() {
        let { data } = this.state;
        let { uploaded } = this.state;
        if(uploaded){
          return (
              <div className="border">
      
                <div className="imageDisplay">
                  <ReactImageAnnotate
                    taskDescription="# Draw region around each Kiwifruit bunch"
                    images= {data} 
                    regionClsList={["kiwi fruit", "leaf"]}
                    enabledTools="create-polygon, create-box"
                    onExit={output => {
                      console.log(JSON.stringify(output));
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
