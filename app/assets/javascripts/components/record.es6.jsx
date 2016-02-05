class Record extends React.Component {
  constructor() {
    super();
    this.state = { edit: false };
  }

  handleToggle (e) {
    e.preventDefault();

    this.setState({ edit: !this.state.edit });
  }

  handleEdit (e) {
    e.preventDefault();

    var data = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      date: ReactDOM.findDOMNode(this.refs.date).value,
      amount: ReactDOM.findDOMNode(this.refs.amount).value
    };

    $.ajax({
      method: 'PUT',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      data: { record: data },
      success: () => {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, data);
      }
    })
  }

  handleDelete (e) {
    e.preventDefault();

    $.ajax({
        method: 'DELETE',
        url: `/records/${this.props.record.id}`,
        dataType: 'JSON',
        success: () => {
          this.props.handleDeleteRecord(this.props.record)
        }
      },
    )
  }

  recordRow () {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle.bind(this)}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</a>
        </td>
      </tr>
    );
  }

  recordForm () {
    return (
      <tr>
        <td><input className="form-control" type="text" defaultValue={this.props.record.date} ref="date" /></td>
        <td><input className="form-control" type="text" defaultValue={this.props.record.title} ref="title" /></td>
        <td><input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount" /></td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit.bind(this)}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancel</a>
        </td>
      </tr>
    );
  }

  render () {
    if(this.state.edit) {
      return this.recordForm();
    }
    else {
      return this.recordRow()
    }
  }
}

