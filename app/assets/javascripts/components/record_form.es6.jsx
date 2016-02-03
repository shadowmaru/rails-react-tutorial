class RecordForm extends React.Component {
  constructor () {
    super();
    this.state = {
      title: '',
      date: '',
      amount: ''
    };
  }

  handleChange (e) {
    var name = e.target.name;
    if (name === 'title') {
      this.setState({ title: e.target.value });
    }
    if (name === 'date') {
      this.setState({date: e.target.value});
    }
    if (name === 'amount') {
      this.setState({amount: e.target.value});
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    $.post('',
           {record: this.state},
           (data) => {
             this.props.handleNewRecord(data);
             this.setState({ title: '', date: '', amount: ''});
           }, 'JSON');
  }

  valid () {
    return this.state.title && this.state.date && this.state.amount;
  }

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
      </form>
    );
  }
}

