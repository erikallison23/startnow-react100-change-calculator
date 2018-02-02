import React, { Component } from 'react';
//sets the state for app.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      changeDue: {
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0,
      },
      success: true,
      status: 'Awaiting Calculation',
    };

    //binds the functions to this.
    this.onChange = this.onChange.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
    this.onClick = this.onClick.bind(this);
  };

  //function that targets the name and values.
  onChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value,
    });
  }
  //click function that states the amount recieved and due and sets the state if change is due or money is owed.
  onClick() {
    const due = this.state.amountDue;
    const received = this.state.amountReceived;

    var change = received - due;
    if (change < 0) {
      this.setState({ success: false });
      this.setState({ status: 'Additional money owed.' });
    }
    else {
      this.setState({ changeDue: this.calculateChange(change), success: true });
      this.setState({ status: `Total change due is $${change.toFixed(2)}` });
    }
  };
  //function that does the math equations for each amount of currency.
  calculateChange(change) {

    change *= 100;
    var total = {}

    total.twenties = Math.floor(change / 2000);
    change %= 2000;

    total.tens = Math.floor(change / 1000);
    change %= 1000;

    total.fives = Math.floor(change / 500);
    change %= 500;

    total.ones = Math.floor(change / 100);
    change %= 100;

    total.quarters = Math.floor(change / 25);
    change %= 25;

    total.dimes = Math.floor(change / 10);
    change %= 10;

    total.nickels = Math.floor(change / 5);
    change %= 5;

    total.pennies = Math.ceil(change);

    return total;
  };
  // renders and returns app into jsx.
  render() {
    return (
      <div className='container'>
        <h1>Change Calculator</h1>
        <hr></hr>
        <div className='row'>

          <div className='col-md-4'>

            <div className='card'>
              <div className='card-header'>Enter Information</div>

              <div className='panel panel-default'>
                <div className='panel-body'></div>
              </div>

              <label className='label'> How much is due? </label>
              <div className='control'>
                <input id='amountDue' name='amountDue' ref='amount-due' placeholder='Enter Amount' className='from-control' type='number' onChange={this.onChange} /*defaultValue={this.state.amountDue}*/ />
              </div>

              <label className='label'> How much was received? </label>
              <div className='control'>
                <input name='amountReceived' id='amountReceived' ref='amount-received' placeholder='Enter Amount' className='from-control' type='number' onChange={this.onChange} /*defaultValue={this.state.amountReceived}*/ />
              </div>

              <button className='btn btn-primary bton-block' onClick={this.onClick} type='button'>Calculate</button>
            </div>
          </div>

          <div className='col-md-8'>

            <div className='card'>
              <div className='card-header' id='output-total'>
                <p ref='totalOutput' id='total-output' className={this.state.success ? 'success' : 'failure'}> {this.state.status}</p>
              </div>
            </div>

            <div className='wrapper'>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='twenties-background'>Twenties</h2>
                  <p ref='twentiesOutput'>{this.state.changeDue.twenties} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='tens-background'>Tens</h2>
                  <p ref='tensOutput'> {this.state.changeDue.tens} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='fives-background'>Fives</h2>
                  <p ref='fivesOutput'> {this.state.changeDue.fives} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='ones-background'>Ones</h2>
                  <p ref='onesOutput'> {this.state.changeDue.ones} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='quarters-background'>Quarters</h2>
                  <p ref='quartersOutput'> {this.state.changeDue.quarters} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='dimes-background'>Dimes</h2>
                  <p ref='dimesOutput'> {this.state.changeDue.dimes} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='nickels-background'>Nickels</h2>
                  <p ref='nickelsOutput'> {this.state.changeDue.nickels} </p>
                </div>
              </div>

              <div className='card'>
                <div className='card-block'>
                  <h2 className='card-title' id='pennies-background'>Pennies</h2>
                  <p ref='penniesOutput'> {this.state.changeDue.pennies} </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  };
};

export default App;
