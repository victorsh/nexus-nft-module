import {
  showConnections,
  hideConnections,
  updateInput,
  switchPage,
} from 'actions/actionCreators';

import nxsApi from '../nxs-api/index'

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: {
    GlobalStyles,
    Panel,
    Switch,
    Tooltip,
    TextField,
    Button
  },
  utilities: {
    confirm,
    rpcCall,
    apiCall,
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
    currentPage: state.ui.currentPage,
    userStatus: state.user,
  }),
  { showConnections, hideConnections, updateInput, switchPage }
)
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetInputAddressValue: '',
      isMarketView: true,
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

  handlePageChange = (page) => {
    this.props.switchPage(page);
  }

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

  render() {
    const { coreInfo, showingConnections, inputValue, userStatus } = this.props;
    return (
      <React.Fragment>
        <GlobalStyles />

        {/* Navi */}
        <div style={{ marginLeft: '40%' }}>
          <Button onClick={() => this.handlePageChange('MARKET')}>Market</Button>
          <Button onClick={() => this.handlePageChange('MANAGE')}>Manage</Button>
        </div>
        
        {this.isMarketView ? 
          <Panel
            title="Market"
            icon={{ url: 'react.svg', id: 'icon' }}
          >
            <div className="mt2" style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <div>
                  Asset Address
                </div>
                <TextField
                  value={this.state.assetInputAddressValue}
                  onChange={e => this.handleAssetInputAddressChange(e)}
                  placeholder="Address..."
                />
              </div>
              <Button onClick={() => assetApi.get(this.state.assetInputAddressValue)}>View Asset Details</Button>
            </div>

            <div>
              <span>Market List</span>
              <div>
                Name:
                Price:
                Content:
                <Button onClick={() => console.log('buy')}>Buy</Button>
              </div>
            </div>

            {/* Example Code */}
            {/* _-_-_-_-_-_-_-_- */}
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
              <Button onClick={this.getDifficulty}>View mining difficulty</Button>
            </div>
            <div className="mt2">
              <Button onClick={this.getTritiumMetrics}>View Tritium metrics</Button>
            </div>
            <div className="mt2">
              <span>Current Tritium User Status: </span>
              <span>{userStatus ? `Logged in as ${userStatus.username}` : 'Not Logged In'}</span>
            </div>
          </Panel>
          :
          <Panel
            title="Manage"
            icon={{ url: 'react.svg', id: 'icon' }}
          >
             <div className="mt2">
              <Button onClick={this.getDifficulty}>View mining difficulty</Button>
            </div>
          </Panel>
        }

      </React.Fragment>
    );
  }
}

export default Main;
