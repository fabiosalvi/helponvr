import "aframe";
import "aframe-gif-shader";
import "aframe-gif-component";
import "babel-polyfill";
import { Entity, Scene } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    var expired = false;
    //expirytime is 1514764799000 - 31 Dic, here it is divided by two
    //var expirytime = 757382399500;
    //if (new Date().getTime() > expirytime*2) expired = true;

    this.state = {
      isExpired: expired,
      isActiveTool1: false,
      isActiveTool2: false,
      isActiveTool3: false,
      isActiveTool3bis: false,
      isLoadingTool3bis: false
    };

    this.buttonsHeight = "0.11";
    this.buttonsWidth = "0.07";
    this.buttonTimes = 500; //milliseconds

    this.onClickTool1 = function() {
      this.setState({
        isActiveTool1: !this.state.isActiveTool1,
        isActiveTool2: false,
        isActiveTool3: false,
        isActiveTool3bis: false
      });
    };

    this.onClickTool2 = function() {
      this.setState({
        isActiveTool1: false,
        isActiveTool2: !this.state.isActiveTool2,
        isActiveTool3: false,
        isActiveTool3bis: false
      });
    };

    this.onClickTool3 = function() {
      this.setState({
        isActiveTool1: false,
        isActiveTool2: false,
        isActiveTool3: !this.state.isActiveTool3,
        isActiveTool3bis: false
      });
    };

    this.showOTP = function() {
      this.setState({ isActiveTool3bis: true, isLoadingTool3bis: true });
      this.setState({
        codiceOTPstring:
          "width:2; align: center; color: black; value: _ _ _  _ _ _"
      });
      setTimeout(
        function() {
          this.setState({ isLoadingTool3bis: false });
        }.bind(this),
        3000
      );
    };
  }

  render() {
    return (
      <Scene universal-controls visible={!this.state.isExpired}>
        <a-assets>
          {/* https://3dwarehouse.sketchup.com/model/8399366b1dbe22edcb349a60fd15aa15/Computer-Monitor */}
          <a-asset-item id="asset_monitor-dae" src="_monitor.dae" />
          <a-asset-item id="asset_office-chair-dae" src="_office-chair.dae" />
        </a-assets>

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" />
        </Entity>
        {/* <Entity primitive="a-camera" position="0 0 0" rotation="0 0 0">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity> */}

        <Entity primitive="a-sky" color="#aaf" />
        <Entity
          primitive="a-light"
          type="point"
          color="white"
          angle="90"
          position="0 5 0"
        />
        <Entity primitive="a-light" type="ambient" color="#333" />

        <Entity
          primitive="a-box"
          id="floor"
          static-body
          width="8"
          height="0.1"
          depth="8"
          position="0 0 0"
        />
        <Entity
          primitive="a-box"
          id="ceiling"
          static-body
          width="8"
          height="0.1"
          depth="8"
          position="0 3.2 0"
        />
        <Entity
          primitive="a-box"
          id="leftWall"
          static-body
          width="0.1"
          height="8"
          depth="9"
          position="-4.1 1 0"
        />
        <Entity
          primitive="a-box"
          id="rightWall"
          static-body
          width="0.1"
          height="8"
          depth="9"
          position="4.1 1 0"
        />
        <Entity
          primitive="a-box"
          id="frontWall"
          static-body
          width="9"
          height="8"
          depth="0.1"
          position="0 1 4.1"
        />
        <Entity
          primitive="a-box"
          id="backWall"
          static-body
          width="9"
          height="8"
          depth="0.1"
          position="0 1 -4.1"
        />

        <Entity
          primitive="a-image"
          src="_logoHelpOnVR.png"
          position="0 2.65 -4"
          width="3.9"
          height="0.8"
        />
        {/* <Entity primitive="a-image" src="_logoBNPP_reversed.png" position="0 2 4" width="5" height="1" /> */}
        {/* <Entity primitive="a-image" src="_logoBNL_reversed.png" position="0 2 4" width="4.5" height="1" /> */}

        <Entity
          primitive="a-box"
          id="table"
          position="0 1 -1.9"
          width="2"
          height="0.05"
          depth="0.75"
          color="grey"
        />
        <Entity
          primitive="a-box"
          id="tableFootLeft"
          position="-1 0.5 -1.9"
          width="0.02"
          height="1"
          depth="0.3"
          color="grey"
        />
        <Entity
          primitive="a-box"
          id="tableFootRight"
          position="1 0.5 -1.9"
          width="0.02"
          height="1"
          depth="0.3"
          color="grey"
        />

        <Entity
          id="mesh_office-chair1"
          collada-model="#asset_office-chair-dae"
          position="-1 0.1 -2.1"
          scale="1.5 1.5 1.5"
          rotation="0 150 0"
        />
        <Entity
          id="mesh_office-chair2"
          collada-model="#asset_office-chair-dae"
          position="-1 0.1 -1.7"
          scale="1.5 1.5 1.5"
          rotation="0 0 0"
        />

        {/* for a video in 16:9, (height = 0,56 * width) and (width = 1,78 * height) */}
        <Entity
          id="mesh_monitor"
          collada-model="#asset_monitor-dae"
          position="0 1 -1.9"
          scale="2.2 2.2 2.2"
          rotation="0 180 0"
        />

        <a-entity
          geometry="primitive: plane;
          height: 0.645; width: 1.155"
          position="0.01 1.52 -1.87"
          rotation="0 0 0"
          visible="true"
          material="shader:gif;src:url(_videogif.gif)"
          gif=""
        />

        {/* <a-entity
          geometry="primitive: plane;
          height: 0.645; width: 1.155"
          position="0.01 1.52 -1.87"
          rotation="0 0 0"
          visible="true"
          material="shader:gif;src:url(_videogif_320x176.gif)"
          gif=""
        /> */}

        {/* <a-video
          src="_videomp4_320x176.mp4"
          autoplay="false"
          height="0.645"
          width="1.155"
          position="0.01 1.52 -1.87"
        /> */}

        <Entity
          primitive="a-image"
          src="_tool1Button.png"
          position="-1 1.8 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={!this.state.isActiveTool1}
          events={{ click: this.onClickTool1.bind(this) }}
        />
        <Entity
          primitive="a-image"
          src="_tool1ButtonClicked.png"
          position="-1 1.8 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={this.state.isActiveTool1}
          events={{ click: this.onClickTool1.bind(this) }}
        />
        <Entity
          primitive="a-image"
          src="_tool2Button.png"
          position="-1 1.5 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={!this.state.isActiveTool2}
          events={{ click: this.onClickTool2.bind(this) }}
        />
        <Entity
          primitive="a-image"
          src="_tool2ButtonClicked.png"
          position="-1 1.5 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={this.state.isActiveTool2}
          events={{ click: this.onClickTool2.bind(this) }}
        />
        <Entity
          primitive="a-image"
          src="_tool3Button.png"
          position="-1 1.2 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={!this.state.isActiveTool3}
          events={{ click: this.onClickTool3.bind(this) }}
        />
        <Entity
          primitive="a-image"
          src="_tool3ButtonClicked.png"
          position="-1 1.2 -1.9"
          width="0.3"
          height="0.3"
          rotation="0 15 0"
          visible={this.state.isActiveTool3}
          events={{ click: this.onClickTool3.bind(this) }}
        />

        <Entity
          primitive="a-curvedimage"
          src="_tool1.png"
          scale="1 1 1"
          height="0.9"
          radius="1"
          theta-length="45"
          rotation="0 115 0"
          position="0 1.47 0"
          visible={this.state.isActiveTool1}
        />

        <Entity
          primitive="a-curvedimage"
          src="_tool2.png"
          scale="1 1 1"
          height="1."
          radius="1"
          theta-length="175"
          rotation="0 16 0"
          position="0 1.52 0"
          visible={this.state.isActiveTool2}
        />

        <Entity
          primitive="a-curvedimage"
          src="_tool3.png"
          scale="1.30 1.5 1"
          height="1"
          radius="1.025"
          theta-length="80"
          rotation="0 78 0"
          position="0 1.40 0"
          visible={this.state.isActiveTool3}
        />
        <Entity
          primitive="a-curvedimage"
          src="_tool3bis.png"
          scale="1.30 1.5 1"
          height="0.15"
          radius="1"
          theta-length="30"
          rotation="0 85 0"
          position="0 0.91 0"
          visible={this.state.isActiveTool3}
          events={{ click: this.showOTP.bind(this) }}
        />

        <Entity
          primitive="a-image"
          src="_tool3ter.png"
          position="1.001 1.6 0"
          width="0.8"
          height="0.6"
          rotation="0 -90 0"
          visible={this.state.isActiveTool3bis}
        />
      </Scene>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#sceneContainer"));
