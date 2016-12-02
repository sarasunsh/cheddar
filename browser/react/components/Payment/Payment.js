var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
import axios from 'axios';

var PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    };
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_z0utIdLsAGnedJK30AwTTKSh');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

  onSubmit: function(event) {
    var self = this;
    event.preventDefault();
    // console.log("event.target.amount.value", event.target.amount.value);
    var amount = event.target.amount.value;
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
        console.log("Error", self.state.paymentError);
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        console.log("Token created!", response.id);
        // make request to your server here!
        // console.log("event.target.data-stripe.value", event.target.value);
        axios.put("api/payment/token", {token: response.id, amount: amount })
        .then (res => console.log("Response from server: ", res))
        .catch( err => console.log(err));
        // self.setState({
          // paymentComplete: false,
        // });
      }
    });
  },

  render: function() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return (<form onSubmit={this.onSubmit} >
        <h4>Credit Card Payment</h4>
        <span>{ this.state.paymentError }</span><br />
        <input type='text' name='amount' placeholder='Dollars to Add' /><br />
        <input type='text' data-stripe='number' placeholder='credit card number' maxLength='12' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' maxLength='2'/><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' maxLength='4'/><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' maxLength='3'/><br />
        <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
      </form>);
    }
  }
});

module.exports = PaymentForm;
