App = {
  web3Provider: null,
  contracts: {},
  account: null,
  swtoken: null,

  init: async function () {
    App.web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
    $.getJSON('SWToken.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      App.contracts.Test = TruffleContract(data);

      // Set the provider for our contract
      App.contracts.Test.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.getResult();
    });

    $('#btn-click').on('click', App.handleClick);
  },

  getResult: function () {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
        return;
      }
      App.account = accounts[0];
      $("#recipient").val(localStorage.getItem("#recipient"));
      App.contracts.Test.deployed().then(function (instance) {
        App.swtoken = instance;
        return instance.balanceOf(accounts[0]);
      }).then(function (times) {
        $('#btn-click').text(accounts[0] + " : " + times);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  handleClick: function (event) {
    event.preventDefault();
    var recipient = $('#recipient').val();
    localStorage.setItem("#recipient", recipient);
    $('#btn-click').text("transfer...");

    App.swtoken.transfer(recipient, 1).then(function () {
      return App.getResult();
    }).catch(function (err) {
      console.log(err.message);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
