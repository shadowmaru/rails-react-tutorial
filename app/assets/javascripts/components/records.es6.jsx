class Records extends React.Component {
  constructor() {
    super();
    this.state = { records: [] };
  }

  componentDidMount() {
    this.setState({records: this.props.data});
  }

  addRecord (record) {
    var records = this.state.records.slice();
    records.push(record);
    this.setState({records: records})
  }

  render () {
    var recordNodes = this.state.records.map((record) => {
      return (<Record key={record.id} record={record} />)
    });
    return (
      <div className="records">
        <h2 className="title">Records</h2>

        <RecordForm handleNewRecord={this.addRecord.bind(this)} />

        <hr />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recordNodes}
          </tbody>
        </table>
      </div>
    );
  }
}

