import {
  showConnections,
  hideConnections,
  updateInput,
} from 'actions/actionCreators';

import path from 'path';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,
    rpcCall,
    apiCall,
    onceRpcReturn,
    showErrorDialog,
    showSuccessDialog,
  },
} = NEXUS;

const DemoTextField = styled(TextField)({
  maxWidth: 400,
});

const AssetTextField = styled(TextField)({
  maxWidth: 400,
})

@connect(
  (state) => ({
    coreInfo: state.coreInfo,
    showingConnections: state.settings.showingConnections,
    inputValue: state.ui.inputValue,
    userStatus: state.user,
  }),
  { showConnections, hideConnections, updateInput }
)
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetInputAddressValue: ''
    }
  }
  
  //This setting will be saved to disk
  confirmToggle = async () => {
    const { showingConnections, showConnections, hideConnections } = this.props;
    const question = showingConnections
      ? 'Hide number of connections?'
      : 'Show number of connections?';

    const agreed = await confirm({ question });
    if (agreed) {
      if (showingConnections) {
        hideConnections();
      } else {
        showConnections();
      }
    }
  };

  //This Setting will be saved to the session
  handleChange = (e) => {
    this.props.updateInput(e.target.value);
  };

  handleAssetInputAddressChange = (e) => {
    this.setState({ assetInputAddressValue: e.target.value })
  }

  /// rpcCall for legacy API
  getDifficulty = async () => {
    try {
      const response = await rpcCall('getdifficulty', [[]]);
      showSuccessDialog({
        message: 'Mining difficulty',
        note: JSON.stringify(response, null, 2),
      });
    } catch (err) {
      showErrorDialog({
        message: 'Cannot get difficulty',
      });
    }
  };

  /// apiCall for tritium API
  getTritiumMetrics = async () => {
    try {
      const params = {};
      const result = await apiCall('system/get/metrics', params);
      showSuccessDialog({
        message: 'Tritium Metrics',
        note: JSON.stringify(result, null, 2),
      });
    } catch (error) {
      showErrorDialog({
        message: 'Cannot get metrics',
      });
    }
  };

  // apiCall for Asset
  getAsset = async (addr) => {
    try {
      const params = { address: addr }
      const path = 'assets/get/asset'
      const result = await apiCall(path, params)
      console.log(result)
      showSuccessDialog({
        message: 'Asset',
        note: JSON.stringify(result, null, 2)
      });
    } catch (error) {
      console.log(error)
      showErrorDialog({
        message: 'Canot get asset',
      })
    }
  }

  render() {
    const { coreInfo, showingConnections, inputValue, userStatus } = this.props;
    return (
      <Panel
        title="React Module Example"
        icon={{ url: 'react.svg', id: 'icon' }}
      >
        <GlobalStyles />
        <div>
          This showcases how a Nexus Wallet Modules can interact with the base
          wallet.
        </div>

        <div className="mt2 flex center">
          Show number of connections&nbsp;&nbsp;
          <Tooltip.Trigger
            position="right"
            tooltip="This setting will be remembered even when the wallet is restarted"
          >
            <Switch
              checked={showingConnections}
              onChange={this.confirmToggle}
            />
          </Tooltip.Trigger>
        </div>
        {!!showingConnections && <div>Connections: {coreInfo.connections}</div>}

        <div className="mt2">
          <div>
            This textbox's content will be remembered even when you navigate
            away from this module
          </div>
          <DemoTextField
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Type anything here"
          />
        </div>

        <div className="mt2">
          <div>
            Enter the address of the Asset
          </div>
          <AssetTextField
            value={this.state.assetInputAddressValue}
            onChange={e => this.handleAssetInputAddressChange(e)}
            placeholder="Address..."
          />
          <Button onClick={() => this.getAsset(this.state.assetInputAddressValue)}>View Asset</Button>
        </div>

        <div className="mt2">
          <Button onClick={this.getDifficulty}>View mining difficulty</Button>
        </div>
        <div className="mt2">
          <Button onClick={this.getTritiumMetrics}>View Tritium metrics</Button>
        </div>
        <div className="mt2">
          <span>Current Tritium User Status: </span>
          <span>{userStatus ? userStatus.username : 'Not Logged In'}</span>
        </div>
      </Panel>
    );
  }
}

export default Main;
